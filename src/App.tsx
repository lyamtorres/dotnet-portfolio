import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Code2,
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Briefcase,
  MapPin,
  CalendarDays,
  Sun,
  Moon,
  Rocket,
  Database,
  Cloud,
  Boxes,
  Terminal,
  Cpu,
  ChevronRight,
  GitBranchIcon,
  SplinePointer,
  LayoutTemplate,
  BrainCircuit,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

// —— Helper components ——
function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return (
    <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)} aria-label="Basculer le thème">
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <Separator className="hidden md:block flex-1 ml-6" />
    </div>
  );
}

// —— Data (personnalisez librement) ——
const PROFILE = {
  name: "Lyam Torres",
  title: "Développeur .NET / Full‑Stack",
  location: "Nantes, France",
  summary:
    "Je conçois des applications Web performantes et scalables avec .NET, React et GitHub. J'aime transformer des idées en produits robustes et élégants.",
  avatar: "portrait.jpeg",
  email: "lyamtorres@hotmail.com",
  github: "https://github.com/lyamtorres",
  linkedin: "https://www.linkedin.com/in/lyamtorres/",
  cv: "/cv.pdf",
  years: 4,
  projectsCount: 0,
  certifications: 0,
};

const PROJECTS = [
  {
    title: "Dojang Platform",
    description:
      "Plateforme multi‑tenant de facturation électronique avec workflow d'approbation, export comptable et intégration SSO.",
    stack: ["ASP.NET Core", "EF Core", "PostgreSQL", "React", "Tailwind", "Azure"],
    links: {
      repo: "https://github.com/", // demo
      live: "https://exemple.com",
    },
  },
  {
    title: "AI Chatbot",
    description:
      "Microservices CQRS/DDD pour la tarification dynamique, bus d'événements, et cache distribué.",
    stack: [".NET 8", "MediatR", "Redis", "RabbitMQ", "Docker", "Kubernetes"],
    links: { repo: "https://github.com/", live: "#" },
  },
  {
    title: "Sushiito Restaurant",
    description:
      "Microservices CQRS/DDD pour la tarification dynamique, bus d'événements, et cache distribué.",
    stack: [".NET 8", "MediatR", "Redis", "RabbitMQ", "Docker", "Kubernetes"],
    links: { repo: "https://github.com/", live: "#" },
  },
];

const SKILLS = [
  { name: ".NET / C#", level: 95 },
  { name: "ASP.NET Core", level: 92 },
  { name: "Entity Framework", level: 88 },
  { name: "Azure", level: 85 },
  { name: "SQL", level: 86 },
  { name: "React", level: 82 },
  { name: "TypeScript", level: 80 },
  { name: "Docker", level: 84 },
  { name: "Kubernetes", level: 72 },
  { name: "Tests / xUnit", level: 78 },
];

const EXPERIENCE = [
  {
    company: "FinTech Nova",
    role: "Senior .NET Engineer",
    period: "2023 – Aujourd'hui",
    location: "Remote / Paris",
    points: [
      "Architecture microservices .NET 8, observabilité (OpenTelemetry).",
      "Réduction du temps de réponse de 40% via cache Redis + tuning EF Core.",
      "Mise en place CI/CD GitHub Actions vers Azure AKS.",
    ],
  },
  {
    company: "Retail Cloud",
    role: "Développeur Full‑Stack .NET",
    period: "2020 – 2023",
    location: "Paris",
    points: [
      "Refonte d'un monolithe vers ASP.NET Core + React.",
      "Intégration Azure AD B2C, RBAC et feature flags.",
      "Couverture de tests >85% sur les services critiques.",
    ],
  },
  {
    company: "Agence Web",
    role: "Développeur .NET Junior",
    period: "2018 – 2020",
    location: "Lyon",
    points: [
      "Applications métiers, API REST, optimisation SQL.",
      "Mise en place d'un design system interne (React + Tailwind).",
    ],
  },
];

const CERTS = [
  "Microsoft Certified: Azure Developer Associate",
  "AZ‑204: Developing Solutions for Microsoft Azure",
  "Docker Certified Associate (DCA)",
  "Scrum.org PSM I",
];

