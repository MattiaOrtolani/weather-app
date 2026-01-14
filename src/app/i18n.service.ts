import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class I18nService {
    private readonly defaultLang = 'en';

    constructor(private translate: TranslateService) {}

    /**
     * Inizializza la lingua in base al browser
     * - se browser = italiano → it
     * - altrimenti → en
     */
    initLanguage(): void {
        const browserLang = this.translate.getBrowserLang()?.toLowerCase();
        const lang = browserLang?.startsWith('it') ? 'it' : this.defaultLang;

        this.translate.addLangs(['en', 'it']);
        this.translate.setFallbackLang(this.defaultLang);
        this.translate.use(lang);
    }
}
