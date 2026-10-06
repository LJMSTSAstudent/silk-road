import { motion } from "framer-motion";

function InvestorCard({ name, location, amount }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      whileHover={{
        x: 5,
      }}
      transition={{
        duration: 0.35,
      }}
      className="flex items-center justify-between gap-4 border-b border-silk-green/10 py-5 last:border-0"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-silk-green text-sm font-bold text-silk-gold">
          {name.charAt(0)}
        </div>

        <div className="min-w-0">
          <p className="truncate font-semibold">
            {name}
          </p>

          <p className="truncate text-xs text-silk-green/50">
            {location}
          </p>
        </div>
      </div>

      <p className="shrink-0 font-semibold text-silk-green">
        {amount}
      </p>
    </motion.div>
  );
}

export default InvestorCard;    