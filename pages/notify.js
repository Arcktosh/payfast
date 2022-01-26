import pfValidIP from "../snippets/pfValidIp"
import pfValidPaymentData from "../snippets/pfValidPaymentData"
import pfValidServerConfirmation from "../snippets/pfValidServerConfirmation"
import pfValidSignature from "../snippets/pfValidSignature"

export default function Notify() {
  const testingMode = process.env.NEXT_PUBLIC_TEST
  var pfHost = testingMode ? "sandbox.payfast.co.za" : "www.payfast.co.za"

  const pfData = JSON.parse(JSON.stringify(Request.body))

  let pfParamString = ""
  for (let key in pfData) {
    if (pfData.hasOwnProperty(key) && key !== "signature") {
      pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(
        /%20/g,
        "+"
      )}&`
    }
  }

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
    console.log("valid", check1, check2, check3, check4)
    // All checks have passed, the payment is successful
  } else {
    console.log("error", check1, check2, check3, check4)
    // Some checks have failed, check payment manually and log for investigation
  }
  return <></>
}
