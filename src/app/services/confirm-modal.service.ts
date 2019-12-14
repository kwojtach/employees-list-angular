import { Component, Injectable, Directive, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

interface ConfirmOptions {
  title: string;
  message: string;
}

export class ConfirmState {
  options: ConfirmOptions;
  modal: NgbModalRef;
  template: TemplateRef<any>;
}

@Injectable()
export class ConfirmService {

  constructor(private modalService: NgbModal, private state: ConfirmState) {}

  confirm(options: ConfirmOptions): Promise<any> {
    this.state.options = options;
    this.state.modal = this.modalService.open(this.state.template);
    return this.state.modal.result;
  }
}

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{options.title}}</h4>
      <button type="button" class="close" (click)="no()">
        <span>&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{options.message}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-sm btn-secondary" (click)="no()">nie</button>
      <button type="button" class="btn btn-sm btn-success" (click)="yes()">tak</button>
    </div>
  `
})
export class ConfirmModalComponent {

  options: ConfirmOptions;

  constructor(private state: ConfirmState) {
    this.options = state.options;
  }

  yes() {
    this.state.modal.close('confirmed');
  }

  no() {
    this.state.modal.dismiss('not confirmed');
  }
}

@Directive({
  selector: '[appConfirm]'
})
export class ConfirmTemplateDirective {
  constructor(confirmTemplate: TemplateRef<any>, state: ConfirmState) {
    state.template = confirmTemplate;
  }
}
