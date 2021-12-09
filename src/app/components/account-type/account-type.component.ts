import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { AccountModel } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss']
})
export class AccountTypeComponent implements OnInit {
  selectedValue: string;
  types = [
    {value: "PA", viewValue: "PA"},
    {value: "CA", viewValue: "CA"},
    {value: "AC", viewValue: "AC"},
  ]
  accountsType: AccountModel[]
  accounts: AccountModel[]

  constructor(
    private accService: AccountService,
  ) {}

  ngOnInit(): void {}

  getAccsByType(){

  }

  getAccs(){
    this.accService.getAcc().snapshotChanges().pipe(
      map(changes =>
        changes.map (c => ({...c.payload.doc.data()}))
      )
    ).subscribe(data => this.accountsType = data)
  }

}
