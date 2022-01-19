import axios from "axios"

const pfValidServerConfirmation = async ({ pfParamString }) => {
  const pfhost = process.env.NEXT_PUBLIC_TEST
    ? "sandbox.payfast.co.za"
    : "www.payfast.co.za"

  const result = await axios
    .post(`https://${pfhost}/eng/query/validate`, pfParamString)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.error(error)
    })
  return result === "VALID"
}

export default pfValidServerConfirmation
