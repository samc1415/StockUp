"use client"
import Image from "next/image"
import { useRouter } from "next/navigation";
import Link from "next/link"
import { FormEvent } from "react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// export const description =
//     "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

const LoginPage = () => {
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      router.push("/dashboard/admin");
    };

    return (
        <>
            {/* Cover Image Column (Visible only on large screens) */}
            <div className="hidden bg-muted lg:block relative">
                <Image
                    src="https://res.cloudinary.com/dc3apwy48/image/upload/f_auto,q_auto/huhv2r6sdg59xfdhedtb"
                    alt="Stock market trading illustration"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    priority
                />
                <div className="absolute top-1/2 right-[-7.5rem] transform -translate-y-1/2 h-[15rem] w-[15rem]">
			<Image
			    src="https://res.cloudinary.com/dc3apwy48/image/upload/v1728232297/fhufadv9rmp8sj2almyt.jpg"
			    alt="Stock market trading illustration"
			    width="500"
			    height="500"
			    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale shadow-[0_0_5px_rgba(0,0,0,0.5)] rounded-lg"
			    priority
			/>
                </div>
            </div>
            {/* Login Form Column */}
            <div className="flex items-center justify-center py-12 lg:col-span-2">
                <div className="mx-auto grid gap-6">
                    {/* Form Header */}
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                aria-label="Email address"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                aria-label="Password"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>

                    {/* Sign-up Link */}
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
