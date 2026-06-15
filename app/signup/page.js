import { Suspense } from "react";
import AuthSignupClient from "./signup";

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthSignupClient />
        </Suspense>
    );
}