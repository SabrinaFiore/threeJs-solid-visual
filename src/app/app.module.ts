import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MindblowingComponent } from './mindblowing/mindblowing.component';
import { SolidsComponent } from './solids/solids.component';
import { SphereComponent } from './solids/sphere/sphere.component';

@NgModule({
  declarations: [
    AppComponent,
    MindblowingComponent,
    SolidsComponent,
    SphereComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
