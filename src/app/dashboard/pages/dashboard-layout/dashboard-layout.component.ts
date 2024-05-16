import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

import { MenuItem, menu_items } from '../../../../mock/menu-items';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DashboardLayoutComponent implements AfterViewInit{

  manu_items: MenuItem[] = menu_items;

  ngAfterViewInit(): void {
    this.addClicked();
  }

  addClicked() {
    let list = document.querySelectorAll("main nav div");
    function activeLink(this: any) {
      list.forEach((item) => {
        item.classList.remove("clicked");
      });
      this.classList.add("clicked");
    }
    list.forEach((item) => {
      item.addEventListener("click", activeLink);
    });
  }

  toggleAccordion(event: MouseEvent): void {
    const item = (event.target as HTMLElement).closest('.accordion-item') as HTMLElement;
    const content = item.querySelector('.accordion-content') as HTMLElement;
    const icon = item.querySelector('.accordion-icon') as HTMLElement;

    const isVisible = content.clientHeight !== 0;

    content.style.maxHeight = isVisible ? '' : `${content.scrollHeight}px`;

    icon.textContent = isVisible ? '▼' : '▲';
  }

}
