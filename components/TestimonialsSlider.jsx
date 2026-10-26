"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fitLogo } from "@/lib/clients";

/* "What Our Clients Say" slider shared by the home and About Us pages.
   Styling comes from each page's scoped CSS (.home-page / .about-page), so the
   class names here must stay in sync with those stylesheets.

   Desktop: every card is rendered once, plus clones of the first few so the
   row can keep sliding left forever. The track moves with a single transform;
   after it slides onto the clones it snaps back (invisibly) to the real cards.
   Keys never change, so cards never remount mid-animation.

   Mobile: a native scroll-snap row; the active card is tracked with an
   IntersectionObserver instead of measuring on every scroll event.

   Autoplay holds each card for 1.5s once it has settled, and pauses while a
   quote is expanded, keyboard focus is inside, the slider is off-screen, or
   the tab is in the background. All state lives here so ticks never
   re-render the whole page. */

const CLONES = 3;
const HOLD = 1500; // pause on each card once it has settled
const DESKTOP_DELAY = HOLD + 850; // + .testimonialsTrack transform transition
const MOBILE_DELAY = HOLD + 500; // + smooth scroll-snap
const MOBILE_RESUME = 4000;

// Optical size inside the logo tile; pages scale it per breakpoint via --logo-scale.
function logoStyle(logo) {
  const { width, height } = fitLogo(logo, { maxWidth: 72, maxHeight: 42 });
  return { "--w": `${width}px`, "--h": `${height}px` };
}

function StarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M10 1.5l2.472 5.008 5.528.803-4 3.899.944 5.508L10 14.25l-4.944 2.468.944-5.508-4-3.899 5.528-.803L10 1.5z" />
    </svg>
  );
}

