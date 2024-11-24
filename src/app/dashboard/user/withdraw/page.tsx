"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function CardWithForm() {
   const router = useRouter();
   const [inputAmount, setInputAmount] = useState(0);
   const [isAuthed, setIsAuthed] = useState(false);
   const [tokenCookie, setTokenCookie] = useCookies(["AccessToken"]);
   const [userCookie, setUserCookie] = useCookies(["UserID"]);
   const [user, setUser] = useState({
      userID: "",
      userType: "",
      username: "",
      displayName: "",
      wallet: 0,
      startingWallet: 0,
   });

   useEffect(() => {
      let url = "https://apiz.zachklimowicz.com/users/" + userCookie.UserID;
      fetch(url, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((response) => response.json())
         .then((data) => {
            setUser(data);
         });
   }, [userCookie]);

   const userWithdraw = async () => {
      if (inputAmount < 0) {
         alert("Unable to deposit negative amounts.");
      } else {
         let newWallet = user.wallet + inputAmount;
         let url =
            "https://apiz.zachklimowicz.com/users/" +
            user.userID +
            "/wallet?newAmount=" +
            newWallet;
         await fetch(url, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
         }).then((response) => {
            if (!response.ok) {
               console.error("Error during deposit: " + response.statusText);
            } else {
               alert("Amount deposited successfully.");
            }
         });
      }
   };

   const currFormat = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
   });

   return (
      <>
         <div className="flex items-center">
            <h1 className="text-lg font-bold md:text-3xl">Withdraw Cash</h1>
         </div>
         <Card className="mb-6">
            <CardContent className="pt-6">
               <form>
                  <div className="grid w-full items-center gap-3">
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Amount</Label>
                        <Input
                           type="number"
                           id="name"
                           placeholder="$"
                           onChange={(e) =>
                              setInputAmount(parseFloat(e.target.value))
                           }
                        />
                     </div>
                     <p className="text-sm">
                        Current Amount: ${currFormat.format(user.wallet)}
                     </p>
                  </div>
               </form>
            </CardContent>
            <CardFooter className="flex justify-between gap-8">
               <Button
                  className="w-full bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32]"
                  onClick={(e) => userWithdraw()}
               >
                  Withdraw
               </Button>
               <Button
                  variant="secondary"
                  className="w-full bg-gray-200/70 dark:bg-secondary dark:hover:bg-secondary/80"
                  onClick={(e) => router.push("/dashboard/user")} // Ensure this is within a client-side environment
               >
                  Cancel
               </Button>
            </CardFooter>
         </Card>
         <Separator />
         <div>
            <h2 className="text-lg font-semibold md:text-lg">
               Transaction Details
            </h2>
            <p className="text-sm">
               Please confirm the amount you wish to deposit. The amount will be
               added to your current balance immediately
            </p>
         </div>
      </>
   );
}
