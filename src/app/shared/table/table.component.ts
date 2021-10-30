import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AccountModel} from "../../models/account.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input()
  data: AccountModel[];
  dataSource;
  accEnum = ["CA", "PA", "AC"]
  displayedColumns = ["accNumber", "accType", "soldInit", "soldCurr", "description"]
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

}
