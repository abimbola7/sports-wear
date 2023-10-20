import './globals.css'
import { Inter, Montserrat, Oswald } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Modal from '@/components/modal'
import Providers from '@/store/provider'
import store from '@/store'

const inter = Inter({ subsets: ['latin'] })
export const oswald = Oswald({
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700']
});

export const montserrat = Montserrat({
  subsets : ['latin'],
  weight: ['200', '300', '400', '500', '600', '700']
})    


// export const metadata =
//   {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
//   }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers
        >
          <Header/>
          {/* <Modal /> */}
          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
