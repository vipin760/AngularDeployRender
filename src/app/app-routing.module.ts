import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociateComponent } from './components/associate/associate.component';

const routes: Routes = [
  {path:'', component:AssociateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
