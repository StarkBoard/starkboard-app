import { formatCurrency } from 'utils/helpers/format'

interface FormatterOptions {
  series: number[][];
  dataPointIndex: number;
}

export const formatter = (value: number, { series, dataPointIndex } : FormatterOptions) => {
  let output = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value))
  if (series) {
    const total = series.map((serie: number[]) => serie[dataPointIndex]).reduce((a: number, b: number) => a + b)
    output = output + ' (Total: ' + formatCurrency(total) + ')'
  }
  return output
}
