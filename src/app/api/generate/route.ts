export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const csvBuffer: Buffer[] = [];

    const buffer = Buffer.from(await file.arrayBuffer());
    csvBuffer.push(buffer);
    const finalCsv = Buffer.concat(csvBuffer);

    return new Response(finalCsv, {
      headers: {
        'Content-Type': 'application/csv',
        'Content-Disposition': 'attachment; filename=report.csv',
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    return Response.json({ error: 'Error generating report' }, { status: 500 });
  }
}
