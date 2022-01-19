import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

export default function Update() {
  const data = {
    token: "00000000-0000-0000-0000-000000000000",
    return: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJs App</title>
        <meta name='description' content='Your NextJs App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <a
        href={`https://www.payfast.co.za/eng/recurring/update/${data.token}?return=${data.return}`}
      >
        Update the card for your subscription
      </a>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
