import { useState, useEffect } from "react";
import {
  MapPin, Clock, Phone, Instagram, Facebook, Twitter,
  ChevronDown, Menu, X, CheckCircle2,
} from "lucide-react";

// ─── Tailwind custom font class helpers via inline style ───────────────────
// We wire Anton as display, Fraunces as the Italian accent, Inter as body

// ─── Data ──────────────────────────────────────────────────────────────────
const burgers = [
  {
    id: 1,
    name: "Beef Single",
    price: "£7.50",
    tag: "Classic",
    desc: "100% prime beef, pickles, mustard, ketchup on a toasted brioche bun. The one that started it all.",
    img: "photo-1651993841930-946a700c1524",
  },
  {
    id: 2,
    name: "Beef Double",
    price: "£9.50",
    tag: "Stack",
    desc: "Two smashed patties, two layers of American cheese, caramelised onions, secret house sauce.",
    img: "photo-1611309454921-16cef3438ee0",
  },
  {
    id: 3,
    name: "Chicken Single",
    price: "£7.00",
    tag: "Crispy",
    desc: "Buttermilk-brined fried chicken fillet, crunchy slaw, bread-and-butter pickles, smoky mayo.",
    img: "photo-1662452883375-9226ea22c765",
  },
  {
    id: 4,
    name: "Chicken Double",
    price: "£9.00",
    tag: "Stack",
    desc: "Double crunch, double satisfaction. Extra-pickled jalapeños, chipotle aioli, house slaw.",
    img: "photo-1673166516558-3f1b88a22db8",
  },
  {
    id: 5,
    name: "Spicy Beef",
    price: "£8.50",
    tag: "🔥 Hot",
    desc: "Ghost-chilli glazed beef patty, habanero Jack cheese, crispy shallots, sriracha honey drizzle.",
    img: "photo-1651993841930-946a700c1524",
  },
  {
    id: 6,
    name: "BBQ Beef Double",
    price: "£10.50",
    tag: "Smoky",
    desc: "Slow-smoked double beef, hickory BBQ sauce, beer-battered onion rings, aged white cheddar.",
    img: "photo-1611309454921-16cef3438ee0",
  },
  {
    id: 7,
    name: "Crispy Chicken",
    price: "£7.50",
    tag: "Crunchy",
    desc: "Cornflake-crusted chicken fillet, honey-Dijon glaze, iceberg lettuce, vine tomato.",
    img: "photo-1662452883375-9226ea22c765",
  },
  {
    id: 8,
    name: "Zinger Double",
    price: "£9.50",
    tag: "🔥 Inferno",
    desc: "Twin spiced fillets, Carolina Reaper sauce, cool ranch drizzle, house pickles. Not for the faint-hearted.",
    img: "photo-1673166516558-3f1b88a22db8",
  },
];

const pizzas = [
  {
    id: 1,
    name: "Margherita",
    price: "£10.00",
    desc: "San Marzano tomato, fior di latte mozzarella, fresh basil, extra-virgin Sicilian olive oil.",
    img: "photo-1513104890138-7c749659a591",
  },
  {
    id: 2,
    name: "Marinara",
    price: "£9.00",
    desc: "Ancient recipe. Tomato, garlic, oregano, olive oil. Cheese-free. Pure and timeless.",
    img: "photo-1571997478779-2adcbbe9ab2f",
  },
  {
    id: 3,
    name: "Diavola",
    price: "£12.00",
    desc: "Spicy 'nduja, smoked scamorza, chilli oil, a finish of local wildflower honey.",
    img: "photo-1655673654158-9f7285b7d1ea",
  },
  {
    id: 4,
    name: "Quattro Formaggi",
    price: "£13.00",
    desc: "Mozzarella, gorgonzola piccante, taleggio, aged Parmigiano-Reggiano. No tomato.",
    img: "photo-1590947132387-155cc02f3212",
  },
  {
    id: 5,
    name: "Napoletana",
    price: "£11.00",
    desc: "Anchovies from Cetara, Gaeta olives, salted capers, tomato, mozzarella.",
    img: "photo-1513104890138-7c749659a591",
  },
];

