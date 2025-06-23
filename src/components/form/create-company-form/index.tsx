"use client";

import { useId, useTransition } from "react";
import { createCompany } from "@/app/actions/company";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateCompanyForm() {
	const [isPending, startTransition] = useTransition();
	const emailId = useId();
	const nameId = useId();

	return (
		<form
			action={(formData) => {
				startTransition(() => {
					createCompany(formData);
				});
			}}
			className="space-y-6"
		>
			<div className="grid gap-4">
				<div className="grid gap-2">
					<Label htmlFor={nameId}>Nome da Empresa</Label>
					<Input
						id={nameId}
						name="name"
						placeholder="Ex.: Pedro LTDA"
						required
					/>
				</div>

				<div className="grid gap-2">
					<Label htmlFor={emailId}>Email da Empresa</Label>
					<Input
						id={emailId}
						type="email"
						name="email"
						placeholder="empresa@email.com"
						required
					/>
				</div>
			</div>

			<DialogFooter>
				<Button
					type="submit"
					disabled={isPending}
					className="w-full bg-blue-600 hover:bg-blue-700"
				>
					{isPending ? "Cadastrando..." : "Cadastrar Empresa"}
				</Button>
			</DialogFooter>
		</form>
	);
}
