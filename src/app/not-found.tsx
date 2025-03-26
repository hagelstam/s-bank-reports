'use client';

import { Button } from '@/components';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-text-accent font-serif text-7xl">404</h1>
      <p className="mb-8 text-xl">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button onClick={() => router.push('/')}>Return Home</Button>
    </div>
  );
}