const pastas = [
  {
    name: "Spaghetti Aglio e Olio",
    price: "£10.50",
    desc: "Spaghetti, golden garlic, chilli flakes, parsley, finest Sicilian extra-virgin olive oil.",
    img: "photo-1556761223-4c4282c73f77",
  },
  {
    name: "Fettuccine Alfredo",
    price: "£12.50",
    desc: "Egg fettuccine, aged Parmigiano-Reggiano, Normandy butter, cracked black pepper. The Roman original.",
    img: "photo-1627042633145-b780d842ba45",
  },
  {
    name: "Penne Arrabbiata",
    price: "£11.00",
    desc: "Penne rigate, fiery San Marzano tomato sauce, peperoncino, fresh basil, Pecorino.",
    img: "photo-1516100882582-96c3a05fe590",
  },
  {
    name: "Lasagna",
    price: "£13.50",
    desc: "45-minute baked layers. Slow-braised Bolognese, house béchamel, hand-rolled egg pasta.",
    img: "photo-1556761223-4c4282c73f77",
  },
  {
    name: "Carbonara",
    price: "£13.00",
    desc: "Rigatoni, guanciale, Pecorino Romano, free-range egg yolk. Absolutely no cream — ever.",
    img: "photo-1627042633145-b780d842ba45",
  },
  {
    name: "Pesto Genovese",
    price: "£11.50",
    desc: "Trofie pasta, hand-pounded Ligurian basil pesto, French green beans, new potatoes.",
    img: "photo-1516100882582-96c3a05fe590",
  },
];

// ─── BurgerFlipCard ─────────────────────────────────────────────────────────
function BurgerCard({ burger }: { burger: (typeof burgers)[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-80 cursor-pointer select-none"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={`${burger.name} — tap to reveal details`}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-[#1E1410]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={`https://images.unsplash.com/${burger.img}?w=600&h=480&fit=crop&auto=format`}
            alt={burger.name}
            className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A07] via-[#0E0A07]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] border rounded-full px-3 py-1 mb-2"
              style={{ color: "#F2823C", borderColor: "rgba(242,130,60,0.35)" }}
            >
              {burger.tag}
            </span>
            <h3
              className="text-2xl text-white uppercase leading-none"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              {burger.name}
            </h3>
            <p className="text-[#F2823C] font-bold text-lg mt-1">{burger.price}</p>
          </div>
          {/* Hover hint */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-60">
            <span className="text-white text-xs">↻</span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #C6401D 0%, #8B2200 100%)",
          }}
        >
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60"
              style={{ color: "#F2823C" }}
            >
              {burger.tag}
            </span>
            <h3
              className="text-3xl text-white uppercase leading-none mt-2"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              {burger.name}
            </h3>
            <p className="text-white/75 text-sm mt-4 leading-relaxed">{burger.desc}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-white text-2xl font-bold">{burger.price}</span>
            <button
              className="bg-white text-[#C6401D] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors hover:bg-[#F1E6CD]"
              onClick={(e) => e.stopPropagation()}
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PizzaCard ───────────────────────────────────────────────────────────────
function PizzaCard({ pizza }: { pizza: (typeof pizzas)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-full overflow-hidden shadow-2xl transition-all duration-500"
        style={{
          width: "210px",
          height: "210px",
          borderWidth: "3px",
          borderStyle: "solid",
          borderColor: hovered ? "#4B6142" : "rgba(75,97,66,0.3)",
          boxShadow: hovered
            ? "0 0 40px rgba(75,97,66,0.3), 0 20px 60px rgba(0,0,0,0.6)"
            : "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        <img
          src={`https://images.unsplash.com/${pizza.img}?w=480&h=480&fit=crop&auto=format`}
          alt={pizza.name}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "rotate(18deg) scale(1.12)" : "rotate(0deg) scale(1)",
            transition: "transform 0.9s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 100%, rgba(21,16,13,0.7) 0%, transparent 65%)",
          }}
        />
        {/* Price badge on hover */}
        <div
          className="absolute inset-x-0 bottom-4 flex justify-center transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)" }}
        >
          <span
            className="text-white text-sm font-bold px-4 py-1 rounded-full"
            style={{ background: "#4B6142" }}
          >
            {pizza.price}
          </span>
        </div>
      </div>

      <div className="mt-5 text-center px-4">
        <h3
          className="text-xl text-[#F1E6CD] italic leading-tight"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {pizza.name}
        </h3>
        <p className="text-white/40 text-xs mt-2 leading-relaxed max-w-[180px] mx-auto">
          {pizza.desc.slice(0, 60)}…
        </p>
        <p
          className="font-bold text-sm mt-2 md:hidden"
          style={{ color: "#4B6142" }}
        >
          {pizza.price}
        </p>
      </div>
    </div>
  );
}

