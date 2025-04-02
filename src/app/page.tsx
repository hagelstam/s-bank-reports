'use client';

import { Button, Dropzone } from '@/components';
import { downloadFile } from '@/lib/utils';
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const generateReport = async () => {
    if (!file || isLoading) return;
    setIsLoading(true);
    setIsError(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Error generating report');
      }

      const date = new Date().toLocaleDateString('fi-FI');
      const filename = `S-Bank Report ${date}.pdf`;
      const blob = await res.blob();

      downloadFile(blob, filename);

      setIsLoading(false);
      setFile(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      setIsLoading(false);
      setIsError(true);
      setFile(null);
    }
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-6">
      <h1 className="text-text-accent font-serif text-7xl">S-Bank Reports</h1>
      <p className="mb-10 max-w-2xl text-center text-xl">
        Upload your S-Bank transactions CSV, and let us turn it into a simple
        financial report for you.
      </p>
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <Dropzone onChange={handleFileChange} fileName={file?.name ?? ''} />
        {isError && (
          <div className="flex flex-col gap-1 text-center text-sm text-red-700">
            <p>There was an error generating the report.</p>
            <p>Please check the format of the CSV and try again later.</p>
          </div>
        )}
        <Button
          onClick={generateReport}
          loading={isLoading}
          disabled={!file || isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Report'}
        </Button>
      </div>
    </div>
  );
}
