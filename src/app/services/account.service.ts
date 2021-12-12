import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from 'rxjs/operators';
import {AccountModel, accTypeEnum} from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  dbPath = "accounts"
  id: any;

  constructor(private afs: AngularFirestore) {
  }

  createAcc(acc: AccountModel) {
    this.afs.collection<AccountModel>(this.dbPath).add(acc)
  }

  getAcc() {
    return this.afs.collection<AccountModel>(this.dbPath, ref => ref.orderBy('accNumber', "asc"));
  }

  getAccByAccId(accNumber: number) {
    return this.afs.collection<AccountModel>(this.dbPath, ref => ref.where('accNumber', '==', accNumber).limit(1));
  }

  //for task d
  updateSoldCurr(accountNumber: number, transactionSum: number) {
    let accounts: AccountModel[]
    let currAccSold
    let ok = 0
    this.getAccByAccId(accountNumber)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            this.id = c.payload.doc.id;
            return (c.payload.doc.id, {...c.payload.doc.data()})
          })
        })
      ).subscribe(data => {
      accounts = data
      currAccSold = accounts[0]!.soldCurr
      const processedSum = currAccSold - transactionSum
      const d = {"soldCurr": processedSum}
      try{
        if (ok === 0) {
          ok++
          this.afs.collection(this.dbPath).doc(this.id).update(d)
        }
      }catch (e){
        console.log("Transactia nu a putut fi persistata!" + e)
      }

    })
  }

  //for task h
  getAllByType(searchedAccType: any) {
    return this.afs.collection<AccountModel>(this.dbPath, ref => ref.where('accType', '==', searchedAccType.toString()))
  }

  deleteAccount(accId: string){
    return this.afs.collection<AccountModel>(this.dbPath).doc(accId).delete();
  }
}

