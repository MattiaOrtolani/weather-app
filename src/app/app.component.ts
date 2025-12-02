import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekTemperatureComponent } from './week-temperature/week-temperature.component';
import { HeaderComponent } from './header/header.component';
import { HoursTemperatureComponent } from './hours-temperature/hours-temperature.component';
import { UvComponent } from './uv/uv.component';
import { HumidityComponent } from './humidity/humidity.component';
import { SunHoursComponent } from './sun-hours/sun-hours.component';
import { AppService } from './app.service';
import { WindComponent } from './wind/wind.component';
import { MoonHoursComponent } from './moon-hours/moon-hours.component';
import { LoadingItemComponent } from './loading-item/loading-item.component';
import { FeelsLikeTemperatureComponent } from './feels-like-temperature/feels-like-temperature.component';
import { VisibilityComponent } from './visibility/visibility.component';
import { PrecipitationComponent } from './precipitation/precipitation.component';
import { CloudCoverComponent } from './cloud-cover/cloud-cover.component';
import { AirQualityComponent } from './air-quality/air-quality.component';
import { PressureComponent } from './pressure/pressure.component';
import { SnowComponent } from './snow/snow.component';
import { MapsComponent } from './maps/maps.component';
import { LocationPermissionComponent } from './location-permission/location-permission.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        WeekTemperatureComponent,
        HeaderComponent,
        HoursTemperatureComponent,
        UvComponent,
        HumidityComponent,
        SunHoursComponent,
        WindComponent,
        MoonHoursComponent,
        LoadingItemComponent,
        FeelsLikeTemperatureComponent,
        VisibilityComponent,
        PrecipitationComponent,
        CloudCoverComponent,
        AirQualityComponent,
        PressureComponent,
        SnowComponent,
        MapsComponent,
        LocationPermissionComponent,
    ],
    styleUrl: './app.component.scss',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    title = 'Weather App';
    @ViewChild('background') background!: ElementRef<HTMLDivElement>;
    weatherData: any = null;
    resolve: 'resolved' | 'pending' | 'error' = 'pending';
    errorMessage = '';
    selectedDay = 0;
    hourSelected = 0;
    cords: { lat: number; lon: number } | null = null;

    private appService = inject(AppService);

    ngOnInit(): void {
        // Ottieni coordinate dal browser
        this.appService
            .getCurrentPosition()
            .then((coords) => {
                console.log('Coordinate utente:', coords);
                this.cords = coords;
                // Richiedi previsioni meteo
                this.appService.getForecast(coords.lat, coords.lon).subscribe({
                    next: (data) => {
                        this.weatherData = data;
                        this.resolve = 'resolved';
                        console.log('getForecast:', this.weatherData);
                    },
                    error: (err) => {
                        console.error(
                            'Errore nel recupero dei dati meteo:',
                            err
                        );
                        this.errorMessage =
                            'Impossibile ottenere i dati meteo.';
                    },
                });
            })
            .catch((err) => {
                console.error('Errore geolocalizzazione:', err);
                this.errorMessage =
                    'Geolocalizzazione disattivata o non disponibile.';
                this.resolve = 'error';
            });
    }

    onSelectDay(event: any) {
        this.selectedDay = event;
    }

    onSearch(cityName: string) {
        this.resolve = 'pending'
        this.appService.getForecastByCity(cityName).subscribe({
            next: (data) => {
                this.weatherData = data;
                this.resolve = 'resolved';
                console.log('getForecastByCity:', this.weatherData);
            },
            error: () => {
                this.resolve = 'resolved';
                this.errorMessage =
                    'Impossibile ottenere i dati meteo per la città cercata.';
            },
        });
    }

    onSelectedHour(event: any) {
        this.hourSelected = event;
    }

    currentHours(): number {
        return new Date().getHours();
    }

    OnprevPressure() {
        if (this.hourSelected > 0) {
            return this.weatherData?.forecast?.forecastday?.[this.selectedDay]
                ?.hour?.[this.hourSelected - 1]?.pressure_mb;
        }

        if (this.hourSelected == 0) {
            return this.weatherData?.forecast?.forecastday?.[
                this.selectedDay - 1
            ]?.hour?.[23]?.pressure_mb;
        }

        return this.weatherData?.current?.pressure_mb;
    }

    OnPrecipitationForecastDay() {
        for (let i = 0; i <= 3; i++) {
            if (
                this.weatherData?.forecast?.forecastday?.[this.selectedDay + i]
                    ?.day?.totalprecip_mm > 0
            ) {
                return {
                    date: this.weatherData?.forecast?.forecastday?.[
                        this.selectedDay + i
                    ]?.date,
                    precipitationForecast:
                        this.weatherData?.forecast?.forecastday?.[
                            this.selectedDay + i
                        ]?.day?.totalprecip_mm,
                };
            }
        }

        return undefined;
    }

    OnSnowForecastDay() {
        for (let i = 0; i <= 3; i++) {
            const dayForecast =
                this.weatherData?.forecast?.forecastday?.[this.selectedDay + i];

            const day = dayForecast?.day;

            if (
                day &&
                ((day as any).totalsnow_cm > 0 ||
                    (day as any).daily_chance_of_snow > 0)
            ) {
                return {
                    date: dayForecast?.date,
                    snowForecast: (day as any).totalsnow_cm,
                    chanceOfSnow: (day as any).daily_chance_of_snow,
                };
            }
        }
        return undefined;
    }
}
