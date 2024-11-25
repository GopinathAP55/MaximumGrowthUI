import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service'
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from 'src/app/services/notification-service';
import { SignalService } from 'src/app/services/signal.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MarketDataSocketService } from 'src/app/services/market-data/market-data-socket.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit,AfterViewInit  {

 
  data;
  daysArray = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday']
  selectedDay = 'Monday'
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource
  isLoading = false
  mtmObject = []
  
  @Output() algoDataClicked = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator : MatTableDataSourcePaginator;
  constructor(private apiService: ApiServiceService,
    private notificationService : NotificationService,
    public signalService:SignalService,
    private webSocketService: MarketDataSocketService
    ) { }

  ngOnInit() {
    console.log('table')
    const today = new Date();
    this.selectedDay = this.daysArray[today.getDay()] || 'Monday'
    
    this.webSocketService.getRefreshSubject().subscribe((data)=>{
      this.refresh()
    })
    this.webSocketService.getPositionSubject().subscribe((datafromSocket)=>{
      this.data.map((ele)=>{
        if(ele._id==datafromSocket.algoId){
          ele.mtm = datafromSocket.UnrealizedMTM
        }
      })
    })
    this.loadData(this.selectedDay)
    
  }
  displayedColumns: string[] = ['select','broker', 'enable', 'status','mtm', 'name', 'day', 'actions'];
  loadData(event) {
    if (event.value || event ) {
      this.isLoading = true
      this.apiService.getData(event.value || event).subscribe({

        next: (res: any) => {
          this.isLoading = true
          this.data = res
          console.log(res)
          this.dataSource = new MatTableDataSource(this.data) 
          this.paginator.length = this.dataSource.data.length
          this.dataSource.paginator = this.paginator;

          this.isLoading = false
          this.notificationService.showNotification(res.message || 'Data Loaded', res.message ? 'error' : 'success');

        },
        error: (error: any) => {
          this.isLoading = true

          console.log(error);
          this.notificationService.showNotification(error.message || 'Loading failed','error');
          this.isLoading = false
        }
      }
      )
    }
  }
  toggleStatus(device): void {

    const data  = {
     
      'algoId': device._id,
      'enable': !device.enable
    }
    this.isLoading = true
    this.apiService.editAlgo(data).subscribe({

      next : res=>{
        this.notificationService.showNotification(res.message ||'Algo edited successfully','success') 
        this.loadData(this.selectedDay)
        this.isLoading = false
      },
      error: error=>{
        this.notificationService.showNotification(error.error || 'Error in algo editing','error')
        this.isLoading = false
      }
    }
    )
  //  
    // You can add logic here to handle the change in status (e.g., API call to update the status)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
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
    this.isLoading = true
    this.apiService.deleteAlgo(item._id).subscribe({
      next : res=>{
        this.isLoading = true
        console.log(res)
        this.loadData(this.selectedDay)
        this.isLoading = false
        this.notificationService.showNotification('Delete Success','success');
      },
      error : err=>{
        this.isLoading = true
        console.log(err)
        this.notificationService.showNotification(err.error || 'Delete Error','error');
        this.isLoading = false
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

  brokerChange(event,row){
    console.log(event.value)
  

    row['selectedBroker']= event.value
    console.log(row['_id'])

    let data = {
      'broker':event.value,
      'algoId': row['_id'],
      'name':row.name
    }

    this.isLoading = true
    this.apiService.editAlgo(data).subscribe({

      next : res=>{
        this.notificationService.showNotification(res.message ||'Algo edited successfully','success') 
        this.isLoading = false
      },
      error: err=>{
        this.notificationService.showNotification(err.message || 'Error in algo editing','error')
        this.isLoading = false
      }
    }
    )
  }

  positionInfo(item){
    this.apiService.getPosition(item._id).subscribe({
      next:res=>{
        console.log(res)
      },
      error:err=>{
        console.log(err)
      }
    })
  }
  selectedRow(row){
    console.log(row)
  }


  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
}
