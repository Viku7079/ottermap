'use client'
import React, { useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Stroke, Fill } from 'ol/style';

const MapComponent: React.FC = () => {
    useEffect(() => {
        const vectorLayer = new VectorLayer({
            source: new VectorSource(),
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2,
                }),
            }),
        });

        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer,
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
        });

        const draw = new Draw({
            source: vectorLayer.getSource() || undefined, // Handle null case
            type: 'Polygon',
        });

        map.addInteraction(draw);

        return () => {
            map.dispose();
        };
    }, []);

    return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapComponent;
