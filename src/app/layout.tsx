import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className='min-h-screen flex flex-col'>
        <Header/>
        <main className="p-4 flex-grow p-4">
          {children}
        </main>
        <div className=''>
        <Footer/>
        </div>
      </body>
    </html>
  )
}
