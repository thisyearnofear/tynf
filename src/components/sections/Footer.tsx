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
          <a href="https://github.com/thisyearnofear" data-hover>
            github
          </a>
          <a href="mailto:hello@thisyearnofear.com" data-hover>
            contact
          </a>
        </div>
        Open to collaborations, forks, and weird ideas
        <br />
        © {new Date().getFullYear()} thisyearnofear
      </Reveal>
    </footer>
  );
}
