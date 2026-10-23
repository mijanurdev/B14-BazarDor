import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <div className="flex justify-center px-4 py-10">
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
