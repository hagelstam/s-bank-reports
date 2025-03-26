import { parseCsv } from '@/lib/csv';
import { logger } from '@/lib/logger';
import { generatePdf } from '@/lib/pdf';
import { tryCatch } from '@/lib/utils';

export const POST = async (req: Request) => {
  const start = Date.now();

  const formData = await req.formData();
  const file = formData.get('file') as Blob;
  if (!file) {
    return Response.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const { data: report, error: csvErr } = await tryCatch(parseCsv(file));
  if (csvErr) {
    logger.error('Error parsing CSV:', csvErr);
    return Response.json({ error: 'Error parsing CSV file' }, { status: 500 });
  }

  const { data: pdf, error: pdfErr } = await tryCatch(generatePdf(report));
  if (pdfErr) {
    logger.error('Error generating PDF:', pdfErr);
    return Response.json(
      { error: 'Error generating PDF report' },
      { status: 500 }
    );
  }

  const end = Date.now();
  const duration = end - start;

  logger.info(`Report generated in ${duration}ms`);

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment;`,
    },
  });
};
