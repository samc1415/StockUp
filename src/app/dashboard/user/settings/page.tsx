"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import md5 from "md5";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function AccountSettings() {
   const [tokenCookie, _, removeCookie] = useCookies(["AccessToken"]);
   const [userCookie] = useCookies(["UserID"]);
   const [user, setUser] = useState({
      userID: "",
      displayName: "",
   });
   const [editDisplayName, setEditDisplayName] = useState("");
   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmNewPassword, setConfirmNewPassword] = useState("");
   const router = useRouter();

   // Fetch user data to populate placeholders
   useEffect(() => {
      const fetchUserData = async () => {
         const url = `https://apiz.zachklimowicz.com/users/${userCookie.UserID}`;
         try {
            const response = await fetch(url, {
               method: "GET",
               headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            setUser(data);
            setEditDisplayName(data.displayName);
         } catch (error) {
            console.error("Error fetching user data:", error);
         }
      };
      fetchUserData();
   }, [userCookie.UserID]);

   // Redirect if not authenticated
   useEffect(() => {
      if (!tokenCookie.AccessToken) {
         router.replace("/auth/login");
      }
   }, [tokenCookie.AccessToken, router]);

   const saveDisplayName = async () => {
      const url = `https://apiz.zachklimowicz.com/users/${user.userID}/name?newName=${editDisplayName}`;
      try {
         const response = await fetch(url, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${tokenCookie.AccessToken}`,
            },
         });
         if (!response.ok) {
            throw new Error("Failed to update display name");
         }
         alert("Display name updated successfully");
      } catch (error) {
         console.log(error)
      }
   };

   const savePassword = async () => {
      if (newPassword !== confirmNewPassword) {
         alert("New password and confirmation do not match");
         return;
      }
      const url = `https://apiz.zachklimowicz.com/users/${user.userID}/pass?pass${md5(newPassword)}`;
      try {
         const response = await fetch(url, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
            }),
         });
         if (!response.ok) {
            throw new Error("Failed to update password");
         }
         alert("Password updated successfully");
      } catch (error) {
         console.log(error)
      }
   };

   const handleLogout = () => {
      removeCookie("AccessToken", { path: "/" });
      router.replace("/auth/login");
   };

   return (
      <div className="space-y-6">
         <h1 className="text-lg font-bold md:text-3xl">Account Settings</h1>
         <Card className="mx-auto w-full max-w-xl">
            <CardContent className="pt-6">
               <div className="grid gap-4">
                  <div className="grid gap-2">
                     <Label htmlFor="displayName">Display Name</Label>
                     <Input
                        id="displayName"
                        placeholder={user.displayName}
                        value={editDisplayName}
                        onChange={(e) => setEditDisplayName(e.target.value)}
                        required
                     />
                     <Button onClick={saveDisplayName} className="w-full">
                        Save Display Name
                     </Button>
                  </div>
               </div>
            </CardContent>
         </Card>
         <Card className="mx-auto w-full max-w-xl">
            <CardHeader>
               <CardTitle className="text-lg text-center">
                  Password Change
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid gap-4">
                  <div className="grid gap-2">
                     <Label htmlFor="currentPassword">Current Password</Label>
                     <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                     />
                  </div>
                  <div className="grid gap-2">
                     <Label htmlFor="newPassword">New Password</Label>
                     <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                     />
                  </div>
                  <div className="grid gap-2">
                     <Label htmlFor="confirmNewPassword">
                        Confirm New Password
                     </Label>
                     <Input
                        id="confirmNewPassword"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                     />
                  </div>
                  <Button onClick={savePassword} className="w-full">
                     Save Password
                  </Button>
                  <Button
                     onClick={handleLogout}
                     variant="outline"
                     className="w-full"
                  >
                     Log out
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
