import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { MobileMenuComponent } from './components/layout/mobile-menu/mobile-menu.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
            RouterOutlet, 
            RouterModule, 
            MobileMenuComponent, 
            HeaderComponent, 
            SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  showSidebar: boolean = true;
  authService = inject(AuthService);
  router = inject(Router);
  currentUrl: string;
  

  // constructor(private renderer: Renderer2) {
  //   // Подписываемся на события маршрутизации, чтобы проверять текущий маршрут
  //   this.router.events.subscribe(event => {
  //     //console.log("евент", event)
  //     if (event instanceof NavigationEnd) {
  //       this.showSidebar = event.url !== '/login';
  //     }
  //   });
  // }

  


  ngOnInit(): void {
    console.log(this.router.url)

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url; // Обновляем currentUrl только после завершения навигации
        console.log(event.url)
      }
    });
    this.authService.user$.subscribe(user=>{
      if(user) {
        this.authService.currentUserSig.set({
          id: user.uid,
          email: user.email!,
          username: user.displayName!
        })
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    })
  }
  title = 'shopping-list';

}
