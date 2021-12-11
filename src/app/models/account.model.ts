export enum accTypeEnum {
  "CA",  "PA", "AC"
}

export interface AccountModel {
  id? : string,
  accNumber: number,
  description: string,
  accType: accTypeEnum,
  soldInit: number,
  soldCurr: number,
}
