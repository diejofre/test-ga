// App.js
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-L0F1K10EBC"; // Reemplazalo con tu ID de GA4

function App() {
  const [gaConsent, setGaConsent] = useState(() => {
    const stored = localStorage.getItem("gaConsent");
    return stored === "true" ? true : stored === "false" ? false : null;
  });

  // useEffect(() => {
  //   if (gaConsent === true) {
  //     ReactGA.initialize(GA_MEASUREMENT_ID);
  //     ReactGA.send("pageview");
  //   }
  // }, [gaConsent]);

  useEffect(() => {
    if (gaConsent === true) {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      ReactGA.send("pageview");

      // Evento de scroll
      const handleScroll = () => {
        ReactGA.event({
          category: "Interacción",
          action: "Scroll",
          label: "Usuario hizo scroll por primera vez"
        });

        // Quitamos el listener para que solo lo registre una vez
        window.removeEventListener("scroll", handleScroll);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [gaConsent]);

  const handleAccept = () => {
    setGaConsent(true);
    localStorage.setItem("gaConsent", "true");
  };

  const handleDeny = () => {
    setGaConsent(false);
    localStorage.setItem("gaConsent", "false");
  };

  // return (
  //   <div style={{ padding: "2rem" }}>
  //     <h1>Mi App con Google Analytics</h1>

  //     {gaConsent === null && (
  //       <>
  //         <p>¿Querés permitir el uso de Google Analytics?</p>
  //         <button onClick={handleAccept}>Aceptar</button>{" "}
  //         <button onClick={handleDeny}>Denegar</button>
  //       </>
  //     )}

  //     {gaConsent === true && <p>Gracias por aceptar el seguimiento.</p>}
  //     {gaConsent === false && <p>No se activará el seguimiento.</p>}
  //   </div>
  // );
  return (
    <div style={{ padding: "2rem", height: "200vh" }}>
      <h1>Mi App con Scroll Tracking</h1>

      {gaConsent === null && (
        <>
          <p>¿Querés permitir el uso de Google Analytics?</p>
          <button onClick={handleAccept}>Aceptar</button>{" "}
          <button onClick={handleDeny}>Denegar</button>
        </>
      )}

      {gaConsent === true && <p>Gracias por aceptar el seguimiento.</p>}
      {gaConsent === false && <p>No se activará el seguimiento.</p>}
    </div>
  );
}

export default App;
