import { Suspense } from "react";
import AuthLoginClient from "./signin";

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthLoginClient />
        </Suspense>
    );
}