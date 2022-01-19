import pfValidIP from "../snippets/pfValidIp"
import pfValidPaymentData from "../snippets/pfValidPaymentData"
import pfValidServerConfirmation from "../snippets/pfValidServerConfirmation"
import pfValidSignature from "../snippets/pfValidSignature"

export default function Notify() {
  const cartTotal = "100.00"
  const check1 = pfValidSignature({
    pfData: pfData,
    pfParamString: pfParamString,
    pfPassphrase: passPhrase,
  })
  const check2 = pfValidIP({ req: req })
  const check3 = pfValidPaymentData({ cartTotal: cartTotal, pfData: pfData })
  const check4 = pfValidServerConfirmation(pfHost, pfParamString)

  if (check1 && check2 && check3 && check4) {
    // All checks have passed, the payment is successful
  } else {
    // Some checks have failed, check payment manually and log for investigation
  }

  if (check1 && check2 && check3 && check4) {
    console.log("valid")
    // All checks have passed, the payment is successful
  } else {
    console.log("error")
    // Some checks have failed, check payment manually and log for investigation
  }
  return <></>
}
