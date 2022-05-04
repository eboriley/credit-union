import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { url } from "../../../config/url";

const login = async (staff_id, password) => {
  const res = await fetch(`${url}/login`, {
    body: JSON.stringify({
      staff_id: staff_id,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const result = await res.json();
  console.log(result);
  return result;
};

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials, req) {
        // const getUser = async () => {
        //   if (
        //     credentials.username === "jsmith" &&
        //     credentials.password === "monkey"
        //   ) {
        //     return { id: 1, name: "J Smith", email: "jsmith@gmail.com" };
        //   } else return null;
        // };
        const user = await login(credentials.username, credentials.password);
        console.log(user);
        //console.log(credentials);
        //const user = { id: 1, name: "J SMith", email: "jsmith@gmail.com" };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
});
