import { parse } from 'papaparse';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface TableRow {
  Bokningsdag?: string;
  Betalningsdag?: string;
  Belopp?: string;
  Betalningstyp?: string;
  Betalare?: string;
  'Mottagarens namn'?: string;
  'Mottagarens kontonummer'?: string;
  'Mottagarens BIC-kod'?: string;
  Referensnummer?: string;
  Meddelande?: string;
  Arkiveringskod?: string;
}

interface Report {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
}

export const parseCsv = async (file: Blob): Promise<Report> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const csvText = buffer.toString('utf-8');
  const { data } = parse<TableRow>(csvText, { delimiter: ';', header: true });

  let totalIncome = 0;
  let totalExpenses = 0;

  data.forEach((row) => {
    if (!row.Belopp) return;
    const amount = parseFloat(row.Belopp.replace(',', '.'));
    if (!isNaN(amount)) {
      if (amount > 0) {
        totalIncome += amount;
      } else {
        totalExpenses += amount;
      }
    }
  });

  return {
    totalIncome,
    totalExpenses,
    netIncome: totalIncome + totalExpenses,
  };
};

export const generatePdf = async ({
  totalIncome,
  totalExpenses,
  netIncome,
}: Report) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.addPage();
  const { height } = page.getSize();

  const fontSize = 24;

  page.drawText(`Total Income: €${totalIncome.toFixed(2)}`, {
    x: 50,
    y: height - 100,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Total Expenses: €${Math.abs(totalExpenses).toFixed(2)}`, {
    x: 50,
    y: height - 130,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Net Income: €${netIncome.toFixed(2)}`, {
    x: 50,
    y: height - 160,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  return pdfDoc.save();
};
