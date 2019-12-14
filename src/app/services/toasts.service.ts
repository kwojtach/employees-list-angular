export class ToastsService {
  toasts: any[] = [];

  show(type: boolean, text: string, autohide: boolean) {
    this.toasts.push({type, text, autohide});
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
