"use client";

import { useState, FormEvent } from "react";
import { Reveal } from "@/components/useScrollReveal";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    window.location.href = `mailto:hello@thisyearnofear.com?subject=Subscribe to updates&body=Please add me to the mailing list: ${encodeURIComponent(email)}`;
  };

  return (
    <footer className="section footer">
      <Reveal as="div" className="footer__brand" variant="fade">
        thisyearnofear
      </Reveal>
      <Reveal as="div" className="footer__meta" variant="fade">
        <div className="footer__links">
          <a href="https://github.com/thisyearnofear" data-hover>
            github
          </a>
          <a href="mailto:hello@thisyearnofear.com" data-hover>
            contact
          </a>
        </div>
        <form className="footer__form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="footer__input"
            aria-label="Email for updates"
            required
          />
          <button type="submit" className="footer__btn" data-hover>
            Get updates
          </button>
        </form>
        Open to collaborations, forks, and weird ideas
        <br />
        © {new Date().getFullYear()} thisyearnofear
      </Reveal>
    </footer>
  );
}
