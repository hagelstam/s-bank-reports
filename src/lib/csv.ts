import { Report, Transaction } from '@/types';
import { parse } from 'papaparse';

interface TableRowSV {
  lang: 'sv';
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

interface TableRowFI {
  lang: 'fi';
  Kirjauspäivä?: string;
  Maksupäivä?: string;
  Summa?: string;
  Tapahtumalaji?: string;
  Maksaja?: string;
  'Saajan nimi'?: string;
  'Saajan tilinumero'?: string;
  'Saajan BIC-tunnus'?: string;
  Viitenumero?: string;
  Viesti?: string;
  Arkistointitunnus?: string;
}

type TableRow = TableRowSV | TableRowFI;

export const parseCsv = async (file: Blob): Promise<Report> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const csvText = buffer.toString('utf-8');
  const { data, meta } = parse<TableRow>(csvText, {
    delimiter: ';',
    header: true,
  });

  const isSwedish = meta.fields?.includes('Belopp') ?? false;

  const typedData = data.map((row) => ({
    ...row,
    lang: isSwedish ? 'sv' : 'fi',
  })) as TableRow[];

  let totalIncome = 0,
    totalExpenses = 0;
  const transactions: Transaction[] = [];

  typedData.forEach((row) => {
    const amountValue = row.lang === 'sv' ? row.Belopp : row.Summa;
    const dateValue = row.lang === 'sv' ? row.Bokningsdag : row.Kirjauspäivä;
    const recipientValue =
      row.lang === 'sv' ? row['Mottagarens namn'] : row['Saajan nimi'];

    if (!amountValue || !dateValue || !recipientValue) return;

    const amount = parseFloat(amountValue.replace(',', '.'));
    if (!isNaN(amount)) {
      if (amount > 0) {
        totalIncome += amount;
      } else {
        totalExpenses += amount;
      }
    }

    transactions.push({
      date: new Date(dateValue),
      amount,
      recipient: recipientValue || '',
    });
  });

  transactions.sort((a, b) => a.date.getTime() - b.date.getTime());

  return {
    totalIncome,
    totalExpenses,
    netIncome: totalIncome + totalExpenses,
    transactions,
  };
};
