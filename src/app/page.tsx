import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { about, education, experience, hero, projects, site, skills, type Project } from "@/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Section id="about" index="01" title="About">
        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            {about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={150}>
            <Terminal />
          </Reveal>
        </div>
      </Section>
      <Section id="experience" index="02" title="Experience">
        <Experience />
      </Section>
      <Section id="projects" index="03" title="Projects">
        <Projects />
      </Section>
      <Section id="skills" index="04" title="Skills">
        <Skills />
      </Section>
      <Section id="education" index="05" title="Education">
        <Education />
      </Section>
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:grid-cols-[1.25fr_1fr]">
        {/* Not wrapped in Reveal: the headline must paint before JavaScript loads */}
        <div>
          <Image
            src={site.photo}
            alt={`Portrait of ${site.name}`}
            width={96}
            height={96}
            priority
            className="mb-6 size-24 rounded-full border-2 border-line object-cover lg:hidden"
          />
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-3 py-1 text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {hero.status}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            <span className="block text-muted">Hi, I&apos;m {site.name}.</span>
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{hero.intro}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-subtle">
            <MapPinIcon className="size-4" />
            {site.location}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 font-medium text-accent-fg transition-transform hover:-translate-y-0.5"
            >
              View my work
              <ArrowRightIcon className="size-4" />
            </Link>
            <a
              href={site.resume}
              download
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-card px-5 font-medium transition-colors hover:border-fg/30"
            >
              <DownloadIcon className="size-4" />
              Download resume
            </a>
            <div className="ml-1 flex items-center gap-1">
              <SocialLink href={site.github} label="GitHub">
                <GitHubIcon className="size-5" />
              </SocialLink>
              <SocialLink href={site.linkedin} label="LinkedIn">
                <LinkedInIcon className="size-5" />
              </SocialLink>
              <SocialLink href={`mailto:${site.email}`} label="Email">
                <MailIcon className="size-5" />
              </SocialLink>
            </div>
          </div>
        </div>
        <Portrait />
      </div>
    </section>
  );
}

function Portrait() {
  return (
    <div className="relative mx-auto hidden w-full max-w-sm lg:block">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-accent/15 blur-3xl" aria-hidden="true" />
      <div className="relative rounded-[2rem] border border-line bg-card p-2 shadow-2xl shadow-black/5 dark:shadow-black/40">
        <Image
          src={site.photo}
          alt={`Portrait of ${site.name}`}
          width={720}
          height={720}
          priority
          className="aspect-square w-full rounded-[1.5rem] object-cover"
        />
      </div>
      <p className="absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium whitespace-nowrap shadow-lg shadow-black/5">
        <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
        Open to AI &amp; full-stack roles
      </p>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-fg"
    >
      {children}
    </a>
  );
}

