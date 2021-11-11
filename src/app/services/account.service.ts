import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AccountModel} from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  dbPath = "accounts"
  constructor(private afs: AngularFirestore) { }
  createAcc(acc: AccountModel) {
    this.afs.collection<AccountModel>(this.dbPath).add(acc)
  }
  getAcc(){
    return this.afs.collection<AccountModel>(this.dbPath);
  }

  getAccByAccId(accountId: number) {
    return this.afs.collection<AccountModel>(this.dbPath, ref => ref.where('accountId', '==', accountId).limit(1));
  }

  updateSoldCurr(id: string, processedSum: number){
    const data = {"soldCurr": processedSum};
    return this.afs.collection(this.dbPath).doc(id).set(data);
  }
}
