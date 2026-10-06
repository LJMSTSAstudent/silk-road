import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import camel from "../assets/camel.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Investors", path: "/investors" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-silk-white/95 text-white backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={camel}
            alt="Silk Road camel"
            className="h-10 w-auto object-contain"
          />

          <div className="hidden leading-tight sm:block">
            <p className="font-silk text-silk-gold text-lg tracking-[0.18em]">
              SILK ROAD
            </p>

            <p className="text-[10px] tracking-[0.28em] text-silk-gold">
              MERCHANT EXCHANGE
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-silk font-medium text-silk-gold/80 transition hover:text-silk-gold"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/signup"
            className="rounded-full bg-silk-gold px-5 py-2.5 text-sm font-bold font-silk text-silk-dark transition hover:-translate-y-0.5 hover:bg-[#d7b76f]"
          >
            Invest
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="my-1.5 block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
        </button>
      </nav>

      {/* Mobile navigation */}
      {open && (
        <div className="border-t border-white/10 bg-silk-brown px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-white/80 hover:bg-white/5 hover:text-silk-gold"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-silk-gold px-4 py-3 text-center font-bold text-silk-dark"
            >
              Invest
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;