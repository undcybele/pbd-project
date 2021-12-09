import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountModel} from "../../models/account.model";
import {map} from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accountForm = new FormGroup({
    accNumber: new FormControl(0, [Validators.required, Validators.pattern('[0-9]{5}')]),
    description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    accType: new FormControl(null, [Validators.required]),
    soldInit: new FormControl(0, [Validators.required, Validators.min(0)]),
  })
  accounts: AccountModel[]
  constructor(
    private accService: AccountService,
    private _snackBar: MatSnackBar,
  ) { }

  onSubmit(): void {
    const account: AccountModel = this.accountForm.value;
    account.soldCurr = account.soldInit
    this.accService.createAcc(account)
    this.openSnackBar('Cont adaugat!')
  }

  ngOnInit(): void {
    this.getAccs()
  }

  getAccs(){
    this.accService.getAcc().snapshotChanges().pipe(
      map(changes =>
        changes.map (c => ({...c.payload.doc.data()}))
      )
    ).subscribe(data => this.accounts = data)
  }
  openSnackBar(message: string) {
    this._snackBar.open(message,'',{
      duration: 2000
    });
  }
}
