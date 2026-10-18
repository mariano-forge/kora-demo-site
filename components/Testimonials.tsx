"use client";

// Reviews that turn by themselves every 5 seconds: moving content, where the element a pin points at
// changes, and what the capture shows depends on the moment.

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [paused]);
  const current = testimonials[index];
  return (
    <div className="testimonials" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <blockquote key={index} className="testimonial">
        « {current.quote} »<footer>{current.author}</footer>
      </blockquote>
      <div className="dots" role="tablist" aria-label="Avis">
        {testimonials.map((testimonial, position) => (
          <button
            key={testimonial.author}
            type="button"
            role="tab"
            aria-selected={position === index}
            aria-label={`Avis ${position + 1}`}
            onClick={() => setIndex(position)}
          />
        ))}
      </div>
    </div>
  );
}