function Terminal() {
  const lines: { cmd: string; out: string[] }[] = [
    { cmd: "whoami", out: ["kazi nahid · software engineer"] },
    {
      cmd: "cat now.txt",
      out: ["LLM features @ LEADS (banking HRM)", "terra-audit: radar → carbon credits"],
    },
    { cmd: "ls stack/", out: ["java  spring-boot  angular  python", "fastapi  next.js  ollama  postgres"] },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-2xl shadow-black/5 dark:shadow-black/40">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3" aria-hidden="true">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-subtle">~/kazi-nahid</span>
      </div>
      <div className="space-y-4 p-5 font-mono text-[13px] leading-relaxed">
        {lines.map((l) => (
          <div key={l.cmd}>
            <p>
              <span className="text-accent">❯</span> <span className="text-fg">{l.cmd}</span>
            </p>
            {l.out.map((o) => (
              <p key={o} className="text-muted">
                {o}
              </p>
            ))}
          </div>
        ))}
        <p aria-hidden="true">
          <span className="text-accent">❯</span>{" "}
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-fg/70 motion-reduce:animate-none" />
        </p>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <Reveal className="rounded-2xl border border-line bg-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
        <div>
          <h3 className="text-xl font-semibold">{experience.company}</h3>
          <p className="mt-1 text-sm text-muted">{experience.product}</p>
        </div>
        <p className="text-sm text-subtle">{experience.location}</p>
      </div>

      <ol className="mt-8 space-y-4 border-l border-line pl-6">
        {experience.roles.map((role, i) => (
          <li key={role.title} className="relative">
            <span
              className={`absolute top-1.5 -left-[29px] size-2.5 rounded-full ring-4 ring-card ${
                i === 0 ? "bg-accent" : "bg-line"
              }`}
              aria-hidden="true"
            />
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <p className={i === 0 ? "font-medium" : "text-muted"}>{role.title}</p>
              <p className="font-mono text-xs text-subtle">{role.period}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {experience.groups.map((group) => (
          <div key={group.label}>
            <p className="mb-4 font-mono text-xs tracking-wider text-accent uppercase">{group.label}</p>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.slice(0, 32)} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function Projects() {
  const [featured, ...rest] = projects;
  return (
    <div className="space-y-6">
      <Reveal>
        <FeaturedProject project={featured} />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 100}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-line bg-card p-6 transition-colors hover:border-accent/40 sm:p-8">
      <div className="glow pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent">Featured</span>
          <span className="text-subtle">
            {project.kind} · {project.period}
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{project.name}</h3>
        <p className="mt-1 text-muted">{project.tagline}</p>
        <p className="mt-5 max-w-3xl leading-relaxed text-muted">{project.description}</p>

        {project.stats && (
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {project.stats.map((s) => (
              <div key={s.label} className="bg-card p-4">
                <dt className="text-xs text-subtle">{s.label}</dt>
                <dd className="mt-1 font-mono text-2xl font-semibold text-fg">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <Tags tags={project.tags} />

        <div className="mt-8 flex flex-wrap gap-3">
          {project.caseStudy && (
            <Link
              href={project.caseStudy}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-0.5"
            >
              Read the case study
              <ArrowRightIcon className="size-4" />
            </Link>
          )}
          {project.links.map((l) => (
            <ExternalLink key={l.href} href={l.href}>
              {l.label}
            </ExternalLink>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-accent/40">
      <p className="text-xs text-subtle">
        {project.kind} · {project.period}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{project.name}</h3>
      <p className="mt-1 text-sm text-muted">{project.tagline}</p>
      <p className="mt-4 flex-1 leading-relaxed text-muted">{project.description}</p>
      <Tags tags={project.tags} />
      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.map((l) => (
          <ExternalLink key={l.href} href={l.href}>
            {l.label}
          </ExternalLink>
        ))}
      </div>
    </article>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
      {tags.map((t) => (
        <li key={t} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium transition-colors hover:border-fg/30"
    >
      {children}
      <ArrowUpRightIcon className="size-3.5" />
    </a>
  );
}

function Skills() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((s, i) => (
        <Reveal
          key={s.group}
          delay={i * 60}
          className={`rounded-2xl border border-line bg-card p-5 ${
            i === skills.length - 1 && skills.length % 3 === 2 ? "lg:col-span-2" : ""
          }`}
        >
          <h3 className="font-mono text-xs tracking-wider text-accent uppercase">{s.group}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {s.items.map((item) => (
              <li key={item} className="rounded-md bg-accent-soft px-2.5 py-1 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

function Education() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {education.map((e, i) => (
        <Reveal key={e.school} delay={i * 80} className="rounded-2xl border border-line bg-card p-6">
          <p className="font-mono text-xs text-subtle">{e.period}</p>
          <h3 className="mt-3 font-semibold">{e.degree}</h3>
          <p className="mt-1 text-muted">{e.school}</p>
          <p className="mt-4 text-sm text-muted">{e.detail}</p>
        </Reveal>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6">
      <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-14 text-center sm:px-12">
        <div className="glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <p className="font-mono text-sm text-accent">06 — Contact</p>
          <h2 id="contact-title" className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Let&apos;s build something reliable.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            I&apos;m open to AI engineering and full-stack roles. The fastest way to reach me is email.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 font-medium text-accent-fg transition-transform hover:-translate-y-0.5"
            >
              <MailIcon className="size-4" />
              {site.email}
            </a>
            <a
              href={site.linkedin}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 font-medium transition-colors hover:border-fg/30"
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
            <a
              href={site.github}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 font-medium transition-colors hover:border-fg/30"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
