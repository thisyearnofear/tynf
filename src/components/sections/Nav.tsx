"use client";

export default function Nav() {
  return (
    <header className="nav" data-nav>
      <a href="#top" className="nav__brand" data-hover>
        thisyearnofear
      </a>
      <nav className="nav__links">
        <a href="#work" data-hover>
          work
        </a>
        <a href="#manifesto" data-hover>
          ethos
        </a>
        <a href="#contact" data-hover>
          contact
        </a>
      </nav>
    </header>
  );
}
