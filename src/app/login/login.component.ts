import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	 username :string;
	 senha :string;
	 errorLogin :boolean = false;

  constructor(private dataService:DataService, private router: Router) {
	  this.username = '';
	  this.senha = ''; 
  }

  ngOnInit(): void {
  }

  login(){

  	console.log(this.username);
  	console.log(this.senha);
  	this.dataService.login(this.username, this.senha).subscribe(data => { 
		  	console.log(data);
		  		if(data.auth == true){
		  			if(data.idRule == 1){
		  				this.router.navigateByUrl('/listUser');
		  			}else{
		  				this.router.navigateByUrl(`/userDatails/${data.idUser}`);
		  			}
		  		}
		  	},
 			err => { 
 				
 				if(err.status == 404){
 					this.errorLogin = true;
 				}else{
 					console.log(err);
 				}
 				
 			}

		  	);
    

  }

}
