import environtment from "@/config/environtment";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authService from "@/services/auth.service";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import { JWT } from "next-auth/jwt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<UserExtended | null> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const result = await authService.login({ email, password });
        const accessToken = result?.data?.data?.access_token;
        const profile = await authService.getProfileWithToken(accessToken);
        const user = profile?.data?.data;

        if (
          accessToken &&
          result.status === 200 &&
          profile.status === 200 &&
          user?.id !== undefined
        ) {
          user.access_token = accessToken;
          return user;
        }

        return null;
      },
    }),
  ],
  secret: environtment.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.access_token = user.access_token;
        token.user = user;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
  (session as SessionExtended).user = (token as JWTExtended).user;
  (session as SessionExtended).access_token = (token as JWTExtended).access_token;
  return session;
}
  }
});