// —— Tooltip content for Recharts ——
function SkillTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div className="rounded-xl border bg-background/95 backdrop-blur px-3 py-2 text-sm shadow">
        <span className="font-medium">{p.name}</span>
        <span className="ml-2 text-muted-foreground">{p.level}%</span>
      </div>
    );
  }
  return null;
}

// —— Main Page ——
export default function DotNetPortfolio() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }),
    []
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background aesthetics */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_50%_0%,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-400/20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(127,127,127,0.08)_1px,transparent_1px)] bg-[length:28px_100%] opacity-30" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 grid place-items-center rounded-xl bg-primary/15 text-primary">
              <Code2 className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight">{PROFILE.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#projets" className="hover:text-foreground">Projets</a>
            <a href="#competences" className="hover:text-foreground">Compétences</a>
            <a href="#experience" className="hover:text-foreground">Expérience</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={PROFILE.cv} download>
              <Button size="sm" className="hidden md:inline-flex"><Download className="h-4 w-4 mr-2"/>CV</Button>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-[1.1fr_.9fr] gap-8 items-center">
          <motion.div initial="hidden" animate="show" variants={variants}>
            <Badge className="rounded-full px-3 py-1" variant="secondary">
              <span className="inline-flex items-center gap-2"><Rocket className="h-4 w-4"/> Disponible pour mission</span>
            </Badge>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {PROFILE.title}
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">{PROFILE.summary}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projets"><Button>Voir mes projets <ChevronRight className="ml-1 h-4 w-4"/></Button></a>
              <a href={`mailto:${PROFILE.email}`}><Button variant="outline"><Mail className="mr-2 h-4 w-4"/>Me contacter</Button></a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer"><Button variant="ghost"><Github className="mr-2 h-4 w-4"/>GitHub</Button></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Button variant="ghost"><Linkedin className="mr-2 h-4 w-4"/>LinkedIn</Button></a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{PROFILE.years}+</div>
                  <div className="text-xs text-muted-foreground">années d'expérience</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{PROFILE.projectsCount}</div>
                  <div className="text-xs text-muted-foreground">projets livrés</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{PROFILE.certifications}</div>
                  <div className="text-xs text-muted-foreground">certifications</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                    <AvatarImage src={PROFILE.avatar} alt={PROFILE.name} />
                    <AvatarFallback>LT</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold leading-none">{PROFILE.name}</h3>
                    <p className="text-sm text-muted-foreground">{PROFILE.location}</p>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary"/> Remote/On‑site</div>
                  <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary"/> Freelance/Full‑time</div>
                  <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary"/> ASAP</div>
                </div>
                <Separator className="my-6" />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: ".NET 10 / C#", Icon: Terminal },
                    { label: "ASP.NET Core", Icon: Code2 },
                    { label: "React / TS", Icon: LayoutTemplate },
                    { label: "Figma", Icon: SplinePointer },
                    { label: "GitHub / Git", Icon: GitBranchIcon },
                    { label: "GPT-5", Icon: BrainCircuit },
                  ].map(({ label, Icon }) => (
                    <div key={label} className="flex items-center gap-2 rounded-xl border p-2 text-sm">
                      <Icon className="h-4 w-4 text-primary"/>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projets */}
      <section id="projets" className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <SectionTitle icon={Code2} title="Projets sélectionnés" subtitle="Un aperçu de ce que je construis" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Badge key={s} variant="secondary" className="rounded-full">{s}</Badge>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <a href={p.links.repo} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="outline"><Github className="mr-2 h-4 w-4"/>Code</Button>
                    </a>
                    <a href={p.links.live} target="_blank" rel="noreferrer">
                      <Button size="sm">Live <ExternalLink className="ml-2 h-4 w-4"/></Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Compétences */}
      <section id="competences" className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <SectionTitle icon={Terminal} title="Compétences" subtitle="Technos & maîtrise" />
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Forces clés</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {[
                ".NET 8",
                "C# 12",
                "ASP.NET Core",
                "EF Core",
                "REST/gRPC",
                "Azure (App Service, AKS)",
                "CI/CD GitHub Actions",
                "Clean Arch / DDD",
                "React + TypeScript",
                "Testing (xUnit)"
              ].map((s) => (
                <Badge key={s} className="rounded-full" variant="secondary">{s}</Badge>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Niveau par compétence</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SKILLS}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={40} />
                    <Tooltip content={<SkillTooltip />} />
                    <Bar dataKey="level" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Expérience */}
      <section id="experience" className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <SectionTitle icon={Briefcase} title="Expérience" subtitle="Ce que j'ai accompli" />
        <div className="grid lg:grid-cols-3 gap-6">
          {EXPERIENCE.map((e) => (
            <motion.div key={e.company} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{e.role}</CardTitle>
                  <p className="text-sm text-muted-foreground">{e.company} • {e.location}</p>
                  <p className="text-xs text-muted-foreground">{e.period}</p>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications & Témoignages */}
      <section className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <Tabs defaultValue="certs" className="w-full">
          <TabsList>
            <TabsTrigger value="certs">Certifications</TabsTrigger>
            <TabsTrigger value="temoignages">Témoignages</TabsTrigger>
          </TabsList>
          <TabsContent value="certs">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Validations & badges</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {CERTS.map((c) => (
                  <Badge key={c} className="rounded-full" variant="secondary">{c}</Badge>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="temoignages">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Ce que disent mes clients</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    name: "S. Dupont",
                    role: "CTO, FinTech Nova",
                    text:
                      "Alexandre a livré une architecture fiable et bien documentée. Impact direct sur nos KPI produits.",
                  },
                  {
                    name: "M. Leroy",
                    role: "Lead Dev, Retail Cloud",
                    text:
                      "Très autonome, force de proposition. Le passage au cloud s'est fait sans downtime.",
                  },
                  {
                    name: "A. Bernard",
                    role: "PO, Agence Web",
                    text:
                      "Qualité de code exemplaire et communication claire. Je recommande chaudement.",
                  },
                ].map((t) => (
                  <div key={t.name} className="rounded-2xl border p-4">
                    <p className="text-sm">“{t.text}”</p>
                    <div className="mt-3 text-xs text-muted-foreground">{t.name} — {t.role}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-6 md:py-12">
        <SectionTitle icon={Mail} title="Contact" subtitle="Parlons de votre projet" />
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">M'écrire</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={`mailto:${PROFILE.email}`} method="post" encType="text/plain" className="grid gap-3">
                <Input placeholder="Votre nom" name="name" required />
                <Input type="email" placeholder="Votre email" name="email" required />
                <Textarea placeholder="Votre message" name="message" rows={5} required />
                <Button type="submit">Envoyer</Button>
              </form>
              <p className="mt-3 text-xs text-muted-foreground">Ou écrivez‑moi directement : <a className="underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Infos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary"/> {PROFILE.location}</div>
              <div className="flex items-center gap-2"><Github className="h-4 w-4 text-primary"/> <a href={PROFILE.github} className="underline" target="_blank" rel="noreferrer">GitHub</a></div>
              <div className="flex items-center gap-2"><Linkedin className="h-4 w-4 text-primary"/> <a href={PROFILE.linkedin} className="underline" target="_blank" rel="noreferrer">LinkedIn</a></div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} {PROFILE.name}. Tous droits réservés.</span>
          <span>Construit avec .NET, React & ❤️</span>
        </div>
      </footer>
    </div>
  );
}

/*
— Instructions rapides —
1) Remplacez les données de PROFILE (nom, email, liens, avatar, CV).
2) Ajoutez vos vrais projets dans PROJECTS (titres, descriptions, stack, liens).
3) Intégrez ce composant dans votre app (ex: app/page.tsx dans Next.js) et assurez‑vous que Tailwind + shadcn/ui sont configurés.
4) Optionnel: branchez le formulaire à un backend (API /send‑mail) plutôt qu'un mailto.
*/