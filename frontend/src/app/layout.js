import './globals.css';

export const metadata = {
  title: 'Delhi Public Model School - School ERP',
  description: 'Excellence in Modern Education and Campus Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased font-sans min-h-screen m-0 p-0 w-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
