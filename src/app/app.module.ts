import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MacroUiBuilderComponent } from './macro-ui-builder/macro-ui-builder.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
    declarations: [
        AppComponent,
        MacroUiBuilderComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot(),
        GridsterModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
