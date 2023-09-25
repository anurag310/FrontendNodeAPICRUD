import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetComponent } from './get/get.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/get',
    pathMatch:'full'
  },{
  path:'get',
  component:GetComponent
},
{
  path:'post',
  component:PostComponent
},
{ path: 'post/:id', component: PostComponent },

  // Wildcard route for redirection
  {
    path: '**',
    redirectTo: '/get'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
