const pfValidPaymentData = ({ cartTotal, pfData }) => {
  return (
    Math.abs(parseFloat(cartTotal) - parseFloat(pfData["amount_gross"])) <= 0.01
  )
}

export default pfValidPaymentData
