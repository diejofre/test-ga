// App.js
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-L0F1K10EBC"; // Reemplazalo con tu ID de GA4

function App() {
  const [gaAccepted, setGaAccepted] = useState(() =>
    localStorage.getItem("gaAccepted") === "true"
  );

  useEffect(() => {
    if (gaAccepted) {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      ReactGA.send("pageview");
    }
  }, [gaAccepted]);

  const handleAccept = () => {
    setGaAccepted(true);
    localStorage.setItem("gaAccepted", "true");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mi App con Google Analytics</h1>
      {!gaAccepted && (
        <button onClick={handleAccept}>
          Aceptar Google Analytics
        </button>
      )}
      {gaAccepted && <p>Gracias por aceptar el seguimiento.</p>}
    </div>
  );
}

export default App;
