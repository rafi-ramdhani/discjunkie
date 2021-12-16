let formatPrice = (priceValue) => {
  let format = priceValue.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR'
  })

  return format
}

module.exports = formatPrice