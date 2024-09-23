import { Component } from '@angular/core';
import { WelcomeComponent } from '../../core/components/welcome/welcome.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomeComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
