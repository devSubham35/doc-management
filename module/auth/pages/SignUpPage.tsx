"use client";

import { z } from "zod";
import Link from "next/link";
import { navRoutes } from "@/lib/navRoutes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogo } from "@/public/icons/google-logo";
import { useAuthSignupMutation } from "@/api/hook/auth/hook";
import { SignUpValidationSchema } from "../schema/auth.schema";

const SignUpPage = () => {

  /// Sign in Mutation
  const { mutateAsync: userSignupMutate, isPending: isUserSignupPending } = useAuthSignupMutation();

  /// Form handling & validation
  const { handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof SignUpValidationSchema>>({
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
    },
    resolver: zodResolver(SignUpValidationSchema),
  });

  /// Form Submission
  const onSubmit = async (data: z.infer<typeof SignUpValidationSchema>) => {
    await userSignupMutate(data);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm">
        <p className="mt-4 text-xl font-bold tracking-tight">
          Sign up for LMS Platform
        </p>

        <Button className="mt-8 w-full gap-3">
          <GoogleLogo />
          Continue with Google
        </Button>

        <div className="my-7 w-full flex items-center justify-center overflow-hidden">
          <Separator />
          <span className="text-sm px-2">OR</span>
          <Separator />
        </div>

        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <Controller
              name="full_name"
              control={control}
              render={({ field }) => (
                <Input type="text" placeholder="Full name" {...field} />
              )}
            />
            {errors.full_name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

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
            loading={isUserSignupPending}
          >
            Sign Up
          </Button>
        </form>

        <p className="mt-5 text-sm text-center">
          Already have an account?
          <Link
            href={navRoutes?.auth?.signIn}
            className="ml-1 underline text-muted-foreground"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
