import { provideHttpClient } from '@angular/common/http';
import {
    ApplicationConfig,
    LOCALE_ID,
    importProvidersFrom,
    inject,
    provideAppInitializer,
    provideZoneChangeDetection,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { I18nService } from './i18n.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection(),
        provideHttpClient(),
        importProvidersFrom(TranslateModule.forRoot()),
        provideTranslateHttpLoader({
            prefix: '/i18n/',
            suffix: '.json',
            enforceLoading: false,
            useHttpBackend: false,
        }),
        { provide: LOCALE_ID, useValue: 'it' },
        provideAppInitializer(() => {
            const i18nService = inject(I18nService);
            i18nService.initLanguage();
        }),
    ],
};
