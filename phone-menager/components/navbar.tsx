'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const routes = [
    { name: 'Celulares', pathname: '/celulares' },
    { name: 'Cadastrar Celulares', pathname: '/cadastrar-celulares' },
  ];

  return (
    <nav className="flex items-center justify-between p-4 bg-black text-gray-300">
      <Link href="/" passHref className="ml-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={40}
          className="cursor-pointer"
        />
      </Link>

      <div className="flex space-x-6 mr-4 font-museo font-bold">
        {routes.map((route) => (
          <Link
            key={route.pathname}
            href={route.pathname}
            className={`relative group ${
              pathname === route.pathname ? 'text-white' : 'hover:text-gray-100'
            }`}
          >
            {route.name}

            <span
              className={`absolute bottom-[-4px] left-0 h-[2px] w-0 bg-[#15ACDA] transition-all duration-300 ${
                pathname === route.pathname ? 'w-full' : 'group-hover:w-full'
              }`}
            ></span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
