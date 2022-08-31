const formatCurrency = (value: number, fractionDigits = 2) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: fractionDigits,
  notation: 'compact',
  compactDisplay: 'short'
}).format(value)

const formatValue = (value: number, fractionDigits = 2) => new Intl.NumberFormat('en-US', {
  maximumFractionDigits: fractionDigits,
  notation: 'compact',
  compactDisplay: 'short'
}).format(value)

export { formatCurrency, formatValue }
