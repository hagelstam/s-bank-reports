import { logger } from '@/lib/logger';
import { generatePdf, parseCsv } from '@/lib/report';

export async function POST(req: Request) {
  logger.info('Generating report...');
  const start = Date.now();

  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const report = await parseCsv(file);
    const pdfBytes = await generatePdf(report);

    const end = Date.now();
    const duration = end - start;

    logger.info(`Report generated in ${duration}ms`);

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;`,
      },
    });
  } catch (err) {
    logger.error('Error generating report: ', err);
    return Response.json({ error: 'Error generating report' }, { status: 500 });
  }
}
