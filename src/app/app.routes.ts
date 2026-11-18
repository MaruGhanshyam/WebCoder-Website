import { Routes } from '@angular/router';
import { HomePage } from './home';
import { AboutPage, ArticlePage, BlogPage, ContactPage, LegalPage, NotFoundPage, ServicesPage } from './pages';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'WebCoder | Digital Solutions for What’s Next' },
  { path: 'about', component: AboutPage, title: 'About Us | WebCoder' },
  { path: 'services', component: ServicesPage, title: 'Services | WebCoder' },
  { path: 'blog', component: BlogPage, title: 'Journal | WebCoder' },
  { path: 'blog/:slug', component: ArticlePage, title: 'Journal | WebCoder' },
  { path: 'contact', component: ContactPage, title: 'Contact Us | WebCoder' },
  { path: 'privacy', component: LegalPage, title: 'Privacy Notice | WebCoder' },
  { path: 'terms', component: LegalPage, title: 'Terms of Use | WebCoder' },
  { path: '**', component: NotFoundPage, title: 'Page Not Found | WebCoder' },
];
