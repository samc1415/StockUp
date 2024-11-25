"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import md5 from "md5";

export function Users() {
   type User = {
      userID: string;
      userType: number;
      username: string;
      displayName: string;
      wallet: number;
      startingWallet: number;
   };

}

export function UserTable() {
   const router = useRouter();
   const [data, setData] = useState<User[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isCreate, setIsCreate] = useState(false);
   const [newUserName, setNewUserName] = useState("");
   const [newUserPassword, setNewUserPassword] = useState("");
   const [newUserDisplay, setNewUserDisplay] = useState("");
   const [newUserRole, setNewUserRole] = useState(0);
   const [newUserWallet, setNewUserWallet] = useState("");

   useEffect(() => {
      fetch("https://apiz.zachklimowicz.com/users")
         .then((response) => response.json())
         .then((data) => {
            setData(data);
            setIsLoading(false);
         });
   }, []);

   const createUser = async () => {
      try {
         const response = await fetch(
            "https://apiz.zachklimowicz.com/users/new",
            {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  Username: newUserName,
                  UserType: newUserRole,
                  DisplayName: newUserDisplay,
                  passHash: md5(newUserPassword),
                  startingWallet: newUserWallet,
               }),
            }
         );

         if (response.ok) {
            alert("User created successfully");
            setIsCreate(false);
            window.location.reload();
         } else {
            const message = await response.text();
            alert(message);
         }
      } catch (error) {
         console.error(error);
         alert("Failed to create user");
      }
   };

   if (isLoading) return <p>Loading...</p>;

   return (
      <>
         <div className="flex items-center">
            <h1 className="text-lg font-bold md:text-3xl">User Management</h1>
         </div>
         <div>
            <Table className="mt-6">
               <TableHeader>
                  <TableRow>
                     <TableHead>ID</TableHead>
                     <TableHead>Username</TableHead>
                     <TableHead>Display Name</TableHead>
                     <TableHead>Role</TableHead>
                     <TableHead>Wallet</TableHead>
                     <TableHead>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {isCreate && (
                     <TableRow>
                        <TableCell>
                           <Input
                              placeholder="Username"
                              onChange={(e) => setNewUserName(e.target.value)}
                           />
                        </TableCell>
                        <TableCell>
                           <Input
                              type="password"
                              placeholder="Password"
                              onChange={(e) =>
                                 setNewUserPassword(e.target.value)
                              }
                           />
                        </TableCell>
                        <TableCell>
                           <Input
                              placeholder="Display Name"
                              onChange={(e) =>
                                 setNewUserDisplay(e.target.value)
                              }
                           />
                        </TableCell>
                        <TableCell>
                           <Button
                              onClick={() =>
                                 setNewUserRole((prev) => (prev === 0 ? 1 : 0))
                              }
                           >
                              {newUserRole === 0 ? "User" : "Admin"}
                           </Button>
                        </TableCell>
                        <TableCell>
                           <Input
                              placeholder="0.00"
                              onChange={(e) => setNewUserWallet(e.target.value)}
                           />
                        </TableCell>
                        <TableCell>
                           <Button onClick={createUser}>Create</Button>
                        </TableCell>
                     </TableRow>
                  )}
                  {data.map((user) => (
                     <TableRow key={user.userID}>
                        <TableCell>{user.userID}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.displayName}</TableCell>
                        <TableCell>
                           <Badge>
                              {user.userType === 0 ? "User" : "Admin"}
                           </Badge>
                        </TableCell>
                        <TableCell>${user.wallet.toFixed(2)}</TableCell>
                        <TableCell>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button size="icon" variant="ghost">
                                    ⋮
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                 <DropdownMenuItem>Edit</DropdownMenuItem>
                                 <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </>
   );
}
