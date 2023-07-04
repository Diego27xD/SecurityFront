import React from "react";

function Unauthorized() {
  return (
    <div>
      <h2 className="texto">Error al autenticarse</h2>
      <p className="alert">You are not authorized to access this page.</p>
    </div>
  );
}

export default Unauthorized;
