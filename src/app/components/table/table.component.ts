import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service'

export interface PeriodicElement {
  id: number;
  name: string;
  email: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', email:1.0079, symbol: 'H'},
 
];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit{
  data =[];


constructor(private apiService : ApiServiceService){}

ngOnInit(){
  this.apiService.getData().subscribe(
    (res:any)=>{
      this.dataSource = res.data
      console.log(res)
    },
    (error : any)=>{
      console.log(error);
      
    }
  )
}
displayedColumns: string[] = ['id', 'name','email'];
dataSource =this.data;


}
