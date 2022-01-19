import ipLookup from "./ipLookup"

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
      const ips = await ipLookup({ domain: validHosts[key] })
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

export default pfValidIP
