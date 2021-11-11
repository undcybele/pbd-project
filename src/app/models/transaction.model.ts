export interface TransactionModel {
  id? : string,
  transId: number,
  date: Date,
  sum: number,
  desc: string,
  idDebAcc: number,
  idCredAcc: number
}
