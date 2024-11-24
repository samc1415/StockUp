"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CookiesProvider, useCookies } from "react-cookie";
import md5 from "md5";

const LoginPage = () => {
   const router = useRouter();

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [isFailedAttempt, setFailedAttempt] = useState(false);
   const [tokenCookie, setTokenCookie] = useCookies(["AccessToken"]);
   const [userCookie, setUserCookie] = useCookies(["UserID"]);
   const [admin, setAdmin] = useState(false);

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         const response = await fetch(
            `https://apiz.zachklimowicz.com/login?username=${username}&hash=${md5(
               password
            )}`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );

         if (!response.ok) {
            if (response.status === 400) setFailedAttempt(true);
            throw new Error("Failed to log in");
         }

         const data = await response.json();

         if (Array.isArray(data)) {
            data.forEach((entity) => {
               setTokenCookie("AccessToken", entity.AccessToken);
               setUserCookie("UserID", entity.userID);
            });
         } else {
            setTokenCookie("AccessToken", data.AccessToken);
            setUserCookie("UserID", data.userID);
         }

         if (admin) {
            const userResponse = await fetch(
               `https://apiz.zachklimowicz.com/users/${data.userID}`,
               {
                  method: "GET",
                  headers: {
                     "Content-Type": "application/json",
                  },
               }
            );

            const userData = await userResponse.json();

            // Navigate based on user type
            if (userData.userType === 1) {
               router.push("/dashboard/admin");
            } else {
               router.push("/dashboard/user");
            }
         } else {
            router.push("/dashboard/user");
         }
      } catch (error) {
         console.error("Error during login:", error);
      }
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
                  {isFailedAttempt ? (
                     <p>
                        <b>Incorrect username or password, please try again</b>
                     </p>
                  ) : null}
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
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>
                  <div className="grid gap-2">
                     <Label htmlFor="password">Password</Label>
                     <Input
                        id="password"
                        type="password"
                        aria-label="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>

                  {/* Submit Button */}
                  <Button
                     type="submit"
                     className="w-full"
                     onClick={() => setAdmin(false)}
                  >
                     Login - User
                  </Button>
                  <Button
                     type="submit"
                     className="w-full"
                     onClick={() => setAdmin(true)}
                  >
                     Login - Admin
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
   );
};

export default LoginPage;
