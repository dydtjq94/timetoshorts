"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./Navigation.module.css";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Service", href: "service" },
  { label: "Process", href: "process" },
  { label: "Pricing", href: "pricing" },
  { label: "Contact", href: "contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const handleScroll = () => {
      setScrolled(main.scrollTop > 10);
    };

    main.addEventListener("scroll", handleScroll);
    return () => main.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.nav}`)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [menuOpen]);

  const navigateTo = useCallback((sectionId: string) => {
    window.dispatchEvent(
      new CustomEvent("navigateToSection", { detail: sectionId })
    );
  }, []);

  const handleLinkClick = useCallback(
    (href: string) => {
      setMenuOpen(false);
      navigateTo(href);
    },
    [navigateTo]
  );

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuIsOpen : ""}`}>
        <div className={styles.inner}>
          <a
            href="#"
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              navigateTo("top");
            }}
          >
            TIMETOSHORTS
          </a>

          {/* Desktop links */}
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={`#${link.href}`}
                  className={styles.link}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger button */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
        {/* Dropdown menu */}
        <div
          className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ""}`}
          aria-hidden={!menuOpen}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              className={styles.dropdownLink}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
