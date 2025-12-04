import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
    private http = inject(HttpClient);

    constructor() {}

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
            return this.http.get<any>(`/api/forecast?lat=${lat}&lon=${lon}`);
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
            return this.http.get<any>(`/api/forecast`, {
                params: { q },
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
