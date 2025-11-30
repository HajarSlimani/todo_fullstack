import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {
  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
  }
}