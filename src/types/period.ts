export enum Period {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  TRIMESTER = 'TRIMESTER',
  SEMESTER = 'SEMESTER',
  YEARLY = 'YEARLY'
}

export const periodMappingToDay: Record<Period, string> = {
  [Period.WEEKLY]: '7D',
  [Period.MONTHLY]: '30D',
  [Period.TRIMESTER]: '90D',
  [Period.SEMESTER]: '180D',
  [Period.YEARLY]: '365D'
}

export const periodOptions = Object.keys(Period).map(key => ({
  value: periodMappingToDay[key as Period],
  originalValue: key as Period
}))
