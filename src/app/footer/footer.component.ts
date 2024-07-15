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
      footer {
        bottom: 0;
        color: #ced4da;
      }
    `,
    ],
    standalone: true,
})
export class FooterComponent {}
