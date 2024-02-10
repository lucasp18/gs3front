import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {DataService} from '../data.service';
import { ActivatedRoute } from '@angular/router';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement2 {
	  id: number;
	  username: string;
	  name :string;    
	}


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  dtBorn:string= '';
  name:string= '';
  id:string = '';
  username:string ='';
  password:string = '';
  perfis:any[] = [{"id":1, "name":"administrador"},{"id":2, "name":"comum"}];
  userAdmin:boolean = true;


  constructor(private dataService: DataService, private route: ActivatedRoute) { }


  ngOnInit(): void {
  	let id :string | null = this.route.snapshot.paramMap.get('id');
  	if(id != null){
  		this.dataService.getUserDetails(id).subscribe((d1: any) => {
  			
  			this.username = d1.username;
  			this.id = d1.id;
  			this.name = d1.name;
  			this.dtBorn = d1.dtBorn;
  			}
  		);
  		

  	}
  	
  }

  update() :void{
    console.log(this.dtBorn);
    this.dataService.updateUserDetails(this.id, {
     "dtBorn": this.dtBorn,
     "name": this.name,
     "password" : this.password,
     "username": this.username
      }).subscribe(d2 =>{
        console.log("foi");
      });
  }

}
