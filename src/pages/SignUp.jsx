import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FadeUp } from "../components/animations";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

import camel from "../assets/Camel.png";

function SignUp() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    group: "",
    gold: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  }

  // STEP 1 — Create Firebase account
  async function handleAccountSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in every field.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      setStep(2);
    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Your password is too weak.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  // STEP 2 — Select group
  function handleGroupSubmit(e) {
    e.preventDefault();

    if (!form.group) {
      setError("Please select a group.");
      return;
    }

    setError("");
    setStep(3);
  }

  // STEP 3 — Choose gold
  function handleGoldSubmit(e) {
    e.preventDefault();

    if (!form.gold || Number(form.gold) < 0) {
      setError("Please enter a valid amount of gold.");
      return;
    }

    setError("");
    setStep(4);
  }

  // STEP 4 — Save everything to Firestore
  async function handleConfirm() {
    try {
      setError("");
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        setError("Your session expired. Please sign up again.");
        return;
      }

      await setDoc(doc(db, "investors", user.uid), {
        name: form.name,
        email: form.email,
        group: form.group,
        gold: Number(form.gold),
        createdAt: serverTimestamp(),
      });

      navigate("/investors");
    } catch (error) {
      console.error(error);
      setError("We couldn't save your information. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-silk-cream">
      {/* LEFT SIDE */}
      <div className="relative hidden overflow-hidden bg-silk-green lg:flex lg:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-silk-dark via-silk-green to-[#285345]" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white xl:p-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={camel}
              alt="Silk Road camel"
              className="h-12 w-auto"
            />

            <div>
              <p className="font-silk tracking-[0.18em]">
                SILK ROAD
              </p>

              <p className="text-[9px] tracking-[0.25em] text-silk-gold">
                MERCHANT EXCHANGE
              </p>
            </div>
          </Link>

          <div className="max-w-lg">
            <p className="text-sm uppercase tracking-[0.3em] text-silk-gold">
              Join the network
            </p>

            <h1 className="mt-5 font-silk text-6xl leading-none xl:text-7xl">
              Your journey
              <br />
              starts here.
            </h1>

            <p className="mt-6 leading-7 text-white/60">
              Become part of a network connecting merchants, cities,
              cultures, and ideas across the ancient world.
            </p>
          </div>

          <p className="text-xs text-white/30">
            SILK ROAD MERCHANT EXCHANGE
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <main className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">

          <Link
            to="/"
            className="text-sm text-silk-green/50 hover:text-silk-green lg:hidden"
          >
            ← Back to home
          </Link>

          {/* Progress */}
<div className="mt-8 flex items-center gap-2 lg:mt-0">
  {[1, 2, 3, 4].map((number) => (
    <div
      key={number}
      className={
        "h-1.5 flex-1 rounded-full transition " +
        (number <= step
          ? "bg-silk-gold"
          : "bg-silk-green/10")
      }
    />
  ))}
</div>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="mt-8">
                <FadeUp>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-silk-gold">
                    Step 1 of 4
                  </p>
                </FadeUp>

                <FadeUp delay={0.1}>
                  <h1 className="mt-3 font-silk text-4xl sm:text-5xl">
                    Create your account
                  </h1>
                </FadeUp>

                <FadeUp delay={0.2}>
                  <p className="mt-4 leading-6 text-silk-green/60">
                    First, tell us who you are.
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.3}>
                <form
                  onSubmit={handleAccountSubmit}
                  className="mt-10 space-y-5"
                >
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="merchant@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                  />

                  {error && <ErrorMessage message={error} />}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-silk-green px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-silk-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Creating account..." : "Continue"}
                  </button>
                </form>
              </FadeUp>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="mt-8">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-silk-gold">
                  Step 2 of 4
                </p>

                <h1 className="mt-3 font-silk text-4xl sm:text-5xl">
                  Choose your group
                </h1>

                <p className="mt-4 leading-6 text-silk-green/60">
                  Which merchant group are you representing?
                </p>
              </div>

              <form
                onSubmit={handleGroupSubmit}
                className="mt-10 space-y-5"
              >
                <label className="block text-sm font-semibold">
                  Merchant Group
                </label>

                <select
                  name="group"
                  value={form.group}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-silk-green/15 bg-white px-4 py-3.5 outline-none focus:border-silk-gold focus:ring-2 focus:ring-silk-gold/20"
                >
                  <option value="">Select a group</option>
                  <option value="Silk Road">Silk Road</option>
                  <option value="Indian Ocean">Indian Ocean</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Trans-Saharan">Trans-Saharan</option>
                </select>

                {error && <ErrorMessage message={error} />}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-silk-green px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-silk-dark"
                >
                  Continue
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-silk-green/50 hover:text-silk-green"
                >
                  ← Back
                </button>
              </form>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="mt-8">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-silk-gold">
                  Step 3 of 4
                </p>

                <h1 className="mt-3 font-silk text-4xl sm:text-5xl">
                  Invest your gold
                </h1>

                <p className="mt-4 leading-6 text-silk-green/60">
                  How much gold would you like to contribute?
                </p>
              </div>

              <form
                onSubmit={handleGoldSubmit}
                className="mt-10 space-y-5"
              >
                <Input
                  label="Gold"
                  name="gold"
                  type="number"
                  placeholder="500"
                  value={form.gold}
                  onChange={handleChange}
                />

                <p className="text-sm text-silk-green/40">
                  This represents your investment in the merchant
                  exchange.
                </p>

                {error && <ErrorMessage message={error} />}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-silk-green px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-silk-dark"
                >
                  Review Investment
                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full text-sm text-silk-green/50 hover:text-silk-green"
                >
                  ← Back
                </button>
              </form>
            </>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <>
              <div className="mt-8">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-silk-gold">
                  Step 4 of 4
                </p>

                <h1 className="mt-3 font-silk text-4xl sm:text-5xl">
                  Confirm your entry
                </h1>

                <p className="mt-4 leading-6 text-silk-green/60">
                  Review your merchant information before entering
                  the Exchange.
                </p>
              </div>

              <div className="mt-10 overflow-hidden rounded-2xl border border-silk-green/10 bg-white">
                <SummaryRow label="Name" value={form.name} />
                <SummaryRow label="Email" value={form.email} />
                <SummaryRow label="Group" value={form.group} />
                <SummaryRow
                  label="Gold Investment"
                  value={`${Number(form.gold).toLocaleString()} gold`}
                  last
                />
              </div>

              {error && (
                <div className="mt-5">
                  <ErrorMessage message={error} />
                </div>
              )}

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={loading}
                  className="w-full rounded-xl bg-silk-green px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-silk-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Entering the Exchange..."
                    : "Confirm & Enter Exchange"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full text-sm text-silk-green/50 hover:text-silk-green"
                >
                  ← Change investment
                </button>
              </div>
            </>
          )}

          <p className="mt-7 text-center text-sm text-silk-green/50">
            Already registered?{" "}
            <Link
              to="/investors"
              className="font-semibold text-silk-green hover:underline"
            >
              View the Exchange
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function Input({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={type === "number" ? "0" : undefined}
        className="w-full rounded-xl border border-silk-green/15 bg-white px-4 py-3.5 outline-none transition placeholder:text-silk-green/25 focus:border-silk-gold focus:ring-2 focus:ring-silk-gold/20"
      />
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p
      role="alert"
      className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {message}
    </p>
  );
}

function SummaryRow({ label, value, last = false }) {
  return (
    <div
      className={
        "flex items-center justify-between px-5 py-4 " +
        (!last ? "border-b border-silk-green/10" : "")
      }
    >
      <span className="text-sm text-silk-green/50">
        {label}
      </span>

      <span className="max-w-[60%] text-right font-semibold">
        {value}
      </span>
    </div>
  );
}

export default SignUp;