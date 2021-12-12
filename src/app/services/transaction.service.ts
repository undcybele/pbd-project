import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AccountModel } from '../models/account.model';
import {TransactionModel} from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  dbPath = "transactions"

  constructor(private afs: AngularFirestore) {
  }

  createTransactions(transaction: TransactionModel) {
    this.afs.collection<TransactionModel>(this.dbPath).add(transaction)
  }

  getTransactions() {
    return this.afs.collection<TransactionModel>(this.dbPath, ref => ref.orderBy('transId', "asc"));
  }

  getTransactionsByDate() {
    let beginDate = new Date("01.01.2010").toLocaleString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    let endDate = new Date("01.06.2010").toLocaleString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    console.log(beginDate + " + " + endDate)
    return this.afs.collection<TransactionModel>(this.dbPath, ref =>
        ref
          .where('date', '>', beginDate)
          .where('date', '<', endDate))
  }

  getTotalBalanceForSingleAcc(acc: AccountModel, transactions: Array<TransactionModel>, all) {
    let sumDeb = 0
    let sumCred = 0
    transactions.filter(trans =>
      trans.idDebAcc === acc.accNumber || trans.idCredAcc === acc.accNumber)
      .forEach(trans => {
          if (trans.idCredAcc === acc.accNumber) {
            sumCred += trans.sum
          } else {
            sumDeb += trans.sum
          }
        }
      )
    all.push({accNumber: acc.accNumber, soldInit: acc.soldInit, totalDeb: sumDeb, totalCred: sumCred})
    return all;
  }
}
