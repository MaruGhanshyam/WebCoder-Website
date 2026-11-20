import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { WebCoderTitleStrategy } from './webcoder-title.strategy';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })),
    { provide: TitleStrategy, useClass: WebCoderTitleStrategy }
  ]
};
