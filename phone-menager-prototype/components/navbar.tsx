'use client';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-center p-4 bg-[#054A91] text-gray-300">
      <Link href="/" passHref className="ml-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={40}
          className="cursor-pointer"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
