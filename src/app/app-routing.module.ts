import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTypeComponent } from './components/account-type/account-type.component';
import { AccountComponent } from './components/account/account.component';
import { BalanceComponent } from './components/balance/balance.component';
import { PerioadaTimpComponent } from './components/perioada-timp/perioada-timp.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import {AccountTransactionComponent} from "./components/account-transaction/account-transaction.component";
import { AccountTopComponent } from './components/account-top/account-top.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionComponent },
  { path: 'accounts', component: AccountComponent },
  { path: 'perioada-timp', component: PerioadaTimpComponent },
  { path: 'solduri-totale', component: BalanceComponent },
  { path: 'cont-tip', component: AccountTypeComponent },
  { path: 'account-transactions', component: AccountTransactionComponent },
  { path: 'cont-top', component: AccountTopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
