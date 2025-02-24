import { parse } from 'papaparse';

type TableRow = {
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
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

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

    return Response.json(
      {
        data: {
          totalIncome: totalIncome,
          totalExpenses: totalExpenses,
          netIncome: totalIncome - totalExpenses,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Error generating report' }, { status: 500 });
  }
}
