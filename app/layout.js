import './globals.css';

export const metadata = {
  title: 'Motherboard — Build Power Around Real Life',
  description: 'The agentic AI builder academy for women. Build a digital workforce around your intelligence — and own what you build.',
  openGraph: { title: 'Motherboard — Build Power Around Real Life', description: 'Free live Agentic AI Masterclass · Tuesday, Sept 29 · 5:30 PM PT', url: 'https://motherboard-vad4.vercel.app', siteName: 'Motherboard' },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
