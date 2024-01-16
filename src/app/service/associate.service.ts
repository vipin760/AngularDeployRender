import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associate } from 'src/store/Model/associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  baseUrl="http://localhost:3000/associate"
 // http://localhost:3000/associate

  constructor(
    private http:HttpClient
  ) { }

  GetAll(){
    return this.http.get<Associate[]>(this.baseUrl)
  }
  GetbyCode(code:number){
    return this.http.get<Associate>(this.baseUrl+'/'+code);
  }
  Delete(code:number){
    return this.http.delete(this.baseUrl+'/'+code);
  }
  Update(data:Associate){
    return this.http.put(this.baseUrl+'/'+data.id,data);
  }
  Create(data:Associate){
    return this.http.post(this.baseUrl,data)
  }
}
