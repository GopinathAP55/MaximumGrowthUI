import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service'
import { SelectionModel } from '@angular/cdk/collections';


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
  selectedDay = ['Monday']
  selection = new SelectionModel<any>(true, []);
  dataSource

  @Output() algoDataClicked = new EventEmitter<any>();

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    console.log('test')
    this.loadData(this.selectedDay)
    
  }
  displayedColumns: string[] = ['select', 'enable', 'mtm', 'name', 'day', 'actions'];
  loadData(event) {
    if (event.value || event ) {

      this.apiService.getData(event.value || event).subscribe({

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
    item.edit= true
    this.algoDataClicked.emit(item)
  }

  deleteItem(item): void {
    // Implement your delete logic here
    console.log('Delete item:', item);
    this.apiService.deleteAlgo(item.name).subscribe({
      next : res=>{
        console.log(res)
        this.loadData(this.selectedDay)
      },
      error : err=>{
        console.log(err)
      }
    })
    
    
  }

  onClickColumn(event){
    console.log(event)
    this.algoDataClicked.emit(event)

  }

  refresh(){
    this.loadData(this.selectedDay)
  }

}
