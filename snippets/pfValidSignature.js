const crypto = require("crypto")

const pfValidSignature = ({ pfData, pfParamString, pfPassphrase = null }) => {
  // Calculate security signature
  let tempParamString = ""
  if (pfPassphrase !== null) {
    pfParamString += `&passphrase=${encodeURIComponent(
      pfPassphrase.trim()
    ).replace(/%20/g, "+")}`
  }

  const signature = crypto.createHash("md5").update(pfParamString).digest("hex")
  return pfData["signature"] === signature
}

export default pfValidSignature