// ─── SectionDivider ─────────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div
      className="relative h-28 flex items-center justify-center overflow-hidden"
      style={{ background: "#15100D" }}
    >
      {/* Left flame line */}
      <div
        className="absolute inset-y-0 left-0"
        style={{ right: "50%", background: "linear-gradient(90deg, transparent, rgba(198,64,29,0.15))" }}
      />
      {/* Right basil line */}
      <div
        className="absolute inset-y-0 right-0"
        style={{ left: "50%", background: "linear-gradient(270deg, transparent, rgba(75,97,66,0.15))" }}
      />

      {/* Horizontal seam */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-px h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, #C6401D 30%, #888 50%, #4B6142 70%, transparent 100%)" }}
      />

      {/* Centre badge */}
      <div
        className="relative z-10 flex items-center gap-5 px-8 py-3 rounded-full"
        style={{ background: "#15100D", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="text-center">
          <span
            className="block text-[10px] uppercase tracking-[0.35em] font-bold"
            style={{ color: "#C6401D" }}
          >
            Burger Bar
          </span>
          <div className="flex gap-0.5 mt-1 justify-center">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="block w-1.5 h-1.5 rounded-full"
                style={{ background: "#C6401D", opacity: i === 3 ? 0.3 : 1 }}
              />
            ))}
          </div>
        </div>

        <span
          className="text-white/20 text-xl font-thin"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          ×
        </span>

        <div
          className="text-[10px] uppercase tracking-[0.3em] font-bold text-center"
          style={{ color: "#4B6142" }}
        >
          <span
            className="block italic"
            style={{ fontFamily: "'Fraunces', serif", fontSize: "12px", textTransform: "none" }}
          >
            la cucina
          </span>
          <span className="block tracking-[0.35em] mt-0.5">italiana</span>
          <div className="flex gap-0.5 mt-1 justify-center">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="block w-1.5 h-1.5 rounded-full"
                style={{ background: "#4B6142", opacity: i === 1 ? 0.3 : 1 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Story", id: "story" },
    { label: "Burger Bar", id: "burger-bar" },
    { label: "Pizzeria", id: "pizzeria" },
    { label: "Pasta", id: "pasta" },
    { label: "Visit", id: "visit" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(21,16,13,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
        paddingTop: scrolled ? "12px" : "20px",
        paddingBottom: scrolled ? "12px" : "20px",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="tracking-[0.15em] text-white hover:text-[#F2823C] transition-colors duration-300 uppercase"
          style={{ fontFamily: "'Anton', sans-serif", fontSize: "22px" }}
          aria-label="ALAM — back to top"
        >
          ALAM
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm font-medium uppercase tracking-wider transition-colors duration-200"
              style={{
                color: activeSection === l.id ? "#F2823C" : "rgba(255,255,255,0.6)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#ffffff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  activeSection === l.id ? "#F2823C" : "rgba(255,255,255,0.6)")
              }
            >
              {l.label}
            </button>
          ))}
          <button
            className="text-white text-sm font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: "#C6401D" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F2823C")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#C6401D")}
          >
            Order Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg transition-colors"
          style={{ background: mobileOpen ? "rgba(198,64,29,0.2)" : "transparent" }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "400px" : "0px",
          background: "rgba(14,10,7,0.98)",
        }}
      >
        <div className="px-6 pb-6 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="block w-full text-left font-medium uppercase tracking-wider py-3.5 border-b transition-colors"
              style={{
                color: "rgba(255,255,255,0.75)",
                borderColor: "rgba(255,255,255,0.06)",
                fontSize: "14px",
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            className="mt-5 w-full text-white font-bold uppercase tracking-widest py-3.5 rounded-full text-sm"
            style={{ background: "#C6401D" }}
          >
            Order Now
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#15100D" }}
    >
      {/* Split imagery */}
      <div className="absolute inset-0 grid grid-cols-2">
        {/* Burger side */}
        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1651993841930-946a700c1524?w=960&h=1200&fit=crop&auto=format"
            alt="Flame-grilled burger"
            className="w-full h-full object-cover"
            style={{ opacity: 0.45, transform: "scale(1.04)", transition: "transform 8s ease-out" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(21,16,13,0.7) 0%, rgba(198,64,29,0.05) 60%, transparent 100%)",
            }}
          />
        </div>
        {/* Pizza side */}
        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=960&h=1200&fit=crop&auto=format"
            alt="Artisan Neapolitan pizza"
            className="w-full h-full object-cover"
            style={{ opacity: 0.45, transform: "scale(1.04)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to left, rgba(21,16,13,0.7) 0%, rgba(75,97,66,0.05) 60%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Vertical centre seam */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-px w-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.06) 70%, transparent 100%)",
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #15100D, transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-36 flex flex-col items-center text-center">
        {/* Super-label */}
        <p
          className="font-bold uppercase mb-6 tracking-[0.55em] text-xs"
          style={{ color: "#F2823C" }}
        >
          Fast Fire · Slow Craft
        </p>

        {/* Giant name */}
        <h1
          className="text-white uppercase select-none"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(6rem, 22vw, 18rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            textShadow:
              "0 0 140px rgba(198,64,29,0.35), 0 0 60px rgba(75,97,66,0.15)",
          }}
        >
          ALAM
        </h1>

        {/* Subtitle */}
        <p
          className="mt-7 mb-10 text-base md:text-xl leading-relaxed max-w-lg"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Where bold American flame meets the soul of{" "}
          <em
            className="not-italic"
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              color: "#F1E6CD",
            }}
          >
            la cucina italiana
          </em>
          . No apologies. No half-measures.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => document.getElementById("burger-bar")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold uppercase tracking-widest text-sm text-white px-9 py-4 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "#C6401D",
              boxShadow: "0 0 0 0 rgba(198,64,29,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F2823C";
              e.currentTarget.style.boxShadow = "0 8px 40px rgba(198,64,29,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#C6401D";
              e.currentTarget.style.boxShadow = "0 0 0 0 rgba(198,64,29,0.4)";
            }}
          >
            See the Menu
          </button>
          <button
            onClick={() => document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" })}
            className="font-bold uppercase tracking-widest text-sm text-white/80 px-9 py-4 rounded-full transition-all duration-300 hover:text-white hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.25)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
          >
            Find Us
          </button>
        </div>

        {/* Owner credit */}
        <p
          className="mt-14 text-xs uppercase tracking-[0.4em]"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          A restaurant by M. Huzaifa Alam
        </p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
        <div
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.4)",
              animation: "scrollDot 2s ease-in-out infinite",
            }}
          />
        </div>
        <ChevronDown size={14} style={{ color: "rgba(255,255,255,0.2)" }} />
      </div>

      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(10px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────
function Story() {
  return (
    <section id="story" className="py-28 px-6" style={{ background: "#15100D" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div>
          <p
            className="font-bold uppercase tracking-[0.45em] text-xs mb-5"
            style={{ color: "#C6401D" }}
          >
            Our Story
          </p>
          <h2
            className="text-white uppercase leading-[0.92] mb-8"
            style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
          >
            Two Worlds,<br />One Table.
          </h2>
          <p className="leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
            ALAM was born from a simple obsession: the perfect bite. Whether that is the char of a
            smash-pressed beef patty or the silkiness of hand-rolled pasta, we refuse to compromise.
          </p>
          <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Our kitchen splits cleanly — the Burger Bar runs hot and loud; the Pizzeria breathes slow
            and deliberate. Two philosophies. One roof. Every night we prove they belong together.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-6 rounded-3xl blur-2xl pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(198,64,29,0.08), rgba(75,97,66,0.08))" }}
          />
          <div className="relative grid grid-cols-2 gap-3">
            <img
              src="https://images.unsplash.com/photo-1770614388699-3b3d9664b031?w=480&h=560&fit=crop&auto=format"
              alt="Flames — the Burger Bar"
              className="rounded-2xl object-cover w-full"
              style={{ height: "280px", opacity: 0.85 }}
            />
            <img
              src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=480&h=560&fit=crop&auto=format"
              alt="Italian pizza — the Pizzeria"
              className="rounded-2xl object-cover w-full mt-10"
              style={{ height: "280px", opacity: 0.85 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BurgerBar ────────────────────────────────────────────────────────────────
function BurgerBar() {
  return (
    <section id="burger-bar" className="py-28 px-6" style={{ background: "#0E0A07" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p
              className="font-bold uppercase tracking-[0.45em] text-xs mb-3"
              style={{ color: "#F2823C" }}
            >
              Smash & Stack
            </p>
            <h2
              className="text-white uppercase leading-[0.9]"
              style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
            >
              Burger<br />Bar
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs md:text-right"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            100% prime beef, cage-free chicken. Every patty smash-pressed fresh to order on a
            ripping-hot cast-iron flat-top.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {burgers.map((b) => (
            <BurgerCard key={b.id} burger={b} />
          ))}
        </div>

        <p
          className="text-center text-xs uppercase tracking-[0.3em] mt-10"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          Hover each card to reveal · All burgers served with seasoned fries
        </p>
      </div>
    </section>
  );
}

// ─── Pizzeria ─────────────────────────────────────────────────────────────────
function Pizzeria() {
  return (
    <section id="pizzeria" className="py-28 px-6" style={{ background: "#15100D" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p
            className="font-bold uppercase tracking-[0.45em] text-xs mb-3"
            style={{ color: "#4B6142" }}
          >
            Napoli-style · Wood-fired · 72-hr cold ferment
          </p>
          <h2
            className="text-white uppercase leading-[0.9]"
            style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          >
            Pizzeria
          </h2>
          <p
            className="text-sm mt-5 max-w-sm mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            "00" flour dough. Stone deck at 450°C. There is no shortcut to this kind of crust.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-14">
          {pizzas.map((p) => (
            <PizzaCard key={p.id} pizza={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pasta ───────────────────────────────────────────────────────────────────
function Pasta() {
  return (
    <section id="pasta" className="py-28 px-6" style={{ background: "#100E0B" }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p
            className="font-bold uppercase tracking-[0.45em] text-xs mb-3"
            style={{ color: "#4B6142" }}
          >
            La Pasta
          </p>
          <h2
            className="text-white uppercase leading-[0.9]"
            style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          >
            Pasta
          </h2>
        </div>

        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {pastas.map((p, i) => (
            <PastaRow key={i} pasta={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PastaRow({ pasta }: { pasta: (typeof pastas)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex gap-5 md:gap-8 items-center py-7 px-3 rounded-xl cursor-default transition-all duration-300"
      style={{ background: hovered ? "rgba(255,255,255,0.025)" : "transparent" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative shrink-0 rounded-xl overflow-hidden"
        style={{ width: "80px", height: "80px", background: "#1A1200" }}
      >
        <img
          src={`https://images.unsplash.com/${pasta.img}?w=200&h=200&fit=crop&auto=format`}
          alt={pasta.name}
          className="w-full h-full object-cover transition-all duration-500"
          style={{
            opacity: hovered ? 0.9 : 0.65,
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h3
            className="italic leading-tight"
            style={{
              fontFamily: "'Fraunces', serif",
              color: "#F1E6CD",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            }}
          >
            {pasta.name}
          </h3>
          <span
            className="font-bold shrink-0 text-base"
            style={{ color: "#4B6142" }}
          >
            {pasta.price}
          </span>
        </div>
        <p
          className="text-sm mt-1.5 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {pasta.desc}
        </p>
      </div>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden" style={{ background: "#0C0905" }}>
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(75,97,66,0.06) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(198,64,29,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-14 md:gap-20 items-center relative z-10">
        {/* Photo placeholder */}
        <div className="md:col-span-2 flex justify-center md:justify-start">
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-3xl blur-xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(198,64,29,0.15), rgba(75,97,66,0.12))" }}
            />
            <div
              className="relative overflow-hidden rounded-2xl flex flex-col items-center justify-end"
              style={{
                width: "260px",
                height: "340px",
                background: "linear-gradient(160deg, #2A1E17 0%, #1A1209 100%)",
              }}
            >
              {/* Monogram placeholder */}
              <div className="flex-1 flex items-center justify-center">
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(198,64,29,0.08)",
                    border: "1px solid rgba(242,130,60,0.15)",
                  }}
                >
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: "2rem",
                      color: "rgba(242,130,60,0.5)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    MHA
                  </span>
                </div>
              </div>
              <div className="pb-5 text-center">
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Owner photo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-3">
          <p
            className="font-bold uppercase tracking-[0.45em] text-xs mb-4"
            style={{ color: "#C6401D" }}
          >
            The Mind Behind ALAM
          </p>
          <h2
            className="text-white uppercase leading-[0.9] mb-7"
            style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            M. Huzaifa<br />Alam
          </h2>
          <p
            className="leading-relaxed mb-4"
            style={{ color: "rgba(255,255,255,0.58)" }}
          >
            Growing up between two culinary worlds, Huzaifa always found comfort in food that commands
            attention. A self-taught cook with a professional obsession for process and precision, he
            built ALAM on one conviction: the best food does not ask for a category.
          </p>
          <p
            className="leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.58)" }}
          >
            "I have eaten the best burgers in New York and the finest pasta in Naples," he says. "I
            wanted one place where you could have both — and neither would apologise for existing next
            to the other."
          </p>

          {/* Stats */}
          <div className="flex items-center gap-8 flex-wrap">
            {[
              { figure: "8+", label: "Signature Burgers", color: "#F2823C" },
              { figure: "5", label: "Neapolitan Pizzas", color: "#4B6142" },
              { figure: "6", label: "Pasta Classics", color: "rgba(255,255,255,0.7)" },
            ].map((s, i, arr) => (
              <div key={s.label} className="flex items-center gap-8">
                <div className="text-center">
                  <p
                    className="leading-none"
                    style={{ fontFamily: "'Anton', sans-serif", fontSize: "3rem", color: s.color }}
                  >
                    {s.figure}
                  </p>
                  <p
                    className="text-xs uppercase tracking-wider mt-1.5"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {s.label}
                  </p>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px h-12 self-center" style={{ background: "rgba(255,255,255,0.08)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Visit / Footer ───────────────────────────────────────────────────────────
function Visit() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <footer id="visit" className="pt-28 pb-12 px-6" style={{ background: "#0A0806" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p
            className="font-bold uppercase tracking-[0.45em] text-xs mb-3"
            style={{ color: "#C6401D" }}
          >
            Come hungry
          </p>
          <h2
            className="text-white uppercase leading-[0.9]"
            style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(3rem, 9vw, 6rem)" }}
          >
            Visit
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {/* Info */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.35em] mb-6"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Find Us
            </p>
            <div className="space-y-5">
              <div className="flex gap-3.5">
                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: "#F2823C" }} />
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  42 Ember Lane,<br />London, EC1A 1BB,<br />United Kingdom
                </p>
              </div>
              <div className="flex gap-3.5">
                <Clock size={16} className="shrink-0 mt-0.5" style={{ color: "#F2823C" }} />
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <p>Mon–Thu · 11 am – 10 pm</p>
                  <p>Fri–Sat · 11 am – 11:30 pm</p>
                  <p>Sunday · 12 pm – 9 pm</p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <Phone size={16} className="shrink-0 mt-0.5" style={{ color: "#F2823C" }} />
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  +44 20 7946 0321
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-9">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  aria-label="Social link"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#C6401D";
                    e.currentTarget.style.color = "#F2823C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Menu quick-links */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.35em] mb-6"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Menu
            </p>
            <div className="space-y-2.5">
              {["Burger Bar", "Pizzeria", "Pasta", "Sides", "Drinks", "Desserts"].map((item) => (
                <p
                  key={item}
                  className="text-sm uppercase tracking-wider cursor-pointer transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.35em] mb-6"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Get in Touch
            </p>
            {sent ? (
              <div
                className="flex items-center gap-3 rounded-xl p-5"
                style={{
                  background: "rgba(75,97,66,0.12)",
                  border: "1px solid rgba(75,97,66,0.3)",
                }}
              >
                <CheckCircle2 size={18} style={{ color: "#4B6142" }} />
                <span className="text-sm font-medium" style={{ color: "#4B6142" }}>
                  Message sent! We will be in touch.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  style={inputBase}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(198,64,29,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  style={inputBase}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(198,64,29,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <textarea
                  placeholder="Your message…"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  style={{ ...inputBase, resize: "none" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(198,64,29,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button
                  type="submit"
                  className="w-full text-white font-bold uppercase tracking-widest text-sm py-3.5 rounded-xl transition-colors duration-300"
                  style={{ background: "#C6401D" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F2823C")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#C6401D")}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span
            className="uppercase tracking-[0.2em]"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "2rem",
              color: "rgba(255,255,255,0.12)",
            }}
          >
            ALAM
          </span>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
            © 2025 ALAM Restaurant · M. Huzaifa Alam · All rights reserved.
          </p>
          <p
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: "rgba(255,255,255,0.1)" }}
          >
            London · EC1A
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "#15100D",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#F1E6CD",
      }}
    >
      <Nav />
      <Hero />
      <Story />
      <BurgerBar />
      <SectionDivider />
      <Pizzeria />
      <Pasta />
      <About />
      <Visit />
    </div>
  );
}
