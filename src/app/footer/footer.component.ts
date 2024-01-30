import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-dark footer py-3 mt-auto text-center">
      <div class="container">
        <span> &copy; Book Store 2024 All rights deserved</span>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 2.5rem;
        color: #ced4da;
      }
    `,
  ],
})
export class FooterComponent {}
