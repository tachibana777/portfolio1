import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-16rem)] w-[min(100%-2rem,720px)] pt-12 sm:pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
