import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService
{
    private citySubject = new BehaviorSubject<string | null>(null);
    city$ = this.citySubject.asObservable();

    private http = inject(HttpClient);

    constructor()
    {
        // Ottiene la città dall'endpoint serverless
        this.http.get<any>('/api/ip').subscribe({
            next: (data) => {
                const city = data?.city;
                if (city)
                {
                    this.citySubject.next(city);
                }
            },
            error: (err) => console.error('Errore nel recupero IP:', err)
        });
    }

    getCity(): string
    {
        return this.citySubject.value || localStorage.getItem('city') || '';
    }

    getForecast(): Observable<any>
    {
        const city = this.getCity();
        if (city)
        {
            return this.http.get<any>(`/api/forecast?city=${encodeURIComponent(city)}`);
        }
        else
        {
            console.warn('Città non disponibile');
            return of(null);
        }
    }
}