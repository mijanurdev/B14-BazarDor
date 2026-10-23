import { Suspense } from "react";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex justify-center px-4 py-10">
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
