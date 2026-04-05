//

"use server";

import { signIn, signOut } from "@/auth";

export async function login(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),

      redirect: false,
    });

    return response;
  } catch (error) {
    throw new Error("User id or password is incorrect");
    // throw new Error(error.message);
  }
}

//log Out button
export async function logOutButton() {
  await signOut({
    redirectTo: "/login",
  });
}
