import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Associate } from 'src/store/Model/associate.model';
import { Store } from '@ngrx/store';
import { getassociatelist } from 'src/store/Associate/Associate.Selector';
import { deleteassociate, getassociate, loadassociate, openpopup } from 'src/store/Associate/Associate.Action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {
  associateList!:Associate[];
  datasource!:any;
  displayedColums: string[] = ['code', 'name', 'email', 'phone', 'address','type','group','status','action']

  @ViewChild(MatPaginator)
  paginator!:MatPaginator

  @ViewChild(MatSort)
  sort!:MatSort;

  constructor(
    private dialog:MatDialog,
    private store:Store
  ){}
  ngOnInit(): void {
    this.store.dispatch(loadassociate())
    this.store.select(getassociatelist).subscribe(item=>{
      this.associateList = item
      this.datasource= new MatTableDataSource<Associate>(this.associateList)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      console.log("this.associateList",this.associateList);
      
    })
  }

  functionAdd() {
    this.OpenPopup(0,'Create Associate')
  }
  ////////////////////////////////////////////////////////////////////////////////
  OpenPopup(code:number,title:string){
    this.store.dispatch(openpopup())
    this.dialog.open(AddassociateComponent,{
      width:'50%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        code:code,
        title:title
      }
    })
  }
////////////////////////////////////////////////////////////////////////////////
  FunctionEdit(code:number){
    this.OpenPopup(code,'Update Associate')
    this.store.dispatch(getassociate({id:code}))
  }

  ////////////////////////////////////////////////////////////////////////////////
  FunctionDelete(code:number){
    if(confirm('do you want to remove?')){
      this.store.dispatch(deleteassociate({code:code}))
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
}
