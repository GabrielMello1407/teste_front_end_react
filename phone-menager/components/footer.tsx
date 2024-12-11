'use client';

import { Github, LinkedinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex justify-center md:justify-start items-center space-x-4">
          <Image src={'/logo.png'} width={120} height={120} alt="Logo" />
          <span className="text-2xl font-museo font-bold bg-gradient-to-r from-[#15ACDA] to-[#00B8D4] bg-clip-text text-transparent">
            GABRIEL MELLO DEVELOPER
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex space-x-6 text-lg">
            <Link
              href={'https://github.com/GabrielMello1407'}
              className="hover:text-[#00B8D4]"
            >
              <Github />
            </Link>
            <Link
              href={'https://www.linkedin.com/in/gabrielmellomoraes/'}
              className="hover:text-[#00B8D4]"
            >
              <LinkedinIcon />
            </Link>
          </div>
          <p className="mt-4 md:mt-0 text-center text-sm">
            Desenvolvido por Gabriel Mello
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
