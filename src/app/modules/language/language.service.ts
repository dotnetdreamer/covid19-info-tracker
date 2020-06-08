import { Injectable } from '@angular/core';
import { ILanguage } from './language.model';


@Injectable({
    providedIn: "root"
})
export class LanguageService {
    constructor() {

    }

    getAvailableLanguages() {
        const langs: ILanguage[] = [
            { name: "English", code: "en", isRtl: false },
            { name: "اردو", code: "ur", isRtl: true },
            { name: "پشتو", code: "ps", isRtl: true },
            { name: "فارسی", code: "fa", isRtl: true },
            { name: "العربية", code: "ar", isRtl: true },
        ];

        return langs;
    }

    getLanguageByCode(code) {
        return this.getAvailableLanguages().filter(l => l.code == code)[0];
    }
}