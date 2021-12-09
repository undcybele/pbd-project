import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { AccountComponent } from './components/account/account.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import { TableComponent } from './shared/table/table.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionTableComponent } from './shared/transaction-table/transaction-table.component';
import { PerioadaTimpComponent } from './components/perioada-timp/perioada-timp.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BalanceTableComponent } from './shared/balance-table/balance-table.component';
import { BalanceComponent } from './components/balance/balance.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AccountTypeComponent } from './components/account-type/account-type.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    TableComponent,
    TransactionComponent,
    TransactionTableComponent,
    PerioadaTimpComponent,
    BalanceTableComponent,
    BalanceComponent,
    HomepageComponent,
    AccountTypeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatTableModule,
        MatButtonModule,
        MatSnackBarModule,
        FormsModule,
        CommonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
