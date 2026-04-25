"use server";

import { headers } from "next/headers";
import { auth } from "../auth/auth";
import { redirect } from "next/navigation";

export async function signUpAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
      headers: await headers(),
    });
    redirect("/");
  } catch (error) {
    console.error(error);
    return { error: error, success: false };
  }
}

export async function signInAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const user = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });
    redirect("/");
  } catch (error) {
    return { error: error, success: false };
  }
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/sign-in");
}
