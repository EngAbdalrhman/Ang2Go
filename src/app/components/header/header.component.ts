import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    ToastModule,
    BadgeModule,
    InputTextModule,
    AvatarModule,
    CommonModule,
    RippleModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: 'home',
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
        routerLink: 'features',
      },
      {
        label: 'About',
        icon: 'pi pi-eye',
        routerLink: 'about',
      },
      {
        label: 'Tools',
        icon: 'pi pi-pencil',
        items: [
          {
            label: 'Calculator',
            icon: 'pi pi-calculator',
            routerLink: 'calc',
          },
          {
            label: 'Advanced',
            icon: 'pi pi-book',
            routerLink: 'adv',
          },
        ],
      },
    ];
  }
}
