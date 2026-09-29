import './globals.css';

export const metadata = {
  title: 'Delhi Public Model School - Management ERP',
  description: 'CBSE Affiliated Senior Secondary School & Enterprise ERP',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
