import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AssociateService } from "src/app/service/associate.service";
import { addassociate, addassociatesuccess, deleteassociate, deleteassociatesuccess, getassociate, getassociatesuccess, loadassociate, loadassociatefail, loadassociatesuccess, updateassociate, updateassociatesuccess } from "./Associate.Action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { showalert } from "../Common/App.Action";


@Injectable()
export class AssociateEffects {
    constructor(
        private actin$: Actions,
        private service: AssociateService
    ) { }
    _loadassociate = createEffect(() =>
        this.actin$.pipe(
            ofType(loadassociate),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        return loadassociatesuccess({ list: data })
                        
                    }),
                    catchError((_error) => of(loadassociatefail({ errormessage: _error.message }))) 
                )
            })
        )
    )

   ////////////////////////////////////////////////////////////////////////////////////////////////
   _addassociate = createEffect(() =>
   this.actin$.pipe(
       ofType(addassociate),
       switchMap((action) => {
           return this.service.Create(action.inputdata).pipe(
            switchMap((data) => { 
                   return of(addassociatesuccess({ inputdata: action.inputdata }), 
                   showalert({message:'success to create associate',resultType:'pass'}))
                   
               }),
               catchError((_error) => of(showalert({message:'failed to create associate',resultType:'fail'}))) 
           )
       })
   )
) 
 ////////////////////////////////////////////////////////////////////////////////////////////////
 _getassociate = createEffect(() =>
 this.actin$.pipe(
     ofType(getassociate),
     exhaustMap((action) => {
         return this.service.GetbyCode(action.id).pipe(
          map((data) => { 
                 return getassociatesuccess({ obj:data })
                 
             }),
             catchError((_error) => of(showalert({message:'failed to fetch data:'+_error.message,resultType:'fail'}))) 
         )
     })
 )
) 
 ////////////////////////////////////////////////////////////////////////////////////////////////
   _updateassociate = createEffect(() =>
   this.actin$.pipe(
       ofType(updateassociate),
       switchMap((action) => {
           return this.service.Update(action.inputdata).pipe(
            switchMap((data) => { 
                   return of(updateassociatesuccess({ inputdata: action.inputdata }), 
                   showalert({message:'success to update associate',resultType:'pass'}))
                   
               }),
               catchError((_error) => of(showalert({message:'failed to update associate',resultType:'fail'}))) 
           )
       })
   )
) 
  ////////////////////////////////////////////////////////////////////////////////////////////////
  _deleteassociate = createEffect(() =>
  this.actin$.pipe(
      ofType(deleteassociate),
      switchMap((action) => {
          return this.service.Delete(action.code).pipe(
           switchMap((data) => { 
                  return of(deleteassociatesuccess({ code: action.code }), 
                  showalert({message:'success to delete associate',resultType:'pass'}))
                  
              }),
              catchError((_error) => of(showalert({message:'failed to delete associate',resultType:'fail'}))) 
          )
      })
  )
) 
////////////////////////////////////////////////////////////////////////////////////////////////
}