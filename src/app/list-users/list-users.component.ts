import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { Router } from '@angular/router';

import {DataService} from '../data.service';


export interface PeriodicElement {
  id: number;
  username: string;
  name: string;
}


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, AfterViewInit {

  
  constructor(private dataService:DataService, private router: Router) {
   
	}

   dataSource:any = new MatTableDataSource<PeriodicElement>();
   
   nextLink = '';
  ngOnInit(): void {
 	this.getUsers();
  }

  detailUser(row :any){
  	this.router.navigateByUrl(`/userDatails/${row.id}`);
  }

  getUsers(){
  	this.dataService.getUsers().subscribe(dat => { 
		  	//this.nextLink = dat.pop();
		  	this.dataSource = new MatTableDataSource<PeriodicElement>(dat)
		  	
		  	this.dataSource.paginator = this.paginator;
  			this.size = this.dataSource.data.length - 1;
        
		  	});
  }
  title = 'Usuários GS3';
  displayedColumns: string[] = ['id', 'username', 'name', 'action'];  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
	
  size:number = 0;  


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event:any ){
  
  	if(event.pageIndex > event.previousPageIndex && event.pageIndex == Math.floor(event.length/event.pageSize)  ){

	  	this.dataService.getUsers().subscribe(dataSource => { 
			  	this.nextLink = dataSource.pop();
			  	let d2: any = this.dataSource.data;
			  	let d3: any = d2.concat(dataSource);
			  	this.dataSource = new MatTableDataSource<PeriodicElement>(d3);
			  	this.dataSource.paginator = this.paginator;
	  			this.size = this.dataSource.data.length - 1;
			  	})
  	}
  }

}
