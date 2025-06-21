"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const userSchema = z
	.object({
		name: z.string(),
		password: z.string(),
		email: z.string().email(),
		verifyEmail: z.string().email(),
	})
	.refine((data) => data.email === data.verifyEmail, {
		message: "Os emails não conferem",
		path: ["verifyEmail"],
	});

type UserProps = z.infer<typeof userSchema>;

export function RegisterForm() {
	const router = useRouter();

	const nameId = useId();
	const emailId = useId();
	const confirmEmailId = useId();
	const passwordId = useId();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserProps>({
		resolver: zodResolver(userSchema),
	});

	const onSubmit = async (formData: UserProps) => {
		const { data, error } = await authClient.signUp.email(
			{
				email: formData.email,
				name: formData.name,
				password: formData.password,
				callbackURL: "/",
			},
			{
				onRequest: () => {},
				onSuccess: (ctx) => {
					alert("Usuário criado com sucesso");
					router.replace("/");
					console.log(ctx.data.token);
				},
				onError: (ctx) => {
					alert("Erro ao cadastrar usuário");
					console.log(ctx.error.message);
				},
			},
		);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-sm"
			>
				<h2 className="text-2xl font-bold text-center">Cadastro</h2>

				<div className="flex flex-col gap-2">
					<label htmlFor={nameId} className="text-sm font-medium">
						Nome
					</label>
					<input
						type="text"
						id={nameId}
						className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
						{...register("name")}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor={emailId} className="text-sm font-medium">
						Email
					</label>
					<input
						type="email"
						id={emailId}
						className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
						{...register("email")}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor={confirmEmailId} className="text-sm font-medium">
						Confirmação de Email
					</label>
					<input
						type="email"
						id={confirmEmailId}
						className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
						{...register("verifyEmail")}
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
					Cadastrar
				</button>

				<div className="mx-auto text-center">
					<p className="text-sm text-gray-600">
						Já possui cadastro?{" "}
						<span className="text-blue-600 cursor-pointer hover:underline">
							<Link href={"/login"}>Clique aqui</Link>
						</span>
					</p>
				</div>
			</form>
		</div>
	);
}
