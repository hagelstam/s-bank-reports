import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background mt-auto w-full border-t border-gray-200">
      <div className="mx-6 flex h-20 max-w-[1024px] flex-row items-center justify-between lg:mx-auto">
        <p className="text-text-primary">
          © S-Bank Reports {new Date().getFullYear()}
        </p>
        <Link
          href="https://github.com/hagelstam/s-bank-reports"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
        >
          <Image
            src="/github.png"
            alt="GitHub Logo"
            width="191"
            height="191"
            className="size-[32px] hover:opacity-75"
          />
        </Link>
      </div>
    </footer>
  );
}
