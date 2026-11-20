import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class WebCoderTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) this.title.setTitle(title);
  }

  override buildTitle(snapshot: RouterStateSnapshot): string {
    let route = snapshot.root;
    while (route.firstChild) route = route.firstChild;

    if (route.routeConfig?.path === 'blog/:slug') {
      const slug = route.paramMap.get('slug');
      if (slug) {
        const articleTitle = slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return `${articleTitle} | WebCoder Journal`;
      }
    }

    return super.buildTitle(snapshot) ?? 'WebCoder | Digital Solutions';
  }
}
