import { Component, inject, Renderer2} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);

  constructor(private renderer: Renderer2) {}

  switchTheme() {
    console.log("меняю тему")
    const htmlElement = this.renderer.selectRootElement('html', true);
    if (htmlElement.classList.contains('dark')) {
      this.renderer.removeClass(htmlElement, 'dark');
    } else {
      this.renderer.addClass(htmlElement, 'dark');
    }
  }
}
