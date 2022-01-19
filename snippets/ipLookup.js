const dns = require("dns").lookup

async function ipLookup({ domain }) {
  return new Promise((resolve, reject) => {
    dns(domain, { all: true }, (err, address, family) => {
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

export default ipLookup
