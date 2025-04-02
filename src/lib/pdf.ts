import { formatCurrency, formatDate, truncateString } from '@/lib/utils';
import { Report } from '@/types';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const colors = {
  darkGreen: rgb(0 / 255, 70 / 255, 40 / 255),
  brightGreen: rgb(0 / 255, 170 / 255, 70 / 255),
  white: rgb(1, 1, 1),
  offWhite: rgb(245 / 255, 248 / 255, 247 / 255),
  grey: rgb(199 / 255, 199 / 255, 199 / 255),
  red: rgb(220 / 255, 53 / 255, 69 / 255),
  lightGrey: rgb(240 / 255, 240 / 255, 240 / 255),
  darkGrey: rgb(100 / 255, 100 / 255, 100 / 255),
};

const MARGIN = 40;
const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const HEADER_HEIGHT = 80;
const FOOTER_HEIGHT = 40;

const SUMMARY_BOX_HEIGHT = 80;
const SUMMARY_BOX_WIDTH = (CONTENT_WIDTH - 40) / 3;

const TABLE_ROW_HEIGHT = 35;

export const generatePdf = async ({
  totalIncome,
  totalExpenses,
  netIncome,
  transactions,
}: Report) => {
  transactions.sort((a, b) => b.date.getTime() - a.date.getTime());

  const startDate = formatDate(transactions[transactions.length - 1].date);
  const endDate = formatDate(transactions[0].date);

  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

  /**
   * HEADER
   */
  page.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - HEADER_HEIGHT,
    width: PAGE_WIDTH,
    height: HEADER_HEIGHT,
    color: colors.darkGreen,
  });
  page.drawText('S-Bank Reports', {
    x: MARGIN,
    y: PAGE_HEIGHT - 50,
    size: 24,
    font: helveticaBold,
    color: colors.white,
  });
  page.drawText(`${startDate} - ${endDate}`, {
    x: PAGE_WIDTH - MARGIN - 150,
    y: PAGE_HEIGHT - 50,
    size: 12,
    font: helvetica,
    color: colors.white,
  });

  /**
   * SUMMARY
   */
  const summaryY = PAGE_HEIGHT - HEADER_HEIGHT - 30;

  // Income box
  page.drawRectangle({
    x: MARGIN,
    y: summaryY - SUMMARY_BOX_HEIGHT,
    width: SUMMARY_BOX_WIDTH,
    height: SUMMARY_BOX_HEIGHT,
    color: colors.white,
    borderColor: colors.grey,
    borderWidth: 0.5,
  });
  page.drawText('Total Income', {
    x: MARGIN + 20,
    y: summaryY - 25,
    size: 12,
    font: helvetica,
    color: colors.darkGreen,
  });
  page.drawText(formatCurrency(totalIncome), {
    x: MARGIN + 20,
    y: summaryY - 55,
    size: 20,
    font: helveticaBold,
    color: colors.brightGreen,
  });

  // Expenses box
  page.drawRectangle({
    x: MARGIN + SUMMARY_BOX_WIDTH + 20,
    y: summaryY - SUMMARY_BOX_HEIGHT,
    width: SUMMARY_BOX_WIDTH,
    height: SUMMARY_BOX_HEIGHT,
    color: colors.white,
    borderColor: colors.grey,
    borderWidth: 0.5,
  });
  page.drawText('Total Expenses', {
    x: MARGIN + SUMMARY_BOX_WIDTH + 40,
    y: summaryY - 25,
    size: 12,
    font: helvetica,
    color: colors.darkGreen,
  });
  page.drawText(formatCurrency(totalExpenses), {
    x: MARGIN + SUMMARY_BOX_WIDTH + 40,
    y: summaryY - 55,
    size: 20,
    font: helveticaBold,
    color: colors.red,
  });

  // Net income box
  page.drawRectangle({
    x: MARGIN + (SUMMARY_BOX_WIDTH + 20) * 2,
    y: summaryY - SUMMARY_BOX_HEIGHT,
    width: SUMMARY_BOX_WIDTH,
    height: SUMMARY_BOX_HEIGHT,
    color: colors.white,
    borderColor: colors.grey,
    borderWidth: 0.5,
  });
  page.drawText('Net Income', {
    x: MARGIN + (SUMMARY_BOX_WIDTH + 20) * 2 + 20,
    y: summaryY - 25,
    size: 12,
    font: helvetica,
    color: colors.darkGreen,
  });
  page.drawText(formatCurrency(netIncome), {
    x: MARGIN + (SUMMARY_BOX_WIDTH + 20) * 2 + 20,
    y: summaryY - 55,
    size: 20,
    font: helveticaBold,
    color: netIncome >= 0 ? colors.brightGreen : colors.red,
  });

  /**
   * TRANSACTIONS TABLE
   */
  const tableY = summaryY - SUMMARY_BOX_HEIGHT - 30;
  const colWidths = [100, 250, 120];

  // Table header
  page.drawRectangle({
    x: MARGIN,
    y: tableY - TABLE_ROW_HEIGHT,
    width: CONTENT_WIDTH,
    height: TABLE_ROW_HEIGHT,
    color: colors.darkGreen,
  });

  const headerTexts = ['Date', 'Recipient', 'Amount'];
  headerTexts.forEach((text, i) => {
    page.drawText(text, {
      x:
        MARGIN +
        (i === 0
          ? 20
          : i === 1
            ? colWidths[0] + 20
            : colWidths[0] + colWidths[1] + 20),
      y: tableY - TABLE_ROW_HEIGHT / 2 - 5,
      size: 11,
      font: helveticaBold,
      color: colors.white,
    });
  });

  // Table rows
  const availableSpace = tableY - TABLE_ROW_HEIGHT - FOOTER_HEIGHT;
  const maxRows = Math.floor(availableSpace / TABLE_ROW_HEIGHT);
  const displayCount = Math.min(transactions.length, maxRows);

  let currentY = tableY;

  for (let i = 0; i < displayCount; i++) {
    currentY -= TABLE_ROW_HEIGHT;
    const { amount, date, recipient } = transactions[i];

    page.drawRectangle({
      x: MARGIN,
      y: currentY - TABLE_ROW_HEIGHT,
      width: CONTENT_WIDTH,
      height: TABLE_ROW_HEIGHT,
      color: i % 2 === 0 ? colors.white : colors.offWhite,
      borderColor: colors.grey,
      borderWidth: 0.5,
    });

    // Date
    page.drawText(formatDate(date), {
      x: MARGIN + 20,
      y: currentY - TABLE_ROW_HEIGHT / 2 - 5,
      size: 10,
      font: helvetica,
      color: colors.darkGrey,
    });

    // Recipient
    page.drawText(truncateString(recipient, 40), {
      x: MARGIN + colWidths[0] + 20,
      y: currentY - TABLE_ROW_HEIGHT / 2 - 5,
      size: 10,
      font: helvetica,
      color: colors.darkGrey,
    });

    // Amount
    page.drawText(formatCurrency(amount), {
      x: MARGIN + colWidths[0] + colWidths[1] + 20,
      y: currentY - TABLE_ROW_HEIGHT / 2 - 5,
      size: 10,
      font: helveticaBold,
      color: amount >= 0 ? colors.brightGreen : colors.red,
    });
  }

  // More transactions indicator
  if (transactions.length > displayCount) {
    const remainingCount = transactions.length - displayCount;
    page.drawRectangle({
      x: MARGIN,
      y: currentY - TABLE_ROW_HEIGHT,
      width: CONTENT_WIDTH,
      height: TABLE_ROW_HEIGHT,
      color: colors.lightGrey,
      borderColor: colors.grey,
      borderWidth: 0.5,
    });

    page.drawText(
      `${remainingCount} more transaction${remainingCount !== 1 ? 's' : ''}...`,
      {
        x: PAGE_WIDTH / 2 - 70,
        y: currentY - TABLE_ROW_HEIGHT / 2 - 5,
        size: 10,
        font: helveticaBold,
        color: colors.darkGrey,
      }
    );
  }

  /**
   * FOOTER
   */
  page.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: FOOTER_HEIGHT,
    color: colors.offWhite,
  });

  const footerText = `Generated on ${formatDate(new Date())}`;
  const footerTextWidth = helvetica.widthOfTextAtSize(footerText, 10);

  page.drawText(footerText, {
    x: PAGE_WIDTH / 2 - footerTextWidth / 2,
    y: FOOTER_HEIGHT / 2 - 3,
    size: 10,
    font: helvetica,
    color: colors.darkGreen,
  });

  return pdfDoc.save();
};
