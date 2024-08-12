import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import  {AuthInterceptor} from './core/interceptor/authorization.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideClientHydration(),
  provideHttpClient(withInterceptors([AuthInterceptor]))]
};
