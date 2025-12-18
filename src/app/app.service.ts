import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
    private http = inject(HttpClient);

    constructor() {}

    /**
     * Rileva la lingua del browser:
     * - italiano se il browser è impostato in italiano
     * - inglese per qualsiasi altra lingua
     */
    private getBrowserLang(): 'it' | 'en' {
        const browserLang = navigator.language || (navigator as any).userLanguage;
        return browserLang?.toLowerCase().startsWith('it') ? 'it' : 'en';
    }

    /**
     * Lingua corrente usata dall'app
     */
    getCurrentLang(): 'it' | 'en' {
        return this.getBrowserLang();
    }

    /**
     * Ottiene la posizione dell'utente dal browser
     */
    getCurrentPosition(): Promise<{ lat: number; lon: number }> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                        });
                    },
                    (error) => {
                        reject('Geolocalizzazione negata o non disponibile');
                    }
                );
            } else {
                reject('Geolocalizzazione non supportata dal browser');
            }
        });
    }

    /**
     * Chiama l'API interna passando latitudine e longitudine
     */
    getForecast(lat: number, lon: number): Observable<any> {
        if (lat && lon) {
            const lang = this.getBrowserLang();
            return this.http.get<any>(`/api/forecast`, {
                params: { lat, lon, lang },
            });
        } else {
            console.warn('Coordinate non disponibili');
            return of(null);
        }
    }

    /**
     * Chiama l'API interna passando il nome della città (usa parametro 'q')
     */
    getForecastByCity(city: string): Observable<any> {
        const q = city?.trim();
        if (q) {
            const lang = this.getBrowserLang();
            return this.http.get<any>(`/api/forecast`, {
                params: { q, lang },
            });
        } else {
            console.warn('Nome della città non disponibile');
            return of(null);
        }
    }

    getSuggestions(query: string): Observable<string[]> {
        if (query) {
            return this.http.get<string[]>(`/api/searchSuggestion`, {
                params: { q: query },
            });
        } else {
            return of([]);
        }
    }
}
