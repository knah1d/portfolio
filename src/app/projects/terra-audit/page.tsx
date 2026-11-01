import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terra Audit case study",
  description:
    "How I built Terra Audit: an AI-assisted carbon credit verification platform that turns Sentinel-1 satellite radar into reviewed, verifier-ready reports.",
};

const meta = [
  { label: "Role", value: "Solo developer" },
  { label: "Context", value: "Final-year project, IIT, University of Dhaka" },
  { label: "Timeline", value: "May — Oct 2026" },
  { label: "Supervisor", value: "Dr. Emon Kumar Dey" },
];

const steps = [
  { n: "01", title: "Measure", body: "Sentinel-1 radar time series show when each field was flooded and drained — no field sensors." },
  { n: "02", title: "Collect", body: "Seasons, practices, soil samples and documents go into one evidence record. Corrections are appended, never overwritten." },
  { n: "03", title: "Calculate", body: "Deterministic VM0051 and VM0042 engines with cited IPCC factors. Every intermediate value is kept." },
  { n: "04", title: "Check & review", body: "A readiness gate blocks incomplete work, and a second person approves or requests changes." },
  { n: "05", title: "Report", body: "A verifier-ready PDF plus a ZIP evidence package with a SHA-256 manifest." },
];

const results = [
  { value: "2.12", unit: "tCO₂e / ha", label: "Net reduction from a live run: 2 drydowns detected in an 84-day season" },
  { value: "0.719", unit: "F1", label: "ML cross-check on held-out plots (precision 72.7%, recall 71.1%, AUC 0.754)" },
  { value: "184", unit: "tests", label: "Backend tests passing, plus a production build and zero TypeScript errors" },
  { value: "8", unit: "checks", label: "Readiness gate that must pass before a report can be submitted" },
];

