"use client";

import { Reveal } from "@/components/useScrollReveal";

export default function Footer() {
  return (
    <footer className="section footer">
      <Reveal as="div" className="footer__brand" variant="fade">
        thisyearnofear
      </Reveal>
      <Reveal as="div" className="footer__meta" variant="fade">
        <div className="footer__links">
          <a href="#" data-hover>
            IG
          </a>
          <a href="#" data-hover>
            X
          </a>
          <a href="https://github.com/thisyearnofear" data-hover>
            GH
          </a>
        </div>
        built in public — no fear, no time like the present
        <br />
        © {new Date().getFullYear()} thisyearnofear
      </Reveal>
    </footer>
  );
}
