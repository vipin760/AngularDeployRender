import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssociateComponent } from './components/associate/associate.component';
import { AddassociateComponent } from './components/addassociate/addassociate.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AssociateEffects } from 'src/store/Associate/Associate.Effects';
import { AssociateReducer } from 'src/store/Associate/Associate.Reducer';
import { AppEffects } from 'src/store/Common/App.effects';

@NgModule({
  declarations: [
    AppComponent,
    AssociateComponent,
    AddassociateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({associate:AssociateReducer}),
    EffectsModule.forRoot([AssociateEffects,AppEffects]),
//    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
