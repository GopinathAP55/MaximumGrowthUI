import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css']
})
export class CommonTableComponent implements OnInit {
  @Input() columns: Array<{ key: string; label: string }> = [];
  @Input() dataSource = [];
  data = new MatTableDataSource

  columnKeys: string[] = [];
  @ViewChild(MatPaginator) paginator : MatTableDataSourcePaginator;

  ngOnInit(): void {
    this.columnKeys = this.columns.map((column) => column.key);
    this.data = new MatTableDataSource(this.dataSource) 

    this.paginator.length = this.data.data.length
    this.data.paginator = this.paginator;
  }

}
