"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import Head from './head';

import Nav from "@/components/Navigation";
import FinanceContextProvider from '@/lib/store/finance-context';
import AuthContextProvider from '@/lib/store/auth-context';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer/>
              <Nav />
              {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
