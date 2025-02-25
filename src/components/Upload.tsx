'use client';

import Button from '@/components/Button';
import { useState } from 'react';
import Dropzone from './Dropzone';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <Dropzone onChange={(e) => setFile(e.target.files?.[0] || null)} />
      {isError && (
        <div className="flex flex-col gap-1 text-center text-sm text-red-700">
          <p>There was an error generating the report.</p>
          <p>Please check the format of the CSV and try again later.</p>
        </div>
      )}
      <Button onClick={handleUpload} loading={isLoading} disabled={!file}>
        {isLoading ? 'Generating...' : 'Generate Report'}
      </Button>
    </div>
  );
}
