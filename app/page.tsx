import Form from "@/components/form";

export default function Home() {
  return (
    <div>
      <main className="container text-center py-10 flex flex-col gap-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Welcome to the TTS Text Generator
        </h1>

        <Form />
      </main>
    </div>
  );
}
