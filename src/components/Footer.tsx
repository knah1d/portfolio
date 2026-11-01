import { site } from "@/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-subtle sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with Next.js and Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <a href={site.github} aria-label="GitHub" className="transition-colors hover:text-fg">
            <GitHubIcon className="size-4" />
          </a>
          <a href={site.linkedin} aria-label="LinkedIn" className="transition-colors hover:text-fg">
            <LinkedInIcon className="size-4" />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email" className="transition-colors hover:text-fg">
            <MailIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
