"use client";

// The contact form, checked in the browser and « sent » without a server (a demo site).

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        if (!String(data.get("nom") ?? "").trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.get("email") ?? "")) || !String(data.get("message") ?? "").trim()) {
          setError("Indiquez votre nom, une adresse e-mail valide et votre message.");
          return;
        }
        setError("");
        setSent(true);
        form.reset();
      }}
    >
      <label>
        Nom
        <input name="nom" autoComplete="name" />
      </label>
      <label>
        E-mail
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label>
        Sujet
        <select name="sujet" defaultValue="question">
          <option value="question">Une question</option>
          <option value="privatisation">Privatiser le café</option>
          <option value="pro">Café pour les professionnels</option>
        </select>
      </label>
      <label>
        Message
        <textarea name="message" />
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {sent && (
        <p className="form-sent" role="status">
          Merci ! Nous vous répondons sous 48 h.
        </p>
      )}
      <button type="submit" className="button">
        Envoyer
      </button>
      <p className="form-note">Pour réserver une table, appelez-nous : la réservation en ligne n’existe pas encore.</p>
    </form>
  );
}
