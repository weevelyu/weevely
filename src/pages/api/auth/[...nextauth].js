import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../../prisma"

export default (req, res) =>
	NextAuth(req, res, {
		providers: [
			Providers.Google({
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			}),
			Providers.GitHub({
				clientId: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
				profile(profile) {
					return {
						id: profile.id.toString(),
						name: profile.name || profile.login,
						email: profile.email,
						image: profile.avatar_url,
					}
				},
			}),
			Providers.Email({
				server: {
					host: process.env.MAIL_HOST,
					port: process.env.MAIL_PORT,
					auth: {
						user: process.env.MAIL_USERNAME,
						pass: process.env.MAIL_PASSWORD,
					},
				},
				from: process.env.MAIL_FROM,
			}),
		],
		pages: {
			signIn: "/signin",
			// 	signOut: "/auth/signout",
			// 	error: "/auth/error",
			// 	verifyRequest: "/auth/verify-request",
			// 	newUser: null,
		},
		events: {
			async signIn(message) {},
			async signOut(message) {},
			async createUser(message) {
				await prisma.calendar.create({
					data: {
						authorId: message.id,
						title: "My calendar",
						main: true,
					},
				})
			},
			async updateUser(message) {},
			async linkAccount(message) {},
			async session(message) {},
			async error(message) {},
		},
		jwt: {
			secret: process.env.JWT_SECRET,
		},
		session: {
			maxAge: 3 * 24 * 60 * 60,
			updateAge: 12 * 60 * 60,
		},
		adapter: PrismaAdapter(prisma),
		database: process.env.DATABASE_URL,
		debug: process.env.NODE_ENV === "development",
		secret: process.env.AUTH_SECRET,
	})
