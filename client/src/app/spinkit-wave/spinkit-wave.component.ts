import {Component} from '@angular/core';

@Component({
  selector: 'app-spinkit-wave',
  template: `
    <div class="sk-wave">
      <div class="sk-rect sk-rect1"></div>
      <div class="sk-rect sk-rect2"></div>
      <div class="sk-rect sk-rect3"></div>
      <div class="sk-rect sk-rect4"></div>
      <div class="sk-rect sk-rect5"></div>
    </div>`,
  styles: [`
    div.sk-wave {
      margin: 0;
    }
  `]
})
export class SpinkitWaveComponent {
}
