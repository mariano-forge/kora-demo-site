"use client";

// The menu by tabs: changing tab removes the other sections from the page. A pin placed on a hidden
// tab's dish finds no element until its tab is shown again, as on many real sites.

import { useState } from "react";
import { menu } from "@/lib/content";

export function MenuTabs() {
  const [tab, setTab] = useState(menu[0].id);
  const section = menu.find((candidate) => candidate.id === tab) ?? menu[0];
  return (
    <div className="menu-tabs">
      <div className="tabs" role="tablist" aria-label="Rubriques de la carte">
        {menu.map((candidate) => (
          <button key={candidate.id} type="button" role="tab" id={`tab-${candidate.id}`} aria-selected={candidate.id === tab} aria-controls={`panel-${candidate.id}`} onClick={() => setTab(candidate.id)}>
            {candidate.label}
          </button>
        ))}
      </div>
      <ul className="menu-list" role="tabpanel" id={`panel-${section.id}`} aria-labelledby={`tab-${section.id}`}>
        {section.items.map((item) => (
          <li key={item.name}>
            <span>
              {item.name}
              {item.detail && <small>{item.detail}</small>}
            </span>
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
