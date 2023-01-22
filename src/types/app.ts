export enum AppType {
  ALL = 'ALL',
  DAPP = 'DAPP',
  LAYER2 = 'LAYER2'
}

export const appTypeMappingToName: Record<AppType, string> = {
  [AppType.ALL]: 'All',
  [AppType.DAPP]: 'Dapps',
  [AppType.LAYER2]: 'Layer 2'
}

export const appTypeOptions = Object.keys(AppType).map(key => ({
  value: appTypeMappingToName[key as AppType],
  originalValue: key as AppType
}))
