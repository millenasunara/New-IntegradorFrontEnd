import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Classe CSS para estilizar o componente MapContainer
import './Mapa.css'; 

function AjusteDeBounds({ pontos }) {
    const map = useMap();

    useEffect(() => {
        if (map && pontos.length > 0) {
            const bounds = L.latLngBounds(pontos.map(ponto => [ponto.latitude, ponto.longitude]));
            map.fitBounds(bounds);
        }
    }, [map, pontos]);

    return null;
}

export default function Mapa({ pontos }) {
    return (
        <MapContainer
            className="map-container" // Adicionando uma classe ao componente MapContainer
            center={[0, 0]}
            zoom={2}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {pontos.map((ponto, index) => (
                <Marker key={index} position={[ponto.latitude, ponto.longitude]}>
                    <Popup>
                        <strong>Tipo:</strong> {ponto.tipo}<br />
                        <strong>Localização:</strong> {ponto.localizacao}<br />
                        <strong>Latitude:</strong> {ponto.latitude}<br />
                        <strong>Longitude:</strong> {ponto.longitude}
                    </Popup>
                </Marker>
            ))}
            <AjusteDeBounds pontos={pontos} />
        </MapContainer>
    );
}
