import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

import Navbar from "../components/Navbar";
import InvestorCard from "../components/InvestorCard";

import map from "../assets/SilkRoadMap.png";

function Investors() {
const [investors, setInvestors] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadInvestors() {
    try {
      const investorsQuery = query(
        collection(db, "investors"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(investorsQuery);

      const investorData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInvestors(investorData);
    } catch (error) {
      console.error("Error loading ledger:", error);
    } finally {
      setLoading(false);
    }
  }

  loadInvestors();
}, []);


  return (
    <div className="min-h-screen bg-silk-cream">
      <Navbar />

      {/* Dashboard header */}
      <section className="bg-silk-dark px-6 py-16 text-white sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-silk-gold">
                Merchant Exchange
              </p>

              <h1 className="mt-3 font-silk text-5xl sm:text-6xl">
                The Network
              </h1>

              <p className="mt-4 max-w-xl leading-7 text-white/60">
                See who has joined the Silk Road and explore the network
                connecting merchants across Eurasia.
              </p>
            </div>

            <Link
              to="/signup"
              className="rounded-full bg-silk-gold px-6 py-3 text-center font-bold text-silk-dark transition hover:-translate-y-0.5"
            >
              Become an Investor
            </Link>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12">

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <SummaryCard
            label="Total Investors"
            value={investors.length}
          />

<SummaryCard
  label="Gold Invested"
  value={investors.reduce(
    (total, investor) => total + Number(investor.gold || 0),
    0
  )}
/>

          <SummaryCard
            label="Trading Cities"
            value="4"
          />

        </div>

        {/* Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">

          {/* Map */}
          <section className="overflow-hidden rounded-2xl border border-silk-green/10 bg-silk-paper">

            <div className="border-b border-silk-green/10 px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-silk-gold">
                The Route
              </p>

              <h2 className="mt-1 font-silk text-3xl">
                Across the Silk Road
              </h2>
            </div>

            <div className="p-3 sm:p-5">
              <img
                src={map}
                alt="Silk Road trade route map"
                className="w-full rounded-xl"
              />
            </div>
          </section>

          {/* Investors */}
          <section className="rounded-2xl border border-silk-green/10 bg-white/60 p-6">

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-silk-gold">
                  Live ledger
                </p>

                <h2 className="mt-1 font-silk text-3xl">
                  Investor Wall
                </h2>
              </div>

              <span className="rounded-full bg-silk-green/10 px-3 py-1 text-xs font-semibold">
                {investors.length} members
              </span>
            </div>

{loading ? (
  <p className="mt-6 text-sm text-silk-green/60">
    Loading ledger...
  </p>
) : investors.length === 0 ? (
  <p className="mt-6 text-sm text-silk-green/60">
    No investors yet. Be the first to join!
  </p>
) : (
  <div className="mt-6 space-y-3">
    {investors.map((investor) => (
<InvestorCard
  key={investor.id}
  name={investor.name}
  location={investor.group}
  amount={`${investor.gold} gold`}
/>
    ))}
  </div>
)}

            <Link
              to="/signup"
              className="mt-6 block rounded-xl border border-silk-green/15 px-5 py-3 text-center text-sm font-bold transition hover:bg-silk-green hover:text-white"
            >
              Add Your Name
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-silk-green/10 bg-white/60 p-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-silk-green/50">
        {label}
      </p>

      <p className="mt-2 font-silk text-4xl text-silk-green">
        {value}
      </p>
    </div>
  );
}

export default Investors;