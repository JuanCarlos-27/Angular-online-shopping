import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private title = inject(Title);

  changeTitle(title: string) {
    const defaultTitle = this.title.getTitle().split('|').at(0);
    this.title.setTitle(`${defaultTitle} | ${title}`);
  }
  
}
