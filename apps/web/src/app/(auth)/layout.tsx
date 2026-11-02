import { Logo } from '@/components/layout/logo';
import { Container } from '@/components/ui/container';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-canvas min-h-screen">
      <Container className="py-8">
        <Logo />
      </Container>
      {children}
    </main>
  );
}
