export const convertCurrency = (value) => {
	let USDollar = new Intl.NumberFormat('es-DO', {
		style: 'currency',
		currency: 'DOP',
	})
	return USDollar.format(value)
}
