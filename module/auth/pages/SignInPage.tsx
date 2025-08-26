"use client";

import { z } from "zod";
import Link from "next/link";
import nookies from "nookies";
import { constant } from "@/lib/constant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAuthSigninMutation } from "@/api/hook/auth/hook";
import { SignInValidationSchema } from "../schema/auth.schema";
import { PAGE_PATHS } from "@/lib/routes/PageRoutes";

const SignInPage = () => {

  const { login, } = useAuthStore()
  const { mutate: userSigninMutate, isPending: isUserSigninPending } = useAuthSigninMutation();

  /// Form handling & validation
  const { handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof SignInValidationSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInValidationSchema),
  });

  /// Form Submission
  const onSubmit = (data: z.infer<typeof SignInValidationSchema>) => {
    userSigninMutate(data, {
      onSuccess: (res) => {

        nookies.set(null, constant.DOC_ACCESS_TOKEN, res.data.token, {
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        });

        login(res.data.user);

      },
    });
  };


  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm">
        <p className="mt-4 text-xl font-bold tracking-tight">Login</p>

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
          {/* <Link
            href="#"
            className="text-sm block underline text-muted-foreground text-center"
          >
            Forgot your password?
          </Link> */}
          <p className="text-sm text-center">
            Don&apos;t have an account?
            <Link
              href={PAGE_PATHS.auth.signUp}
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
