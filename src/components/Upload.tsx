'use client';

import Button from '@/components/Button';
import { useState } from 'react';
import Dropzone from './Dropzone';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/generate', {
      method: 'POST',
      body: formData,
    });

    const date = new Date().toLocaleDateString('fi-FI');
    const filename = `S-Bank Report ${date}.pdf`;

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <Dropzone onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button disabled={!file} onClick={handleUpload}>
        Upload CSV
      </Button>
    </div>
  );
}
