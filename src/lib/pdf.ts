import { formatDate } from '@/lib/utils';
import { Report } from '@/types';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const colors = {
  darkGreen: rgb(0 / 255, 70 / 255, 40 / 255),
  brightGreen: rgb(0 / 255, 170 / 255, 70 / 255),
  white: rgb(1, 1, 1),
  offWhite: rgb(245 / 255, 248 / 255, 247 / 255),
  grey: rgb(199 / 255, 199 / 255, 199 / 255),
  red: rgb(220 / 255, 53 / 255, 69 / 255),
};

export const generatePdf = async ({
  totalIncome,
  totalExpenses,
  netIncome,
  transactions,
}: Report) => {
  const startDate = formatDate(transactions[0].date);
  const endDate = formatDate(transactions[transactions.length - 1].date);

  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();

  const headerHeight = 80;

  // Header
  page.drawRectangle({
    x: 0,
    y: height - headerHeight,
    width: width,
    height: headerHeight,
    color: colors.darkGreen,
  });
  page.drawText('S-Bank Reports', {
    x: 80,
    y: height - 35,
    size: 22,
    font: helveticaBold,
    color: colors.white,
  });
  page.drawText(`${startDate} - ${endDate}`, {
    x: width - 200,
    y: height - 45,
    size: 12,
    font: helvetica,
    color: colors.white,
  });

  const summaryY = height - headerHeight - 40;
  const boxWidth = (width - 120) / 3;
  const boxHeight = 70;

  // Summary
  page.drawRectangle({
    x: 40,
    y: summaryY - boxHeight,
    width: boxWidth,
    height: boxHeight,
    color: colors.white,
    borderColor: colors.grey,
    borderWidth: 0.5,
  });
  page.drawText('Income', {
    x: 50,
    y: summaryY - 20,
    size: 10,
    font: helvetica,
    color: colors.brightGreen,
  });
  page.drawText(`€${totalIncome.toFixed(2)}`, {
    x: 50,
    y: summaryY - 45,
    size: 16,
    font: helveticaBold,
    color: colors.brightGreen,
  });

  page.drawRectangle({
    x: 50 + boxWidth,
    y: summaryY - boxHeight,
    width: boxWidth,
    height: boxHeight,
    color: colors.white,
    borderColor: colors.grey,
    borderWidth: 0.5,
  });
  page.drawText('Expenses', {
    x: 60 + boxWidth,
    y: summaryY - 20,
    size: 10,
    font: helvetica,
    color: colors.darkGreen,
  });
  page.drawText(`€${Math.abs(totalExpenses).toFixed(2)}`, {
    x: 60 + boxWidth,
    y: summaryY - 45,
    size: 16,
    font: helveticaBold,
    color: colors.darkGreen,
  });

  const netColor = netIncome >= 0 ? colors.brightGreen : colors.red;
  page.drawRectangle({
    x: 60 + boxWidth * 2,
    y: summaryY - boxHeight,
    width: boxWidth,
    height: boxHeight,
    color: colors.white,
    borderColor: colors.grey,
    borderWidth: 0.5,
  });
  page.drawText('Net income', {
    x: 70 + boxWidth * 2,
    y: summaryY - 20,
    size: 10,
    font: helvetica,
    color: netColor,
  });
  page.drawText(`€${netIncome.toFixed(2)}`, {
    x: 70 + boxWidth * 2,
    y: summaryY - 45,
    size: 16,
    font: helveticaBold,
    color: netColor,
  });

  // Transactions table
  const tableY = summaryY - boxHeight - 40;
  const tableWidth = width - 80;

  page.drawText('Transactions', {
    x: 40,
    y: tableY + 15,
    size: 14,
    font: helveticaBold,
    color: colors.darkGreen,
  });

  const rowHeight = 30;
  const colWidths = [120, 220, 120];

  page.drawRectangle({
    x: 40,
    y: tableY - rowHeight,
    width: tableWidth,
    height: rowHeight,
    color: colors.darkGreen,
  });
  page.drawText('Date', {
    x: 55,
    y: tableY - rowHeight / 2 - 5,
    size: 10,
    font: helveticaBold,
    color: colors.white,
  });
  page.drawText('Recipient', {
    x: 55 + colWidths[0],
    y: tableY - rowHeight / 2 - 5,
    size: 10,
    font: helveticaBold,
    color: colors.white,
  });
  page.drawText('Amount', {
    x: 55 + colWidths[0] + colWidths[1],
    y: tableY - rowHeight / 2 - 5,
    size: 10,
    font: helveticaBold,
    color: colors.white,
  });

  const footerHeight = 50;
  const availableSpace = tableY - rowHeight - footerHeight;
  const maxRows = Math.floor(availableSpace / rowHeight);
  const displayCount = Math.min(transactions.length, maxRows);

  let currentY = tableY;

  for (let i = 0; i < displayCount; i++) {
    currentY -= rowHeight;
    const { amount, date, recipient } = transactions[i];

    const bgColor = i % 2 === 0 ? colors.white : colors.offWhite;
    page.drawRectangle({
      x: 40,
      y: currentY - rowHeight,
      width: tableWidth,
      height: rowHeight,
      color: bgColor,
      borderColor: colors.grey,
      borderWidth: 0.5,
    });

    const amountColor = amount >= 0 ? colors.brightGreen : colors.red;
    const formattedAmount = `${amount >= 0 ? '+' : '-'} €${Math.abs(amount).toFixed(2)}`;

    page.drawText(formatDate(date), {
      x: 55,
      y: currentY - rowHeight / 2 - 5,
      size: 10,
      font: helvetica,
      color: colors.darkGreen,
    });

    const recipientText = recipient || '';
    const truncatedRecipient =
      recipientText.length > 35
        ? recipientText.substring(0, 35) + '...'
        : recipientText;
    page.drawText(truncatedRecipient, {
      x: 55 + colWidths[0],
      y: currentY - rowHeight / 2 - 5,
      size: 10,
      font: helvetica,
      color: colors.darkGreen,
    });

    page.drawText(formattedAmount, {
      x: 55 + colWidths[0] + colWidths[1],
      y: currentY - rowHeight / 2 - 5,
      size: 10,
      font: helveticaBold,
      color: amountColor,
    });
  }

  if (transactions.length > displayCount) {
    const remainingCount = transactions.length - displayCount;

    page.drawRectangle({
      x: 40,
      y: currentY - rowHeight,
      width: tableWidth,
      height: rowHeight,
      color: colors.offWhite,
      borderColor: colors.grey,
      borderWidth: 0.5,
    });

    page.drawText(
      `${remainingCount} more transaction${remainingCount !== 1 ? 's' : ''} not shown`,
      {
        x: width / 2 - 80,
        y: currentY - rowHeight / 2 - 5,
        size: 10,
        font: helveticaBold,
        color: colors.darkGreen,
      }
    );
  }

  page.drawRectangle({
    x: 0,
    y: 0,
    width: width,
    height: footerHeight,
    color: colors.offWhite,
  });

  page.drawText(`Generated on ${formatDate(new Date())}`, {
    x: 40,
    y: 20,
    size: 10,
    font: helvetica,
    color: colors.darkGreen,
  });

  page.drawText('© S Bank Reports', {
    x: width - 80,
    y: 20,
    size: 10,
    font: helvetica,
    color: colors.darkGreen,
  });

  return pdfDoc.save();
};
