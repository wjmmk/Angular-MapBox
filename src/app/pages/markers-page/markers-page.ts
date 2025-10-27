import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';


mapboxgl.accessToken = environment.mapboxkey;

interface customMarker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  standalone: true,
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit {

  divElement = viewChild<ElementRef>('map')
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<customMarker[]>([]); // Se creea esta señal para trabajar los marcadores de manera mas Personalizada.

  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;
    await new Promise((resolve) => setTimeout(resolve, 80)); // Esta linea se usa para establecer un retardo que permita que el mapa se construya en la Vista.
    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-122.40985, 37.793085], // starting position [lng, lat]
      zoom: 12, // starting zoom
    });

    /* const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([-122.40985, 37.793085])
      .addTo(map)

    marker.on('dragend', (event) => {
      console.log(event);
    }) */

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {
    if(!this.map()) return;

    const map = this.map()!;
    const coords = event.lngLat;
    const customColor = '#xxxxxx'.replace(/x/g, (y) => ((Math.random() * 16) | 0).toString(16));

    const mapBoxMarker = new mapboxgl.Marker({ color: customColor }).setLngLat(coords).addTo(map);

    const newMarker: customMarker = {
      id: uuid(),
      mapboxMarker: mapBoxMarker
    }

    this.markers.set([newMarker, ...this.markers()]);
    // this.markers.update((markers) => [newMarker, ...this.markers()]);
  }

  flyToMarker(lngLat: LngLatLike) {
    if(!this.map()) return;
    this.map()?.flyTo({ center: lngLat });
  }

  deleteMarker(marker: customMarker) {
    if(!this.map()) return;
    const map = this.map()!;

    marker.mapboxMarker.remove();
    //this.markers.set(this.markers().filter((m) => m.id !== marker.id));
    this.markers.update(markers => markers.filter(m => m.id !== marker.id));
  }
}
