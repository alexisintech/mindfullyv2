import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const UserHome = () => {
  const { data: sessionData } = useSession();

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
          <p className="text-2xl italic text-white">
            Hello, {sessionData && sessionData.user.name}
          </p>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => void signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
};

export default UserHome;
