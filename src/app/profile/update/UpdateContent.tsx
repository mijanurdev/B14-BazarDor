"use client";

import { useSession } from "@/lib/auth-client";
import UpdateForm from "./UpdateForm";

export default function UpdateContent() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-green-700"></span>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <UpdateForm
      initialName={session.user.name || ""}
      email={session.user.email}
    />
  );
}
