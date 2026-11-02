import type { Metadata } from 'next';
import { StatusPanel } from '@/components/ui/status-panel';
import { serverApiRequest } from '@/services/api/server';
import { endpoints } from '@/services/api/endpoints';

export const metadata: Metadata = { title: 'Projects', robots: { index: false, follow: false } };
type Project = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: string;
  updatedAt: string;
};
export default async function ProjectsPage() {
  let projects: Project[] | undefined;
  try {
    projects = await serverApiRequest<Project[]>(endpoints.projects);
  } catch {}
  return (
    <div>
      <p className="text-accent font-mono text-xs tracking-[.16em] uppercase">Delivery</p>
      <h1 className="font-heading mt-3 text-3xl font-semibold">Projects</h1>
      <div className="mt-8">
        {projects === undefined ? (
          <StatusPanel title="Project service unavailable">
            <p>The protected API could not be reached or configured.</p>
          </StatusPanel>
        ) : projects.length === 0 ? (
          <StatusPanel title="No projects yet" kind="empty">
            <p>
              Projects appear here only after an authorized admin creates and associates a real
              client project. Self-service project posting belongs to a future marketplace phase.
            </p>
          </StatusPanel>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <article key={project.id} className="border-line bg-surface rounded-2xl border p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-heading text-xl font-semibold">{project.name}</h2>
                  <span className="bg-surface-alt text-accent rounded-full px-3 py-1 font-mono text-[10px]">
                    {project.status}
                  </span>
                </div>
                {project.description ? (
                  <p className="text-ink-secondary mt-3">{project.description}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