export default function TerraAuditCaseStudy() {
  return (
    <article className="mx-auto max-w-4xl px-4 pt-12 pb-24 sm:px-6">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
        <ArrowLeftIcon className="size-4" />
        Back to projects
      </Link>

      <Reveal>
        <header className="mt-10">
          <p className="font-mono text-sm text-accent">Case study</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Terra Audit</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
            An AI-assisted digital MRV platform that turns free satellite radar into a reviewed, verifier-ready carbon
            credit report — so every tonne of CO₂e can be traced back to its source.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ExtLink href="https://terra-audit.vercel.app" primary>
              Live app
            </ExtLink>
            <ExtLink href="https://github.com/knah1d/terra-audit">Source code</ExtLink>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-card p-4">
                <dt className="text-xs text-subtle">{m.label}</dt>
                <dd className="mt-1 text-sm font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>
      </Reveal>

      <Reveal>
        <figure className="mt-12">
          <a href="/terra-audit/poster.webp" target="_blank" rel="noopener noreferrer" className="block">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset */}
            <img
              src="/terra-audit/poster.webp"
              alt="Terra Audit final defense poster: problem, approach, system architecture, AI authority boundary and results"
              width={2400}
              height={1695}
              loading="lazy"
              className="w-full rounded-xl border border-line"
            />
          </a>
          <figcaption className="mt-3 text-center text-sm text-subtle">
            Final defense poster, October 2026. Click to open full size.
          </figcaption>
        </figure>
      </Reveal>

      <Block index="01" title="The problem">
        <p>
          Flooded rice fields release methane, a strong greenhouse gas. <strong>Alternate Wetting and Drying (AWD)</strong>{" "}
          drains a field at least twice per season and cuts that methane while keeping yields. Under Verra VM0051,
          the daily methane factor drops from <strong>1.00 to 0.55</strong> — about 45% lower.
        </p>
        <p>
          To earn carbon credits, a project has to <em>prove</em> the reduction to an independent verifier. In practice
          that breaks down: irrigation logs are incomplete, spreadsheets drop the factors and methodology version
          behind a number, and verifiers need every tonne traced back to evidence. Satellite tools and carbon
          spreadsheets live apart, so reviewers rebuild the link by hand.
        </p>
      </Block>

      <Block index="02" title="The approach">
        <p>One workflow where every step is saved together with its evidence.</p>
        <ol className="not-prose mt-6 grid gap-3 sm:grid-cols-5">
          {steps.map((s) => (
            <li key={s.n} className="rounded-xl border border-line bg-card p-4">
              <p className="font-mono text-xs text-accent">{s.n}</p>
              <p className="mt-2 font-medium text-fg">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <p>
          When a calculation runs, its field boundary, season inputs, methodology bundle and readiness result are
          frozen into an immutable snapshot. A report rebuilt later shows the same numbers and the same evidence.
        </p>
      </Block>

      <Block index="03" title="Architecture">
        <ArchitectureDiagram />
        <ul>
          <li>
            The <strong>Next.js</strong> app calls the <strong>FastAPI</strong> backend through an authenticated
            server-side proxy; the browser never talks to the API directly.
          </li>
          <li>
            Slow work — satellite analysis and AI explanations — goes through a <strong>durable job queue</strong>, so
            the API never hangs. Each job goes to exactly one worker and is recovered if that worker dies.
          </li>
          <li>
            The API and worker share one Python core for calculations, evidence and methodology rules. Data is
            multi-tenant in <strong>PostgreSQL</strong>, scoped by organization on every query.
          </li>
          <li>
            Frontend on Vercel; API and worker in Docker containers on Railway; CI runs backend tests and frontend
            checks on every push.
          </li>
        </ul>
      </Block>

      <Block index="04" title="AI that advises, never decides">
        <p>
          The most important design decision was where AI is <em>not</em> allowed. Carbon numbers have to be
          reproducible and auditable, so the boundary is explicit:
        </p>
        <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-card p-5">
            <p className="font-mono text-xs tracking-wider text-accent uppercase">Code decides</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Evidence validation, the VM0051 / VM0042 engines, readiness checks and every number in the report are
              deterministic code.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-card p-5">
            <p className="font-mono text-xs tracking-wider text-accent uppercase">AI explains</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              An LLM (Groq, strict JSON output) drafts plain-language explanations from a bounded context. A validator
              rejects drafts with uncited numbers or claims, it fails closed, and a human reviewer has the final say.
            </p>
          </div>
        </div>
        <p>
          Random Forest and XGBoost models trained on Sentinel-1 features act as a second opinion on detected
          irrigation events. They are shown to reviewers but never change a value or mark a rule as compliant.
        </p>
      </Block>

      <Block index="05" title="Results">
        <div className="not-prose mt-2 grid gap-4 sm:grid-cols-2">
          {results.map((r) => (
            <div key={r.label} className="rounded-xl border border-line bg-card p-5">
              <p className="font-mono text-3xl font-semibold text-fg">
                {r.value} <span className="text-base font-normal text-subtle">{r.unit}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.label}</p>
            </div>
          ))}
        </div>
        <p>
          The ML cross-check used 863 labelled plots from a public research dataset (Punjab, India), with 688 for
          training and 172 held out; 5×5 cross-validation gave 66.3% ± 4.2%. Because the labels come from another
          region, the model stays advisory.
        </p>
      </Block>

      <Block index="06" title="What I don't claim">
        <p>Being explicit about limits is part of building something a verifier can trust:</p>
        <ul>
          <li>No AWD field ground truth from Bangladesh yet — that needs a field campaign.</li>
          <li>No browser end-to-end tests or formal evaluation set for the AI explanations yet.</li>
          <li>Software verification is not third-party (VVB) verification, and neither is Verra issuance.</li>
        </ul>
      </Block>

      <Block index="07" title="What I learned">
        <ul>
          <li>
            Keeping AI out of the numbers made the system easier to trust <em>and</em> easier to test — the
            deterministic core could be covered by ordinary unit tests.
          </li>
          <li>
            Freezing inputs into immutable snapshots turned &quot;why did this number change?&quot; from an
            investigation into a diff.
          </li>
          <li>
            A durable job queue was worth building early: satellite queries and LLM calls are slow and flaky, and
            the API stayed responsive regardless.
          </li>
        </ul>
      </Block>

      <Reveal>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card p-6">
          <p className="font-medium">Want to see it running?</p>
          <div className="flex flex-wrap gap-3">
            <ExtLink href="https://terra-audit.vercel.app" primary>
              Open the live app
            </ExtLink>
            <ExtLink href="https://github.com/knah1d/terra-audit">Browse the code</ExtLink>
          </div>
        </div>
      </Reveal>
    </article>
  );
}

function Block({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="mt-16">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="font-mono text-sm text-accent">{index}</span>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
        <div className="space-y-4 leading-relaxed text-muted [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-fg [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul]:marker:text-accent">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function ExtLink({ href, primary, children }: { href: string; primary?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors ${
        primary ? "bg-accent text-accent-fg hover:opacity-90" : "border border-line hover:border-fg/30"
      }`}
    >
      {children}
      <ArrowUpRightIcon className="size-3.5" />
    </a>
  );
}

function Node({ title, sub, accent }: { title: string; sub: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2.5 text-center ${
        accent ? "border-accent/50 bg-accent-soft" : "border-line bg-card"
      }`}
    >
      <p className="text-sm font-medium text-fg">{title}</p>
      <p className="mt-0.5 font-mono text-[11px] text-subtle">{sub}</p>
    </div>
  );
}

function Arrow({ label, left }: { label?: string; left?: boolean }) {
  return (
    <div className="flex items-center justify-center px-1 text-subtle" aria-hidden="true">
      {left && <span className="text-[10px] leading-none">◀</span>}
      <span className="h-px w-3 bg-line" />
      {label && <span className="px-1 font-mono text-[10px] uppercase">{label}</span>}
      <span className="h-px w-3 bg-line" />
      {!left && <span className="text-[10px] leading-none">▶</span>}
    </div>
  );
}

const diagramCols = "grid grid-cols-[1fr_auto_1fr_auto_1.2fr_auto_1fr] items-center";

function ArchitectureDiagram() {
  return (
    <figure className="not-prose my-6 rounded-xl border border-line bg-bg">
      {/* Fixed-width diagram; scrolls inside its box on narrow screens instead of reflowing */}
      <div className="overflow-x-auto p-4 sm:p-6">
        <div className="min-w-[720px]">
          <div className={diagramCols}>
            <Node title="Browser" sub="reviewers · teams" />
            <Arrow label="https" />
            <Node title="Next.js app" sub="Vercel · proxy" />
            <Arrow label="rest" />
            <Node title="FastAPI backend" sub="Railway · Docker" accent />
            <Arrow label="sql" />
            <Node title="PostgreSQL" sub="records · snapshots · jobs" />
          </div>
          <div className={diagramCols}>
            <div className="col-start-5 flex flex-col items-center py-1 text-subtle" aria-hidden="true">
              <span className="h-3 w-px bg-line" />
              <span className="font-mono text-[10px] uppercase">queued jobs</span>
              <span className="h-3 w-px bg-line" />
              <span className="text-[10px] leading-none">▼</span>
            </div>
          </div>
          <div className={diagramCols}>
            <div className="col-start-3">
              <Node title="Google Earth Engine" sub="Sentinel-1 radar" />
            </div>
            <Arrow left />
            <Node title="Python worker" sub="Railway · Docker" accent />
            <Arrow />
            <Node title="Groq LLM" sub="draft explanations" />
          </div>
        </div>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-center text-xs text-subtle">
        The worker calls Earth Engine and the LLM and stores evidence files; the API only queues jobs and reads results.
      </figcaption>
    </figure>
  );
}
