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
}
