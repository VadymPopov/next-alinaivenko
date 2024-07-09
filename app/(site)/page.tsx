import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Your favorite Tattoo and Permanent Makeup Artist in Toronto.',
  openGraph: {
    title: 'Home',
    description: 'Your favorite Tattoo and Permanent Makeup Artist in Toronto.',
    url: 'https://alinaivenko.com/',
    siteName: 'alinaivenko.com',
    images: [
      {
        url: 'https://alinaivenko.com/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return <p>Home page</p>;
}
