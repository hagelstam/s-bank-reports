import { generatePdf, parseCsv } from '@/lib/report';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const report = await parseCsv(file);
    const pdfBytes = await generatePdf(report);

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;`,
      },
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Error generating report' }, { status: 500 });
  }
}
