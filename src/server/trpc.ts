import { initTRPC } from "@trpc/server";
// import superjson from "superjson"; // Temporarily disable

// Initialize tRPC
const t = initTRPC.create({
  // transformer: superjson, // Temporarily disable superjson
});

// Export reusable router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
