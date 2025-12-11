import React, { useState } from "react";
import Form from "./components/Form";
import Responses from "./components/Responses";

export default function App() {
  const [page, setPage] = useState("form"); // "form" or "responses"

  return (
    <div className="container">
      <header>
        <h1>Mini Forms App</h1>
        <nav>
          <button onClick={() => setPage("form")} className={page==="form"? "active":""}>Form</button>
          <button onClick={() => setPage("responses")} className={page==="responses"? "active":""}>Responses</button>
        </nav>
      </header>

      <main>
        {page === "form" ? <Form /> : <Responses />}
      </main>

      <footer>
        <small>Built for hackathon — frontend => POST /api/submit, GET /api/responses</small>
      </footer>
    </div>
  );
}
