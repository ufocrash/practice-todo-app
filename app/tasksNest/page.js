import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TasksNestApp from "../components/tasksNestApp";

export default async function Page() {
  const session = await getServerSession(authOptions); // 🟢 fără { req: null }

  if (!session) {
    console.log(session);
    redirect("/");
  }

  return <TasksNestApp session={session} />;
}
