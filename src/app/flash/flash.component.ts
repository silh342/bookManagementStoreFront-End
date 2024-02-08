import { Component } from '@angular/core';
import { flash } from './model/flash';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css'],
})
export class FlashComponent {
  flashDisplay: flash;
}
