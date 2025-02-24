import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-background fixed top-0 z-30 w-full">
      <div className="mx-5 flex h-20 max-w-screen-xl items-center justify-between xl:mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            height="143"
            width="320"
            className="h-[48px] w-auto"
          />
        </Link>
        <Link
          href="https://github.com/hagelstam/s-bank-reports"
          className="flex items-center"
          target="_blank"
        >
          <Image
            src="/github.png"
            alt="GitHub"
            width="191"
            height="191"
            className="size-[32px]"
          />
        </Link>
      </div>
    </nav>
  );
}
