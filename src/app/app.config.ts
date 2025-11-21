import { provideHttpClient } from '@angular/common/http';
import {
    ApplicationConfig,
    LOCALE_ID,
    provideZoneChangeDetection,
} from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection(),
        provideHttpClient(),
        { provide: LOCALE_ID, useValue: 'it' },
    ],
};
