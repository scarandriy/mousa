'use client';

import React from "react";

type MapProps = {
  height?: string; // Tailwind height classes, e.g. "h-64 md:h-72"
};

const Map: React.FC<MapProps> = ({ height = "h-64 md:h-72" }) => {
  return (
    <div className={`relative w-full ${height} rounded-xl overflow-hidden ring-1 ring-border shadow-elev`}>
      <iframe
        src="https://www.google.com/maps?q=41.651018,41.636155&z=17&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mousa Cars Location - Europe Square, Batumi, Georgia"
      />
    </div>
  );
};

export default Map;
