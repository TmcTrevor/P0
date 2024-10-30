import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
          placeholder: 'Enter your email'
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: 'Enter your password'
        }
      },
      async authorize(credentials, req) {
        // Type check the credentials
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Ensure email is a string
        const email = credentials.email as string;
        const password = credentials.password as string;

        // This is a demo authentication - replace with actual database lookup
        const isValidCredentials =
          email === 'demo@gmail.com' && password === 'password123';

        if (isValidCredentials) {
          // Return a properly typed User object
          return {
            id: '1',
            name: 'Demo User',
            email: email,
            image: null // optional
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
