"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Loader } from "lucide-react";

// Fonction pour obtenir les icônes personnalisées
const getIcon = (iconUrl: string) =>
  L.icon({
    iconUrl,
    iconSize: [30, 30], // Taille de l'icône
    iconAnchor: [15, 30], // Point d'ancrage
    popupAnchor: [0, -25], // Décalage du popup
  });

const MapWithNearbyPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const GEOAPIFY_API_KEY = "6d10a7b55de9457c9f42461c62c69dd6"; // Remplacez par votre clé Geoapify
  const DEFAULT_LOCATION = { lat: 14.6928, lng: -17.4467 }; // Position par défaut : Dakar

  useEffect(() => {
    // Obtenir la localisation de l'utilisateur
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Erreur de géolocalisation :", error);
            setLocation(DEFAULT_LOCATION); // Utilisez la position par défaut en cas d'erreur
          }
        );
      } else {
        console.warn("La géolocalisation n'est pas prise en charge.");
        setLocation(DEFAULT_LOCATION); // Position par défaut si la géolocalisation est indisponible
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (location) {
      // Obtenir les pharmacies et hôpitaux à proximité
      const fetchNearbyPlaces = async () => {
        try {
          const response = await fetch(
            `https://api.geoapify.com/v2/places?categories=health.pharmacy,health.hospital&filter=circle:${location.lng},${location.lat},5000&limit=20&apiKey=${GEOAPIFY_API_KEY}`
          );
          const data = await response.json();
          setPlaces(data.features || []);
        } catch (error) {
          console.error("Erreur lors de la récupération des lieux :", error);
        }
      };

      fetchNearbyPlaces();
    }
  }, [location]);

  // Rendu de la carte avec les lieux
  return location ? (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={13} // Zoom initial
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marqueur pour chaque lieu trouvé */}
      {places.map((place: any) => (
        <Marker
          key={place.properties.place_id}
          position={[
            place.geometry.coordinates[1],
            place.geometry.coordinates[0],
          ]}
          icon={getIcon(
            place.properties.categories.includes("pharmacy")
              ? "/pharmacy-icon.png" // Icône pour pharmacie
              : "/hospital-icon.png" // Icône pour hôpital
          )}
        >
          <Popup>
            <strong>{place.properties.name || "Lieu inconnu"}</strong>
            <br />
            Catégorie : {place.properties.categories.join(", ")}
            <br />
            Adresse : {place.properties.address_line1 || "Non spécifié"}
          </Popup>
        </Marker>
      ))}

      {/* Marqueur de la localisation actuelle */}
      <Marker
        position={[location.lat, location.lng]}
        icon={getIcon("/current-location-icon.png")} // Icône pour la localisation actuelle
      >
        <Popup>Vous êtes ici</Popup>
      </Marker>
    </MapContainer>
  ) : (
    <div className="flex items-center justify-center inset-0 bg-black/15">
      <Loader className="text-white z-20 animate-spin" />
    </div>
  );
};

export default MapWithNearbyPlaces;
