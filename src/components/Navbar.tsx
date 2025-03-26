import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="bg-background top-0 w-full border-b border-gray-200">
      <div className="mx-6 flex h-20 max-w-[1024px] items-center justify-between lg:mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            height="143"
            width="320"
            className="h-[48px] w-auto"
          />
        </Link>
      </div>
    </nav>
  );
};
