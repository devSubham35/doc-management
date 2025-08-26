"use client";

import { z } from "zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { navRoutes } from "@/lib/navRoutes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogo } from "@/public/icons/google-logo";
import { useAuthSigninMutation } from "@/api/hook/auth/hook";
import { SignInValidationSchema } from "../schema/auth.schema";

const SignInPage = () => {

  /// Sign in Mutation
  const { mutateAsync: userSigninMutate, isPending: isUserSigninPending } = useAuthSigninMutation();

  /// Form handling & validation
  const { handleSubmit, control, formState: { errors }} = useForm<z.infer<typeof SignInValidationSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInValidationSchema),
  });

  /// Form Submission
  const onSubmit = async (data: z.infer<typeof SignInValidationSchema>) => {
    await userSigninMutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm">
        <p className="mt-4 text-xl font-bold tracking-tight">Login</p>

        {/* Google Button */}
        <Button className="mt-8 w-full gap-3">
          <GoogleLogo />
          Continue with Google
        </Button>

        <div className="my-7 w-full flex items-center justify-center overflow-hidden">
          <Separator />
          <span className="text-sm px-2">OR</span>
          <Separator />
        </div>

        {/* Form */}
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input type="email" placeholder="Email" {...field} />
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input type="password" placeholder="Password" {...field} />
              )}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-4 w-full"
            loading={isUserSigninPending}
          >
            Sign In
          </Button>
        </form>

        {/* Links */}
        <div className="mt-5 space-y-5">
          <Link
            href="#"
            className="text-sm block underline text-muted-foreground text-center"
          >
            Forgot your password?
          </Link>
          <p className="text-sm text-center">
            Don&apos;t have an account?
            <Link
              href={navRoutes?.auth?.signUp}
              className="ml-1 underline text-muted-foreground"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
