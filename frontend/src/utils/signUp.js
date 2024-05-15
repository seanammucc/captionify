export const signUp = async () => {
    const response = await fetch('http://localhost:5000/create-checkout-session',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lookup_key: '123'
      })
})
const res = await response.json()

const stripe = new Stripe('pk_test_51P6A95RtZ4NiKHf30jvhyyptqd8SvgZxGoq38pkMrHGNmRek4aDEOXTXwLJcOozU6PmtfmhrA0wRFaZ144bcYuuf00uGl08qwP')
stripe.redirectToCheckout({
    sessionId: res.id
})
  }