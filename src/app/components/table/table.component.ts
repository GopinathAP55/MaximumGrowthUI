import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service'
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  id: number;
  name: string;
  email: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Hydrogen', email: 1.0079, symbol: 'H' },

];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit {

  //   data =[{
  //     'enable':true,
  //     'mtm':100,
  //     'algoName':'test'
  //   },

  //   {
  //     'enable':false,
  //     'mtm':100,
  //     'algoName':'test1'
  //   },
  // ];
  data;
  daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  selectedDay
  selection = new SelectionModel<any>(true, []);
  dataSource

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    console.log('test')
    
  }
  displayedColumns: string[] = ['select', 'enable', 'mtm', 'name', 'day', 'actions'];
  daySelect(event) {
    if (event.value) {

      this.apiService.getData(event.value).subscribe({

        next: (res: any) => {
          this.data = res
          console.log(res)
          this.dataSource = this.data;
        },
        error: (error: any) => {
          console.log(error);

        }
      }
      )
    }
  }
  toggleStatus(device): void {
    device.status = !device.status;
    // You can add logic here to handle the change in status (e.g., API call to update the status)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  editItem(item): void {
    // Implement your edit logic here
    console.log('Edit item:', item);
  }

  deleteItem(item): void {
    // Implement your delete logic here
    console.log('Delete item:', item);
  }


}
