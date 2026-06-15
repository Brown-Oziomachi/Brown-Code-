import { Suspense } from "react";
import FloatingClient from "./chat";

export default function ChatPage() {
    return (
        <>
            <Suspense fallback={null}>
                <FloatingClient />
            </Suspense>
        </>
    );
}