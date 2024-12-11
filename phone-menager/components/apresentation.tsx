'use client';
import { TypeAnimation } from 'react-type-animation';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';

const Apresentation = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between p-8 bg-gray-900 gap-8">
      <div className="flex flex-col justify-center max-w-xl space-y-4 text-center md:text-left">
        <p className="text-white font-museo font-bold bg-gradient-to-r from-[#15ACDA] to-[#00B8D4] bg-clip-text text-transparent">
          <TypeAnimation
            sequence={[
              'SEU CELULAR EM SUAS MÃOS!',
              5000,
              'CONECTE-SE JÁ!',
              5000,
            ]}
            wrapper="strong"
            speed={50}
            style={{
              fontSize: 'clamp(2rem, 10vw, 6em)',
              display: 'inline-block',
              lineHeight: '1.2',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
            repeat={Infinity}
          />
        </p>
        <Button
          variant={'secondary'}
          className="w-auto max-w-[200px] mx-auto sm:mx-0 md:mx-0"
        >
          <Link href={'/celulares'} className="flex items-center space-x-2">
            <span>Celulares</span>
            <ShoppingBag />
          </Link>
        </Button>
      </div>
      <div className="flex justify-center items-center mt-8 md:mt-0 md:ml-4">
        <Image
          src={'/celular.png'}
          width={500}
          height={350}
          alt="Celular"
          className="w-3/4 sm:w-auto mb-4 md:mb-0"
        />
      </div>
    </div>
  );
};

export default Apresentation;
