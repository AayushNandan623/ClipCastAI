import { DefaultSession } from "next-auth";

// This file is only used when using type script
declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}
