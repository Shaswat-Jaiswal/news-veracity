//import { Game } from "./Example/Game";
//import { Pokemon } from "./Project/poke/Pokemon";
{/*import { useState } from "react";
import { Notes } from "./Project/Note/Notes";
import { Signin } from "./Project/Note/Ham/Sign/Signin";

export const App = () => {
  const [page, setPage] = useState("notes");
  return (
    <>
      {page === "notes" && (
        <section className="container">
          <Notes setPage={setPage} />
        </section>
      )}

      {page === "signin" && <Signin />} 
    </>
  );
}; */}

import React, { useState } from "react";

import { Font } from "./Project/Fake news/Font";
import { Signin } from "./Project/Fake news/Signs/Signin";

export const App = () => {
  const [page, setPage] = useState("font");
  return (
    <>
      {page === "font" && <Font setPage={setPage} />}

      {page === "signin" && <Signin />}
    </>
  );
}; 
