import SignIn from "@/components/auth/sign-in";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div>
        <p>Not signed in</p>
        <SignIn />
      </div>
    );
  }

  if (session.user) {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
      </div>
    );
  }

  return (
    <div>
      <p>Signing in...</p>
    </div>
  );
}
