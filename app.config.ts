import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi, withNoXsrfProtection, withXsrfConfiguration } from '@angular/common/http';
import { CustomInterceptor } from './core/httpInterceptor';
import { JwtInterceptor } from './core/JwtInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(), provideAnimations(),
  provideRouter(routes),
  provideClientHydration(),
  //provideHttpClient(withFetch()),
  provideHttpClient(withInterceptorsFromDi()),
  // provideHttpClient(withXsrfConfiguration({
  //     cookieName: 'XSRF-TOKEN',
  //     headerName: 'X-XSRF-TOKEN'
  //   })),
  provideHttpClient(withNoXsrfProtection()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
  ]
};