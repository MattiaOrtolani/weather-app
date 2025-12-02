import { Component, ElementRef, input, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
    selector: 'app-maps',
    standalone: true,
    imports: [],
    templateUrl: './maps.component.html',
    styleUrl: './maps.component.scss',
})
export class MapsComponent {
    @ViewChild('map') map!: ElementRef<HTMLDivElement>;
    readonly cords = input.required<{ lat: number; lon: number } | null>();
    readonly selectedHour = input.required<number>();
    readonly selectedDay = input.required<string>();
    mapType: 'tmp2m' | 'precip' | 'mslp' | 'wind' = 'tmp2m';
    leafletMap!: L.Map;
    private weatherLayer?: L.TileLayer;

    ngAfterViewInit(): void {
        this.initMap();
        this.updateWeatherLayer();
    }

    ngOnChanges(): void {
        if (this.leafletMap) {
            this.updateWeatherLayer();
        }
    }

    private initMap() {
        const coords = this.cords();
        if (!coords) {
            return;
        }

        this.leafletMap = L.map(this.map.nativeElement, {
            zoomControl: false,
        }).setView([coords.lat, coords.lon], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            minZoom: 3,
            maxZoom: 6,
        }).addTo(this.leafletMap);
    }

    private updateWeatherLayer() {
        if (!this.leafletMap) {
            return;
        }

        const coords = this.cords();
        if (!coords) {
            return;
        }

        if (this.weatherLayer) {
            this.leafletMap.removeLayer(this.weatherLayer);
        }

        const datePart = this.toYYYYMMDD(this.selectedDay());
        const hourPart = this.toHH(this.selectedHour());

        const url = `https://weathermaps.weatherapi.com/${this.mapType}/tiles/${datePart}${hourPart}/{z}/{x}/{y}.png`;

        this.weatherLayer = L.tileLayer(url, {
            minZoom: 3,
            maxZoom: 6,
            opacity: 0.6,
        }).addTo(this.leafletMap);
    }

    zoomOut() {
        this.leafletMap.zoomOut();
    }

    zoomIn() {
        this.leafletMap.zoomIn();
    }

    toYYYYMMDD(date: string): string {
        return date.replace(/-/g, '');
    }

    toHH(hour: number): string {
        return String(hour).padStart(2, '0');
    }

    setMapType(type: 'tmp2m' | 'precip' | 'mslp' | 'wind'): void {
        this.mapType = type;
        this.updateWeatherLayer();
    }

}
