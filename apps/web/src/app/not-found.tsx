import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
export default function NotFound() {
  return (
    <main className="bg-canvas grid min-h-screen place-items-center py-20">
      <Container className="text-center">
        <p className="text-accent font-mono text-xs tracking-[.16em] uppercase">404</p>
        <h1 className="font-heading mt-4 text-4xl font-semibold">This route has not launched.</h1>
        <p className="text-ink-secondary mt-4">
          The page may have moved or may not be part of the current LaunchForge phase.
        </p>
        <ButtonLink href="/" className="mt-7">
          Return home
        </ButtonLink>
      </Container>
    </main>
  );
}
