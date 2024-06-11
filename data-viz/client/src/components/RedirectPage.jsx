import React from "react";

function RedirectPage() {
  const redirectToConeVis = () => {
    window.location.href = "/ConeVis.html";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-amber-400">
      <div className="flex-col text-center">
        <h1 className="mb-4 text-5xl font-serif">Our Visualisations</h1>
        <div className="p-2">
          <button onClick={redirectToConeVis} className="mr-4">
            CROVHD
          </button>
          <a href="/beads.html" className="mr-4">Beads</a>
          <a href="/heidi.html" className="mr-4">Heidi</a>
        </div>
      </div>
    </div>
  );
}

export default RedirectPage;
