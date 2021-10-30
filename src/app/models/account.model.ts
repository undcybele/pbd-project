export enum accTypeEnum {
  "ca",  "pa", "ac"
}

export interface AccountModel {
  id? : string,
  accNumber: number,
  description: string,
  accType: accTypeEnum,
  soldInit: number,
  soldCurr: number
}