function TestimonialCard({ testimonial, featured, expanded, onToggle, className = "", hidden = false, ...rest }) {
  return (
    <article
      className={`testimonialCard ${featured ? "testimonialFeatured" : ""} ${className}`}
      aria-hidden={hidden || undefined}
      {...rest}
    >
      <div className="testimonialBody">
        <h3 className="testimonialCompany">{testimonial.company}</h3>
        <p className={`testimonialQuote ${expanded ? "testimonialQuoteExpanded" : ""}`}>{testimonial.quote}</p>
        <button type="button" className="testimonialReadMore" onClick={onToggle} tabIndex={hidden ? -1 : undefined}>
          {expanded ? "Read Less" : "Read More..."}
        </button>
      </div>
      <div className="testimonialFooter">
        <div className="testimonialLogoWrap">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img
            className="testimonialLogo"
            src={testimonial.logo.src}
            alt={`${testimonial.company} logo`}
            width={testimonial.logo.width}
            height={testimonial.logo.height}
            style={logoStyle(testimonial.logo)}
            decoding="async"
          />
        </div>
        <div className="testimonialWho">
          <span className="testimonialName">{testimonial.name}</span>
          <span className="testimonialRole">{testimonial.role}</span>
          <div className="testimonialStars">
            {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSlider({ testimonials }) {
  const count = testimonials.length;
  const extended = [...testimonials, ...testimonials.slice(0, CLONES)];

  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const mobileResumeRef = useRef(null);

  const [slide, setSlide] = useState(0);
  const [instant, setInstant] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [focused, setFocused] = useState(false);
  const [mobileHold, setMobileHold] = useState(false);

  const toggle = useCallback((index) => setExpanded((prev) => ({ ...prev, [index]: !prev[index] })), []);

  // Environment: breakpoint, on-screen, tab visibility.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onMq = () => setIsMobile(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);

    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    let io;
    if ("IntersectionObserver" in window && rootRef.current) {
      io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
      io.observe(rootRef.current);
    } else {
      setInView(true);
    }

    return () => {
      mq.removeEventListener("change", onMq);
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
      clearTimeout(mobileResumeRef.current);
    };
  }, []);

  /* ---------------- Desktop ---------------- */

  const handleTransitionEnd = (event) => {
    if (event.target !== trackRef.current || event.propertyName !== "transform") return;
    if (slide < count) return;
    // We're showing the clones — jump back to the identical real cards.
    setInstant(true);
    setSlide((s) => s - count);
  };

  // Fallback for when transitionend never fires (reduced motion, background tab).
  useEffect(() => {
    if (slide < count) return;
    const timer = setTimeout(() => {
      setInstant(true);
      setSlide((s) => (s >= count ? s - count : s));
    }, 1100);
    return () => clearTimeout(timer);
  }, [slide, count]);

  // Re-enable transitions two frames after an instant jump has painted.
  useEffect(() => {
    if (!instant) return;
    let inner;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setInstant(false));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [instant]);

  const anyExpanded = Object.values(expanded).some(Boolean);
  const desktopPlaying = !isMobile && inView && pageVisible && !focused && !anyExpanded && !instant;
  useEffect(() => {
    if (!desktopPlaying) return;
    const timer = setTimeout(() => setSlide((s) => Math.min(s + 1, count)), DESKTOP_DELAY);
    return () => clearTimeout(timer);
  }, [desktopPlaying, slide, count]);

  /* ---------------- Mobile ---------------- */

  const scrollMobileTo = useCallback((index) => {
    const track = mobileTrackRef.current;
    const card = track?.children[index];
    if (!track || !card) return;
    // Scroll only the row itself — scrollIntoView would also move the page.
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  }, []);

  const holdMobile = useCallback(() => {
    setMobileHold(true);
    clearTimeout(mobileResumeRef.current);
    mobileResumeRef.current = setTimeout(() => setMobileHold(false), MOBILE_RESUME);
  }, []);

  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!isMobile || !track || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setMobileIndex(Number(entry.target.dataset.index));
        });
      },
      { root: track, threshold: 0.6 }
    );
    [...track.children].forEach((child) => io.observe(child));
    return () => io.disconnect();
  }, [isMobile]);

  const mobilePlaying = isMobile && inView && pageVisible && !mobileHold && !anyExpanded;
  useEffect(() => {
    if (!mobilePlaying) return;
    const timer = setTimeout(() => scrollMobileTo((mobileIndex + 1) % count), MOBILE_DELAY);
    return () => clearTimeout(timer);
  }, [mobilePlaying, mobileIndex, count, scrollMobileTo]);

  /* ---------------- Dots ---------------- */

  const activeIndex = isMobile ? mobileIndex : slide % count;
  const goTo = (index) => {
    if (isMobile) {
      holdMobile();
      scrollMobileTo(index);
    } else {
      setSlide(index);
    }
  };

  return (
    <div ref={rootRef}>
      <div
        className="testimonialsViewport reveal-on-scroll reveal-fade-up"
        style={{ transitionDelay: "120ms" }}
        onFocus={(e) => e.target.matches(":focus-visible") && setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <div
          ref={trackRef}
          className={`testimonialsTrack ${instant ? "testimonialsTrackInstant" : ""}`}
          style={{ "--slide": slide }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((testimonial, position) => {
            const index = position % count;
            const visible = position >= slide && position < slide + CLONES;
            return (
              <TestimonialCard
                key={position}
                testimonial={testimonial}
                featured={position === slide + 1}
                expanded={!!expanded[index]}
                onToggle={() => toggle(index)}
                hidden={!visible}
              />
            );
          })}
        </div>
      </div>

      <div
        className="testimonialsMobileTrack"
        ref={mobileTrackRef}
        onTouchStart={holdMobile}
        onPointerDown={holdMobile}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.company}
            data-index={index}
            testimonial={testimonial}
            featured={index === mobileIndex}
            expanded={!!expanded[index]}
            onToggle={() => toggle(index)}
            className="testimonialMobileCard"
          />
        ))}
      </div>

      <div className="testimonialsDots">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.company}
            type="button"
            aria-label={`Show testimonial from ${testimonial.company}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`testimonialsDot ${index === activeIndex ? "testimonialsDotActive" : ""}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
