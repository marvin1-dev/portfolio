'use client';

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Globe, Phone, ExternalLink, Menu, X, Calendar, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * React + Tailwind single-file starter that mirrors a Next.js portfolio structure.
 * - Ready to drop into a Next.js page (e.g., app/page.tsx) or use as a standalone React app.
 * - Uses shadcn/ui components (available in this environment) + Framer Motion.
 * - Netlify-ready contact form (no backend required).
 *
 * Sections: Navbar, Hero, Work, Process, Testimonials, About, Contact, Footer
 * Features: Simple filter for projects, Case Study modal, CTA buttons, responsive layout
 */

const PROJECTS = [
  {
    id: "house-of-fades",
    title: "House of Fades — Barbershop",
    blurb: "Booking-first site with modern dark theme and service cards.",
    tags: ["Local Service", "Tailwind", "Netlify"],
    image: "https://mb-solutions.s3.dualstack.us-east-1.amazonaws.com/assets/House-of-Fades.png",
    url: "https://stupendous-paprenjak-b3682f.netlify.app/",
    role: "Design, Build, Deploy",
    stack: ["HTML", "CSS", "Tailwind", "Netlify"],
    outcomes: [
      "+48% clicks from Google Maps",
      "Sub-1s LCP on 4G",
      "2x bookings within 60 days",
    ],
  },
  {
    id: "a1-masonry",
    title: "A-1 Masonry LLC — Trades",
    blurb: "SEO-friendly static site with form + gallery.",
    tags: ["Trades", "SEO", "Static"],
    image: "https://mb-solutions.s3.dualstack.us-east-1.amazonaws.com/assets/A1-Masonry.png",
    url: "https://www.a-1masonry.llc/",
    role: "Design, Build",
    stack: ["W3.CSS", "Netlify Forms"],
    outcomes: [
      "PageSpeed 95+ mobile",
      "Ranked for 3 local keywords",
      "Leads from contact form week 1",
    ],
  },
  {
    id: "Restaurant-example",
    title: "Restaurant Example — Dining",
    blurb: "Vibrant landing with menu highlights and hours.",
    tags: ["Restaurant", "Mobile-first"],
    image: "https://mb-solutions.s3.dualstack.us-east-1.amazonaws.com/assets/The%20Resturant.png",
    url: "https://charcoal-dining.netlify.app/",
    role: "Design, Build",
    stack: ["Next.js", "Tailwind"],
    outcomes: [
      "Bounce rate ↓ 23%",
      "Organic impressions ↑",
      "Menu views ↑ 3x",
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Julio V.",
    role: "Owner, House of Fades",
    quote:
      "He made the site fast and simple for clients to book. We started getting more calls the same week.",
  },
  {
    name: "Ana R.",
    role: "La Ruta Food Truck",
    quote:
      "Clean design, easy updates, and our menu finally looks great on phones.",
  },
];

const NAV = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function useScrollTo() {
  return (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function Navbar() {
  const scrollTo = useScrollTo();
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-background/70 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="font-semibold tracking-tight">Marvin B. Solutions</div>
        <div className="hidden md:flex gap-6 text-sm">
          {NAV.map((n) => (
            <button
              key={n.id}
              className="hover:text-foreground/70"
              onClick={() => scrollTo(n.id)}
            >
              {n.label}
            </button>
          ))}
        </div>
        <div className="hidden md:block">
          <Button onClick={() => scrollTo("contact")}>
            Let’s talk <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background">
          {NAV.map((n) => (
            <button
              key={n.id}
              className="block w-full text-left px-4 py-3 hover:bg-muted"
              onClick={() => {
                setOpen(false);
                scrollTo(n.id);
              }}
            >
              {n.label}
            </button>
          ))}
          <button className="w-full px-4 py-3 flex items-center gap-2 hover:bg-muted" onClick={() => { setOpen(false); scrollTo("contact"); }}>
            <Calendar className="h-4 w-4" /> Book a call
          </button>
          <div className="flex justify-end px-4 py-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Hero() {
  const scrollTo = useScrollTo();
  return (
    <section id="home" className="pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl font-bold tracking-tight">
            Professional, modern websites for local businesses
          </motion.h1>
          <p className="mt-4 text-muted-foreground">
            Built to attract customers with clean design, strong SEO, and easy management.
          </p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => scrollTo("work")}>
              See my work <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => scrollTo("contact")}>
              Get a quote
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Star className="h-4 w-4" /> Fast load times</div>
            <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> SEO foundations</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> Mobile-first</div>
          </div>
        </div>
        <div>
          <Card className="overflow-hidden">
            <img src="https://mb-solutions.s3.dualstack.us-east-1.amazonaws.com/assets/Marvin%20B.%20Solutions.png" alt="Portfolio preview" className="w-full h-64 object-cover" />
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground">Recent project</div>
              <div className="font-semibold">Booking experience redesign boosted conversions</div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <Tag>Next.js</Tag><Tag>Tailwind</Tag><Tag>Netlify</Tag>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

type Project = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
  image: string;
  url: string;
  role: string;
  stack: string[];
  outcomes: string[];
};

function ProjectCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  return (
    <Card className="hover:shadow-lg transition cursor-pointer" onClick={() => onOpen(p)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {p.title}
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
        <p className="text-sm text-muted-foreground">{p.blurb}</p>
      </CardHeader>
      <CardContent>
        <div className="aspect-video overflow-hidden rounded-xl">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          {p.tags.map((t:string) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-background rounded-2xl max-w-3xl w-full overflow-hidden" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="font-semibold">{project.title}</div>
          <Button variant="ghost" onClick={onClose}><X className="h-5 w-5" /></Button>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <img src={project.image} alt={project.title} className="rounded-xl w-full h-56 object-cover" />
          <div>
            <div className="text-sm text-muted-foreground">Role</div>
            <div className="font-medium mb-3">{project.role}</div>
            <div className="text-sm text-muted-foreground">Stack</div>
            <div className="flex gap-2 flex-wrap mb-3">
              {project.stack.map((s)=> <Tag key={s}>{s}</Tag>)}
            </div>
            <div className="text-sm text-muted-foreground">Outcomes</div>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              {project.outcomes.map((o)=> <li key={o}>{o}</li>)}
            </ul>
            <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-primary">
              Visit live site <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Work() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Project | null>(null);
  const tags = useMemo(() => ["All", ...new Set(PROJECTS.flatMap((p) => p.tags))], []);
  const filtered = PROJECTS.filter((p) => filter === "All" || p.tags.includes(filter));

  return (
    <section id="work" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Selected Work</h2>
            <p className="text-muted-foreground mt-2">A few recent builds across local service niches.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((t) => (
              <Button key={t} variant={filter === t ? "default" : "outline"} size="sm" onClick={() => setFilter(t)}>
                {t}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={(proj) => setActive(proj)} />
          ))}
        </div>
      </div>
      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function Process() {
  const steps = [
    { title: "Discover", text: "Quick call to understand goals, audience, and required features." },
    { title: "Design", text: "Wireframe + style direction. Fast iterations with your feedback." },
    { title: "Build", text: "Accessible, responsive site with SEO and analytics baked in." },
    { title: "Launch", text: "Deploy to Netlify with custom domain + SSL and performance checks." },
  ];
  return (
    <section id="process" className="py-16 md:py-20 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Process</h2>
        <p className="text-muted-foreground mt-2">Simple, collaborative, and transparent from day one.</p>
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          {steps.map((s, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3"><span className="text-xl font-bold">{idx + 1}</span> {s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Nice words</h2>
        <p className="text-muted-foreground mt-2">A few notes from clients.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed">“{t.quote}”</p>
                <div className="mt-4 text-sm text-muted-foreground">{t.name} — {t.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About me</h2>
          <p className="text-muted-foreground mt-3">
            I’m Marvin, a web developer in Hickory, NC. I help small businesses get modern, fast websites
            that bring real results — more calls, bookings, and sales. I keep things simple: clear process,
            clean code, and friendly communication.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="inline-flex items-center gap-2 text-primary" href="#work">
              View projects <ChevronRight className="h-4 w-4" />
            </a>
            <a className="inline-flex items-center gap-2 text-primary" href="#contact">
              Contact me <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <Card>
            <CardContent className="pt-6">
              <ul className="grid grid-cols-2 gap-4 text-sm">
                <li><span className="text-muted-foreground">Services:</span><br/> Websites, SEO, Maintenance</li>
                <li><span className="text-muted-foreground">Stack:</span><br/> Next.js, Tailwind, Netlify</li>
                <li><span className="text-muted-foreground">Turnaround:</span><br/> 1–2 weeks for most sites</li>
                <li><span className="text-muted-foreground">Support:</span><br/> Email + Loom walkthroughs</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 md:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Let’s build something</h2>
            <p className="text-muted-foreground mt-3">Tell me a bit about your business and what you need. I’ll reply within 24 hours.</p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@mbsolutionslab.com</div>
              <div className="flex items-center gap-2"><Github className="h-4 w-4" /> github.com/your-handle</div>
              <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> Hickory, NC (Remote-friendly)</div>
            </div>
          </div>
          <Card>
            <CardContent className="pt-6">
              {/* Netlify Forms-enabled */}
              <form name="contact" method="POST" data-netlify="true" className="space-y-4">
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label className="text-sm">Name</label>
                  <Input name="name" placeholder="Your name" required />
                </div>
                <div>
                  <label className="text-sm">Email</label>
                  <Input type="email" name="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="text-sm">Project Type</label>
                  <Input name="project" placeholder="e.g., Barbershop site, Restaurant, Trades" />
                </div>
                <div>
                  <label className="text-sm">Message</label>
                  <Textarea name="message" placeholder="What do you need? Goals, timeline, examples…" rows={5} />
                </div>
                <Button type="submit" className="w-full">Send message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Marvin B. Solutions. All rights reserved.</div>
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="hover:text-foreground/80 inline-flex items-center gap-2"><Github className="h-4 w-4" /> GitHub</a>
          <a href="#" className="hover:text-foreground/80 inline-flex items-center gap-2"><Globe className="h-4 w-4" /> Digital Dialogue</a>
          <a href="#contact" className="hover:text-foreground/80 inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function PortfolioStarter() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Process />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
