import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addassociate, loadassociate, updateassociate } from 'src/store/Associate/Associate.Action';
import { getassociate, getassociatelist } from 'src/store/Associate/Associate.Selector';
import { Associate } from 'src/store/Model/associate.model';

@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.css']
})
export class AddassociateComponent implements OnInit {
  title: string = "associate adding"
  isEdit: boolean = false;
  dialogData: any;
  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store:Store
  ) { }

  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.store.select(getassociate).subscribe(res=>{
      this.AssociateForm.setValue({
        id:res.id, name:res.name, email:res.email, phone:res.phone, address:res.address,associategroup:res.associategroup,type:res.type,status:res.status
      })
    })
  }
  closePopup() {
    this.ref.close()
  }
  AssociateForm = this.fb.group({
    id: this.fb.control(0),
    name: this.fb.control('', Validators.required),
    email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.fb.control('', Validators.required),
    address: this.fb.control('', Validators.required),
    type: this.fb.control('CUSTOMER'),
    associategroup: this.fb.control('level1'),
    status: this.fb.control(true)
  })

  submit() {
    if(this.AssociateForm.valid){
      const _obj:Associate={
        id:this.AssociateForm.value.id as number,
        name:this.AssociateForm.value.name as string,
        email:this.AssociateForm.value.email as string,
        phone :this.AssociateForm.value.phone as string,
        associategroup:this.AssociateForm.value.associategroup as string,
        address:this.AssociateForm.value.address as string,
        type:this.AssociateForm.value.type as string,
        status:this.AssociateForm.value.status as boolean
      }
      if(_obj.id===0){
        this.store.dispatch(addassociate({inputdata:_obj}))
      }else{
        this.store.dispatch(updateassociate({inputdata:_obj}))
      }
      
      this.closePopup()

    }

  }
}
