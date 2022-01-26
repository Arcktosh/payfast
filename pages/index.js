import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import generateSignature from "../snippets/generateSignature"

export default function Home() {
  const testingMode = process.env.NEXT_PUBLIC_TEST
  var pfHost = testingMode ? "sandbox.payfast.co.za" : "www.payfast.co.za"

  // This amount needs to be sourced from your application
  var data
  data = {
    // Merchant details
    merchant_id: process.env.NEXT_PUBLIC_MERCHANT_ID,
    merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY,
    return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
    notify_url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/register`,
    // Buyer details
    // name_last string, 100 char | OPTIONAL
    name_first: "John",
    // name_last string, 100 char | OPTIONAL
    name_last: "Doe",
    // email_address string, 100 char | OPTIONAL
    email_address: "benhenning10@gmail.com",
    // cell_number string, 100 char | OPTIONAL
    cell_number: "0638022173",
    // m_payment_id string, 100 char | OPTIONAL
    m_payment_id: "01AB",
    // amount decimal | REQUIRED
    amount: "100.00",
    // item_name string, 100 char | REQUIRED
    item_name: "OrderNr #S123456",
    // item_description string, 255 char | OPTIONAL
    item_description: "A test product",
    // custom_int<1..5> integer, 255 char | OPTIONAL
    custom_int1: "2",
    // custom_str<1..5> string, 255 char | OPTIONAL
    custom_str1: "Extra order information",
    //email_confirmation boolean, 1 char | OPTIONAL */}
    email_confirmation: "1",
    //confirmation_address string, 100 char | OPTIONAL */}
    confirmation_address: "benhenning10@gmail.com",
    // payment_method string, 3 char | OPTIONAL
    //     'eft' - EFT
    //     'cc' - Credit card
    //     'dc' - Debit card
    //     'mp' - Masterpass
    //     'mc' - Mobicred
    //     'sc' - SCode
    //     'ss' - SnapScan
    //     'zp' - Zapper
    //     'mt' - MoreTyme
    payment_method: "cc",
    // subscription_type integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
    subscription_type: 1, //1 - sets type to a subscription, 2 - sets type to a tokenization payment
    // billing_date date (YYYY-MM-DD) | OPTIONAL
    billing_date: "2020-01-01",
    // recurring_amount decimal | OPTIONAL
    recurring_amount: "100.00",
    // frequency integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
    //  3 - Monthly
    //  4 - Quarterly
    //  5 - Biannually
    //  6 - Annual
    frequency: 3,
    // cycles integer, 1 char | REQUIRED FOR SUBSCRIPTIONS
    cycles: 12,
  }
  data["signature"] = generateSignature(data)
  //TODO: save data to db
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJs App</title>
        <meta name='description' content='Your NextJs App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <form action={`https://${pfHost}/eng/process`} method='post'>
        <input type='hidden' name='merchant_id' value={data.merchant_id} />
        <input type='hidden' name='merchant_key' value={data.merchant_key} />
        <input type='hidden' name='return_url' value={data.return_url} />
        <input type='hidden' name='cancel_url' value={data.cancel_url} />
        <input type='hidden' name='notify_url' value={data.notify_url} />
        <input type='hidden' name='name_first' value={data.name_first} />
        <input type='hidden' name='name_last' value={data.name_last} />
        <input type='hidden' name='email_address' value={data.email_address} />
        <input type='hidden' name='cell_number' value={data.cell_number} />
        <input type='hidden' name='m_payment_id' value={data.m_payment_id} />
        <input
          type='hidden'
          name='subscription_type'
          value={data.subscription_type}
        />
        <input type='hidden' name='billing_date' value={data.billing_date} />
        <input
          type='hidden'
          name='recurring_amount'
          value={data.recurring_amount}
        />
        <input type='hidden' name='frequency' value={data.frequency} />
        <input type='hidden' name='cycles' value={data.cycles} />
        <input type='hidden' name='amount' value={data.amount} />
        <input type='hidden' name='item_name' value={data.item_name} />
        <input
          type='hidden'
          name='item_description'
          value={data.item_description}
        />
        <input type='hidden' name='custom_int1' value={data.custom_int1} />
        <input
          type='hidden'
          name='custom_str1'
          value={data.custom_str1}
        ></input>
        <input
          type='hidden'
          name='email_confirmation'
          value={data.email_confirmation}
        />
        <input
          type='hidden'
          name='confirmation_address'
          value={data.confirmation_address}
        />
        <input
          type='hidden'
          name='payment_method'
          value={data.payment_method}
        />
        <input name='signature' type='hidden' value={data.signature} />
        <input type='submit' value='Pay Now' />
      </form>

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
