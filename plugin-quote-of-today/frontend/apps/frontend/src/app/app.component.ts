import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  quote = 'The best things in life are free';
  date = new Date();
  author = 'Unknown';
  num = 20;
}
