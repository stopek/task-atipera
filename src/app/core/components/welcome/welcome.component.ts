import { Component } from '@angular/core';
import {
  MatAnchor,
  MatFabAnchor,
  MatFabButton,
  MatIconButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { MatListSubheaderCssMatStyler } from '@angular/material/list';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  imports: [
    MatIconButton,
    MatIcon,
    MatFabButton,
    RouterLink,
    MatFabAnchor,
    MatDivider,
    MatAnchor,
    MatListSubheaderCssMatStyler,
  ],
})
export class WelcomeComponent {}
