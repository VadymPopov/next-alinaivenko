import React from 'react';

interface EmbeddedMapProps {
  latitude: string;
  longitude: string;
  query: string;
}

export function EmbeddedMap({ latitude, longitude, query }: EmbeddedMapProps) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&center=${latitude},${longitude}&zoom=18&q=${query}`;

  return (
    <div style={{ width: '100%', height: '700px' }}>
      <iframe
        title="Embedded Map"
        width="100%"
        height="100%"
        src={mapUrl}
        allowFullScreen
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
