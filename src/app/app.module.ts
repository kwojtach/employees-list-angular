import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeesService } from './services/employees.service';
import { ToastsService } from './services/toasts.service';
import { ToastsComponent } from './toasts/toasts.component';
import { ConfirmModalComponent, ConfirmService, ConfirmState, ConfirmTemplateDirective } from './services/confirm-modal.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ToastsComponent,
    ConfirmModalComponent,
    ConfirmTemplateDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    EmployeesService,
    ToastsService,
    ConfirmService,
    ConfirmState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
