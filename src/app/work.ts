import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  url?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Hack Your Ride', category: 'WordPress website',
    description: 'A responsive WordPress website showcasing the Hack Your Ride brand across desktop and mobile.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2F6ab89787ea4e49a1b4c0baa32be6b147?format=webp&width=800&height=1200',
    imageAlt: 'Hack Your Ride WordPress website shown across desktop, tablet, and mobile', url: 'https://hackyourride.de/'
  },
  {
    title: 'Elevatech Digital', category: 'WordPress website',
    description: 'A digital marketing agency website for a trusted service provider in Rajkot, India.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2F11091c0267ad4d73bcf3fce5b02641b5?format=webp&width=800&height=1200',
    imageAlt: 'Elevatech Digital website shown on desktop, tablet, and mobile', url: 'https://elevatechdigital.com/'
  },
  {
    title: 'Industry', category: 'Angular website',
    description: 'An Angular-powered experience presenting industrial services with clarity across devices.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2Fbf4ba8c9966b4487beb6e8a7e66e60b1?format=webp&width=800&height=1200',
    imageAlt: 'Industrial website shown on desktop, tablet, and mobile', url: 'https://aromaeng.com/'
  },
  {
    title: 'Bakery & Cafe', category: 'WordPress website',
    description: 'A warm digital storefront showcasing the bakery and café, from signature treats to the in-store experience.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2F327e29de3e774c139227a3ba314f55f6?format=webp&width=800&height=1200',
    imageAlt: 'Bakery and café website shown on desktop, tablet, and mobile', url: 'https://tastebaguette.com/'
  },
  {
    title: 'Cake Shop', category: 'WordPress website',
    description: 'A welcoming storefront to explore cakes, discover favorites, and find a treat for every occasion.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2Ff91b96479be74308af278029580afa11?format=webp&width=800&height=1200',
    imageAlt: 'Cake shop website shown across devices'
  },
  {
    title: 'Agency', category: 'WordPress website',
    description: 'A clear, confident agency presence bringing services and brand personality together.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2F0e366454b369457393162231bde1e073?format=webp&width=800&height=1200',
    imageAlt: 'Agency website shown across devices'
  },
  {
    title: 'NGO', category: 'WordPress website',
    description: 'A purpose-led digital presence that makes the organization’s mission and work easier to discover.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2F037f4294c2944906b8581af9cc72940f?format=webp&width=800&height=1200',
    imageAlt: 'Nonprofit organization website shown across devices'
  },
  {
    title: 'Broker', category: 'WordPress website',
    description: 'A focused business website presenting services and key information in a clear, accessible way.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2Ffd24ee40c2624c61a48a19121c0e3c7e?format=webp&width=800&height=1200',
    imageAlt: 'Broker website shown across devices'
  },
  {
    title: 'Industry', category: 'Angular website',
    description: 'A modern Angular experience built to present industrial solutions across devices.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2Fcb38e65288d04c7098edbe2bc150e713?format=webp&width=800&height=1200',
    imageAlt: 'Industrial solutions website shown across devices'
  }
];

@Component({
  selector: 'app-project-grid',
  standalone: true,
  template: `
    <div class="portfolio-grid real-project-grid">
      @for (project of projects; track project.image; let i = $index) {
        <article class="portfolio-card real-project-card">
          <div class="real-project-visual">
            <span class="real-project-number">0{{ i + 1 }} /</span>
            <img [src]="project.image" [alt]="project.imageAlt" loading="lazy" />
            <span class="real-project-corner" aria-hidden="true">✳</span>
          </div>
          <div class="project-details real-project-details">
            <div><span>{{ project.category }}</span><h3>{{ project.title }}</h3><p>{{ project.description }}</p></div>
            @if (project.url) {
              <a class="project-external" [href]="project.url" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'Visit ' + project.title + ' website (opens in a new tab)'">↗</a>
            }
          </div>
          @if (project.url) {
            <a class="project-visit" [href]="project.url" target="_blank" rel="noopener noreferrer">Visit website <span aria-hidden="true">↗</span></a>
          } @else {
            <span class="project-unavailable">Website link not available</span>
          }
        </article>
      }
    </div>
  `
})
export class ProjectGrid {
  @Input({ required: true }) projects: Project[] = [];
}

@Component({
  selector: 'app-work-page',
  standalone: true,
  imports: [RouterLink, ProjectGrid],
  template: `
    <main>
      <section class="page-hero work-page-hero">
        <div class="container work-page-hero-inner">
          <div><p class="eyebrow"><span></span> OUR WORK</p><h1>Ideas brought to life<span>.</span></h1></div>
          <div><p>Thoughtful websites built for different businesses, audiences, and ambitions. Explore a selection of the work behind the screen.</p><span class="work-page-count">SELECTED PROJECTS / 01—09</span></div>
        </div>
      </section>
      <section class="section work-page-section">
        <div class="container">
          <div class="work-page-intro"><div><p class="eyebrow"><span></span> THE PORTFOLIO</p><h2 class="section-title">Made with purpose<span class="work-red-dot">.</span></h2></div><p class="section-copy">From digital storefronts to industrial experiences, each project starts with a different idea and a clear goal.</p></div>
          <app-project-grid [projects]="projects" />
        </div>
      </section>
      <section class="work-page-cta"><div class="container"><div class="work-page-cta-inner"><div><p class="eyebrow light-eyebrow"><span></span> YOUR IDEA, NEXT</p><h2>Have a project in mind?</h2><p>Let’s create something meaningful together.</p></div><a routerLink="/contact" class="button button-white">Start Your Project <span aria-hidden="true">↗</span></a></div></div></section>
    </main>
  `
})
export class WorkPage {
  readonly projects = PROJECTS;
}
