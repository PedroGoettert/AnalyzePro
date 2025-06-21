"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";

const userSchema = z.object({
	password: z.string(),
	email: z.string().email(),
});

type UserProps = z.infer<typeof userSchema>;

export default function LoginForm() {
	const router = useRouter();

	const emailId = useId();
	const passwordId = useId();

	const { register, handleSubmit } = useForm<UserProps>({
		resolver: zodResolver(userSchema),
	});

	const onSubmit = async (formData: UserProps) => {
		await authClient.signIn.email(
			{
				email: formData.email,
				password: formData.password,
				callbackURL: "/",
			},
			{
				onRequest: () => {},
				onSuccess: (ctx) => {
					alert("Usuário logado com sucesso");
					router.replace("/");
					console.log(ctx.data.token);
				},
				onError: (ctx) => {
					alert("Email ou Senha errados");
					console.log(ctx.error);
				},
			},
		);
	};

	const signInByGithub = async () => {
		await authClient.signIn.social({
			provider: "github",
		});
	};

	const signInByGoogle = async () => {
		await authClient.signIn.social({
			provider: "google",
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-sm"
			>
				<h2 className="text-2xl font-bold text-center">Login</h2>

				<div className="flex flex-col gap-2">
					<label htmlFor={emailId} className="text-sm font-medium">
						Email
					</label>
					<input
						type="text"
						id={emailId}
						className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
						{...register("email")}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor={passwordId} className="text-sm font-medium">
						Senha
					</label>
					<input
						type="password"
						id={passwordId}
						className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
						{...register("password")}
					/>
				</div>

				<button
					type="submit"
					className="w-full px-4 py-2 font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800"
				>
					Entrar
				</button>

				<Link
					href="/register"
					className="flex justify-center py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
				>
					Registrar
				</Link>

				<div className="flex justify-center gap-2">
					<button
						type="button"
						className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
						onClick={() => signInByGoogle()}
					>
						Login Google
					</button>

					<button
						type="button"
						className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800"
						onClick={() => signInByGithub()}
					>
						Login GitHub
					</button>
				</div>
			</form>
		</div>
	);
}
