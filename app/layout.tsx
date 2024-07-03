import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Linkfolio - Build Your Brand, Inspire Others',
  description:
    'Connect with like-minded individuals and showcase your real-world portfolios. Build your brand and inspire others on Linkfolio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-theme='light'>
      <body
        className={`${poppins.className} mx-auto max-w-[1536px] px-[20px] text-[color:#07233D] md:px-[40px] xl:px-[60px] 2xl:px-[133px]`}
      >
        {children}
      </body>
    </html>
  );
}
