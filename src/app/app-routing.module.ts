import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent   },
	{ path: 'listUser', component: ListUsersComponent   },
	{ path: 'userDatails/:id', component: UserDetailsComponent },
	{ path: '',  pathMatch: 'full',  redirectTo: 'login'  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
