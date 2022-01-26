const axios = require("axios")
const crypto = require("crypto")
const dns = require("dns")
const fs = require("fs")

export default async function register(req, res) {
  const { body } = req

  const pfHost = process.env.NEXT_PUBLIC_TEST
    ? "sandbox.payfast.co.za"
    : "www.payfast.co.za"

  const pfData = JSON.parse(JSON.stringify(body))
  const data = JSON.stringify(body)

  let pfParamString = ""
  for (let key in pfData) {
    if (pfData.hasOwnProperty(key) && key !== "signature") {
      pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(
        /%20/g,
        "+"
      )}&`
    }
  }
  // Remove last ampersand
  pfParamString = pfParamString.slice(0, -1)

  const pfValidSignature = (pfData, pfParamString, pfPassphrase = null) => {
    // Calculate security signature
    if (pfPassphrase !== null) {
      pfParamString += `&passphrase=${encodeURIComponent(
        pfPassphrase.trim()
      ).replace(/%20/g, "+")}`
    }

    const signature = crypto
      .createHash("md5")
      .update(pfParamString)
      .digest("hex")
    return pfData["signature"] === signature
  }

  async function ipLookup(domain) {
    return new Promise((resolve, reject) => {
      dns.lookup(domain, { all: true }, (err, address, family) => {
        if (err) {
          reject(err)
        } else {
          const addressIps = address.map(function (item) {
            return item.address
          })
          resolve(addressIps)
        }
      })
    })
  }

  const pfValidIP = async (req) => {
    const validHosts = [
      "www.payfast.co.za",
      "sandbox.payfast.co.za",
      "w1w.payfast.co.za",
      "w2w.payfast.co.za",
    ]

    let validIps = []
    const pfIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress

    try {
      for (let key in validHosts) {
        const ips = await ipLookup(validHosts[key])
        validIps = [...validIps, ...ips]
      }
    } catch (err) {
      console.error(err)
    }

    const uniqueIps = [...new Set(validIps)]

    if (uniqueIps.includes(pfIp)) {
      return true
    }
    return false
  }

  const pfValidPaymentData = (cartTotal, pfData) => {
    return (
      Math.abs(parseFloat(cartTotal) - parseFloat(pfData["amount_gross"])) <=
      0.01
    )
  }

  const pfValidServerConfirmation = async (pfHost, pfParamString) => {
    const result = await axios
      .post(`https://${pfHost}/eng/query/validate`, pfParamString)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.error(error)
      })
    return result === "VALID"
  }

  const check1 = pfValidSignature(pfData, pfParamString)
  const check2 = await pfValidIP(req)
  const check3 = pfValidPaymentData("100.00", pfData) //TODO: fetch the value for cartTotal from db
  const check4 = await pfValidServerConfirmation(pfHost, pfParamString)

  if (check1 && check2 && check3 && check4) {
    fs.writeFileSync("data/users.json", data) //TODO: post to db here
    return res.status(200).json({})
  } else {
    return res.status(200).json({})
  }
}
