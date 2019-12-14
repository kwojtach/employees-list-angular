import {Component} from '@angular/core';
import {ToastsService} from '../services/toasts.service';

@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      [ngClass]="{'bg-success': toast.type, 'bg-danger': !toast.type}"
      *ngFor="let toast of toastsService.toasts"
      [autohide]="toast.autohide"
      [delay]="5000"
      (hide)="toastsService.remove(toast)"
    >
      <div class="d-flex justify-content-between align-items-center">
        <div class="toast-text text-light">{{toast.text}}</div>
        <button class="btn btm-sm" [ngClass]="{'btn-success': toast.type, 'btn-danger': !toast.type}" (click)="this.toastsService.remove(toast)">X</button>
      </div>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsComponent {
  constructor(public toastsService: ToastsService) {}
}
