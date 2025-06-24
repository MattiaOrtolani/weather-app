import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_KEY, API_URL } from '../environment/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AppService
{
    private citySubject = new BehaviorSubject<string | null>(null);
    city$ = this.citySubject.asObservable();

    http = inject(HttpClient);

    constructor()
    {
        this.http.get<any>(API_URL + 'ip.json?key=' + API_KEY + '&q=auto:ip').subscribe({
            next: (data) => {
                const city = data.city
                this.citySubject.next(city);
            }
        })
    }

    getCity()
    {
        localStorage.getItem('city') || '';
    }

    getForecast(): Observable<any>
    {
        if(this.city$)
        {
            const city = this.citySubject.value;
            return this.http.get<any>(API_URL + 'forecast.json?key=' + API_KEY + '&q=' + city + '&days=7&lang=it');
        }
        else
        {
            console.log('città non disponibile');
            return of(null);
        }
    }
}