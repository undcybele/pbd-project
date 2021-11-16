import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TransactionModel } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  dbPath = "transactions"
  constructor(private afs: AngularFirestore) { }

  createTransactions(transaction: TransactionModel) {
    this.afs.collection<TransactionModel>(this.dbPath).add(transaction)
  }
  getTransactions(){
    return this.afs.collection<TransactionModel>(this.dbPath);
  }

  //for task e
  // getAllForAcc(id: string){
  //   let debAccs = this.afs.collection<TransactionModel>(this.dbPath, ref => ref.where('idDebAcc', '==', id))
  //   let credAccs = this.afs.collection<TransactionModel>(this.dbPath, ref => ref.where('idCredAcc', '==', id))
  //   return 0
  // }

}
