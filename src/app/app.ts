import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

interface PageMetadata {
  description?: string;
  keywords?: string;
  robots?: string;
  type?: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly logoUrl = 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2F58d024fa2e574a83aec480f7a181af2d?format=webp&width=800&height=1200';
  menuOpen = false;
  readonly year = new Date().getFullYear();
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(inject(DestroyRef)),
    ).subscribe(() => this.updatePageMetadata());
  }

  private updatePageMetadata(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) route = route.firstChild;

    const page = route.data as PageMetadata;
    const articleSlug = route.routeConfig?.path === 'blog/:slug' ? route.paramMap.get('slug') : null;
    const articleTitle = articleSlug?.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const title = articleTitle ? `${articleTitle} | WebCoder Journal` : route.title ?? 'WebCoder | Digital Solutions';
    const description = page['description'] ?? 'WebCoder creates custom websites, software, mobile applications, and digital solutions for growing businesses.';
    const keywords = page['keywords'] ?? 'web development, website design, custom software, mobile app development, CRM ERP, AI automation, digital marketing, WebCoder';
    const robots = page['robots'] ?? 'index, follow';
    const canonicalUrl = new URL(this.router.url.split(/[?#]/, 1)[0], this.document.baseURI).href;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: page['type'] ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:site_name', content: 'WebCoder' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }
}
