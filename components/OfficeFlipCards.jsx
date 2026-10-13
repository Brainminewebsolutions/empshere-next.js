"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowsClockwise, MapPin, NavigationArrow, Phone } from "@phosphor-icons/react/ssr";
import punePhoto from "@/app/images/contactimages/office-pune-shaniwar-wada.webp";
import delhiPhoto from "@/app/images/contactimages/office-delhi-india-gate.webp";
import bengaluruPhoto from "@/app/images/contactimages/office-bengaluru-vidhana-soudha.webp";

/* --------------------------------------------------------------------
   Office cards: a city photo with the city name on a small button; the
   card flips on hover (pointer devices) or when the button is pressed
   (touch / keyboard) to show the office address and phone numbers.
   Styles live in app/globals.css under `.em-office`.
   Photos: CC0 / public domain (Wikimedia Commons, Flickr via Openverse).
   -------------------------------------------------------------------- */

export const OFFICES = [
  {
    city: "Pune",
    badge: "Head Office",
    photo: punePhoto,
    photoAlt: "Shaniwar Wada main gate in Pune",
    address: "2nd Floor, Sapphire Chambers, Above Axis Bank, Baner Road, Baner, Pune, Maharashtra – 411045",
    phones: ["020-27292732", "020-27292733", "+91-7798981534"],
  },
  {
    city: "Delhi",
    badge: "Branch Office",
    photo: delhiPhoto,
    photoAlt: "India Gate in New Delhi",
    address: "Plot No. 11, 1st Floor, Sector 12A, Dwarka, Near Dwarka Metro Station, New Delhi – 110075",
    phones: ["+91-9823185585", "+91-7798981117"],
  },
  {
    city: "Bengaluru",
    badge: "Branch Office",
    photo: bengaluruPhoto,
    photoAlt: "Vidhana Soudha in Bengaluru",
    address: "Aarya Center, Opposite 8th Block Post Office, Near Ganesh Temple, Koramangala, Bengaluru, Karnataka – 560095",
    phones: ["+91-9922412060", "+91-7798981117"],
  },
];

function OfficeCard({ office, index }) {
  const [flipped, setFlipped] = useState(false);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;

  return (
    <li
      className="em-office-item reveal-on-scroll reveal-fade-up"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={`em-office ${flipped ? "em-office--flipped" : ""}`}>
        <div className="em-office-inner">
          {/* Front: city photo */}
          <div className="em-office-face em-office-front" aria-hidden={flipped || undefined}>
            <Image
              src={office.photo}
              alt={office.photoAlt}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
              className="em-office-photo"
            />
            <span className="em-office-shade" aria-hidden="true" />
            <span className="em-office-badge">{office.badge}</span>
            <button
              type="button"
              className="em-office-city"
              aria-expanded={flipped}
              aria-controls={`office-${office.city}`}
              onClick={() => setFlipped(true)}
            >
              <MapPin weight="fill" aria-hidden="true" />
              {office.city}
            </button>
            <span className="em-office-hint" aria-hidden="true">
              <ArrowsClockwise weight="bold" />
              Hover to view contact
            </span>
          </div>

          {/* Back: contact details */}
          <div id={`office-${office.city}`} className="em-office-face em-office-back" aria-hidden={!flipped || undefined}>
            <div className="em-office-back-head">
              <span className="em-office-back-badge">{office.badge}</span>
              <h3 className="em-office-back-city">{office.city}</h3>
            </div>

            <p className="em-office-address">
              <MapPin weight="fill" aria-hidden="true" />
              <span>{office.address}</span>
            </p>

            <ul className="em-office-phones">
              {office.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} tabIndex={flipped ? undefined : -1}>
                    <Phone weight="fill" aria-hidden="true" />
                    {phone}
                  </a>
                </li>
              ))}
            </ul>

            <div className="em-office-actions">
              <a
                className="em-office-directions"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={flipped ? undefined : -1}
              >
                <NavigationArrow weight="fill" aria-hidden="true" />
                Get Directions
              </a>
              <button
                type="button"
                className="em-office-back-btn"
                onClick={() => setFlipped(false)}
                tabIndex={flipped ? undefined : -1}
              >
                Show photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function OfficeFlipCards() {
  return (
    <ul className="em-office-grid">
      {OFFICES.map((office, index) => (
        <OfficeCard key={office.city} office={office} index={index} />
      ))}
    </ul>
  );
}
