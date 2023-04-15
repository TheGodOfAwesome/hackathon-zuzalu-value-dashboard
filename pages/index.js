import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Dashboard } from './dashboard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Zuzalu Value Dashboard</title>
        <meta name="description" content="Zuzalu Value Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Dashboard />
        Todo list: <br />
        - Auth (Zuzalu Passport) <br />
        - Dashboard page <br />
        - Page to make attestations <br />
        - Attestation smart contract <br />
        - Make it pretty <br /> <br />
        Nice to have: <br />
        - Page to view all attestations <br />
        
      </main>
    </>
  )
}
