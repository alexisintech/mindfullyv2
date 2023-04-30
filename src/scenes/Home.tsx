import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold italic tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Mind</span>fully
        </h1>
        <Image
          src="/illustration-webp.png"
          width={300}
          height={300}
          alt="illustration of woman reading while sitting on stack of books"
        />
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl italic text-white">Let's grow, today</p>
          <AuthShowcase />
        </div>
      </div>
    </main>
  );
};

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      {sessionData && (
        <Image
          height={100}
          width={100}
          className="rounded-full"
          src={sessionData.user.image as string}
          alt="placeholder"
        />
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Home;
