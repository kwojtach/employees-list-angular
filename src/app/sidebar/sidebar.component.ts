import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() title;
  isOpen = false;
  private resolveSidebar;

  open() {
    this.isOpen = true;
    return new Promise((resolve, reject) => {
      this.resolveSidebar = resolve;
    });
  }

  close() {
    this.isOpen = false;
    this.resolveSidebar();
  }
}
