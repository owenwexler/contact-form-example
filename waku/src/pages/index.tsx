import { Suspense } from "react";
import ContactForm from "../components/ContactForm";

export default async function HomePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000] to-[#333] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Suspense fallback={<h1 className="text-3xl font-bold">Loading...</h1>}>
          <ContactForm />
        </Suspense>
      </div>
    </main>

  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
