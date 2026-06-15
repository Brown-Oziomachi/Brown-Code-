"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function InteractionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Fetch existing session log packet or start a fresh clean history chain array
      let trail = JSON.parse(
        sessionStorage.getItem("browncode_session_trail") || "[]",
      );
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // 2. Format a structured, uniform data object for the system map
      const stepData = {
        nodePath: pathname,
        time: timestamp,
        isEntry: trail.length === 0,
      };

      // 3. Avoid logging duplicates if the user forces a manual reload on the same view node
      if (trail.length === 0 || trail[trail.length - 1].nodePath !== pathname) {
        trail.push(stepData);
        sessionStorage.setItem(
          "browncode_session_trail",
          JSON.stringify(trail),
        );
      }
    }
  }, [pathname]); // Fires instantly every single time the user clicks to an alternate path

  return null; // This element stays completely invisible to regular platform visitors
}
