import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeUp, ScaleIn } from "../components/animations";

import Navbar from "../components/Navbar";
import camel from "../assets/Camel.png";
import hero from "../assets/Hero.png";
import map from "../assets/SilkRoadMap.png";

function Home() {
  return (
    <div className="min-h-screen bg-silk-cream">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[75vh] overflow-hidden">
        {/* Background */}
        <img
          src={hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-silk-dark/95 via-silk-dark/75 to-silk-dark/25" />

        <div className="relative mx-auto flex min-h-[75vh] max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-12">
          <div className="max-w-2xl text-white">
            <FadeUp>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-12 bg-silk-gold" />

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-silk-gold">
                  The ancient world's greatest network
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-silk text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
                Goods.
                <br />
                Ideas.
                <br />
                <span className="text-silk-gold">Cultures.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                The Silk Road connected civilizations across thousands of miles,
                moving goods, knowledge, technology, and culture between East
                and West.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/signup"
                  className="rounded-full bg-silk-gold px-7 py-3.5 text-center font-bold text-silk-dark transition hover:-translate-y-1 hover:bg-[#d7b76f]"
                >
                  Become an Investor
                </Link>

                <a
                  href="#route"
                  className="rounded-full border border-white/30 px-7 py-3.5 text-center font-medium text-white transition hover:bg-white/10"
                >
                  Explore the Route
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-silk-green/10 bg-silk-dark text-white">
        <motion.div
          className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          <Stat number="4,000+" label="Miles of routes" />
          <Stat number="3" label="Continents connected" />
          <Stat number="100s" label="Trading cities" />
          <Stat number="1" label="Global network" />
        </motion.div>
      </section>

      {/* WHY INVEST */}
      <section className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-silk-gold">
              Why invest?
            </p>

            <h2 className="mt-3 font-silk text-4xl sm:text-5xl">
              More than a trade route.
            </h2>

            <p className="mt-5 leading-7 text-silk-green/70">
              The Silk Road was a network of opportunity. Merchants,
              travelers, and civilizations exchanged valuable goods and ideas,
              creating connections that shaped the world.
            </p>
          </div>

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <Feature
              number="01"
              title="Global Reach"
              text="Connect East and West through a network spanning thousands of miles."
            />

            <Feature
              number="02"
              title="Valuable Goods"
              text="Silk, spices, precious metals, textiles, and other highly sought-after goods moved across the route."
            />

            <Feature
              number="03"
              title="Ideas Travel"
              text="Religion, technology, language, and knowledge traveled alongside merchants."
            />
          </motion.div>
        </div>
      </section>

      {/* ROUTE */}
      <section
        id="route"
        className="bg-silk-paper px-6 py-20 sm:px-10 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-silk-gold">
              The route
            </p>

            <h2 className="mt-3 font-silk text-4xl sm:text-5xl">
              Follow the network.
            </h2>

            <p className="mt-5 leading-7 text-silk-green/70">
              From the Mediterranean to East Asia, the Silk Road was not one
              road. It was a massive collection of interconnected trade routes.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {["Constantinople", "Samarkand", "Dunhuang", "Chang'an"].map(
                (city) => (
                  <div
                    key={city}
                    className="rounded-xl border border-silk-green/10 bg-silk-cream p-4"
                  >
                    <p className="text-sm font-semibold">{city}</p>
                  </div>
                )
              )}
            </div>
          </div>

          <ScaleIn>
            <div className="overflow-hidden rounded-2xl border border-silk-green/10 bg-silk-cream p-3 shadow-xl">
              <img
                src={map}
                alt="Map showing the Silk Road"
                className="h-auto w-full rounded-xl"
              />
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-silk-green px-6 py-20 text-center text-white">
        <img
          src={camel}
          alt=""
          className="mx-auto mb-5 h-20 w-auto brightness-0 invert opacity-90"
        />

        <h2 className="font-silk text-4xl sm:text-5xl">
          The journey starts here.
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-white/70">
          Join the merchant exchange and become part of the Silk Road network.
        </p>

        <Link
          to="/signup"
          className="mt-8 inline-block rounded-full bg-silk-gold px-8 py-3.5 font-bold text-silk-dark transition hover:-translate-y-1"
        >
          Join the Exchange
        </Link>
      </section>

      <footer className="bg-silk-dark px-6 py-8 text-center text-sm text-white/40">
        Silk Road Merchant Exchange
      </footer>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
        },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
          },
        },
      }}
      className="px-4 py-7 text-center sm:px-6"
    >
      <p className="font-silk text-3xl text-silk-gold sm:text-4xl">
        {number}
      </p>

      <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
        {label}
      </p>
    </motion.div>
  );
}

function Feature({ number, title, text }) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
        },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.2,
        },
      }}
      className="rounded-2xl border border-silk-green/10 bg-white/50 p-7 shadow-sm"
    >
      <p className="font-mono text-sm text-silk-gold">{number}</p>

      <h3 className="mt-6 font-silk text-2xl">{title}</h3>

      <p className="mt-3 leading-6 text-silk-green/65">{text}</p>
    </motion.div>
  );
}

export default Home;