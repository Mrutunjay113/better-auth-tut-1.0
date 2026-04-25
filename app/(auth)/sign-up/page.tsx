"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signUpAction } from "@/lib/actions/auth";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { toast } from "sonner";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    undefined,
  );
  console.log(state);
  if (state?.success) {
    toast.success("Sign up successful");
  }
  if (state?.error) {
    toast.error((state.error as any).message);
  }
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={formAction}
            className="flex flex-col items-center justify-center gap-6"
          >
            <Input type="text" name="name" placeholder="Name" required />
            <Input type="email" name="email" placeholder="Email" required />
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="size-4" />
                ) : (
                  <EyeOffIcon className="size-4" />
                )}
              </Button>
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  {" "}
                  <Spinner data-icon="inline-start" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Button variant="link" asChild className="p-0">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
