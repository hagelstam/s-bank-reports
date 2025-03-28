'use client';

import { Button, Dropzone } from '@/components';
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
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);

      setIsLoading(false);
      setFile(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-text-accent font-serif text-7xl">S-Bank Reports</h1>
      <p className="mb-8 text-xl">Generate reports for S-Bank accounts.</p>
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
