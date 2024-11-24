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
import { MoreHorizontal } from "lucide-react";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import md5 from "md5";

type User = {
   userID: string;
   userType: number;
   username: string;
   displayName: string;
   wallet: number;
   startingWallet: number;
};

export default function UserTable() {
   const router = useRouter();

   const [data, setData] = useState<User[]>([]);
   const [showEdit, setShowEdit] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [isCreate, setIsCreate] = useState(false);
   const [userCreateType, setUserCreateType] = useState("User");
   const [newUserName, setNewUserName] = useState<string>("");
   const [newUserDisplay, setNewUserDisplay] = useState<string>("");
   const [newUserRole, setNewUserRole] = useState<number>(0);
   const [newUserWallet, setNewUserWallet] = useState<string>("");
   const [newUserPassword, setNewUserPassword] = useState<string>("");
   const [editUserDisplayName, setEditUserDisplayName] = useState<string>("");
   const [editUserWallet, setEditUserWallet] = useState<string>("");
   const [hasWalletChanged, setHasWalletChanged] = useState(false);
   const [hasDisplayChanged, setHasDisplayChanged] = useState(false);

   // Deletes a user after confirmation from user
   const deleteUser = async (userID: string) => {
      if (
         confirm(
            "Are you sure you want to delete the user? This cannot be undone."
         )
      ) {
         const url = "https://apiz.zachklimowicz.com/users/delete/" + userID;
         try {
            const response = await fetch(url, {
               method: "DELETE",
            });

            if (!response.ok) {
               const message = await response.text();
               alert(message);
               console.log(message);
            } else {
               alert("User " + userID + " deleted successfully.");
            }
         } catch (err) {
            alert("User delete failed");
            console.error(err);
         }
         window.location.reload();
      } else {
         alert("User deletion cancelled.");
      }
   };

   // Creates a new user on create action on table
   const createUser = async () => {
      try {
         const response = await fetch(
            "https://apiz.zachklimowicz.com/users/new",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  Username: newUserName,
                  UserType: newUserRole,
                  DisplayName: newUserDisplay,
                  passHash: md5(newUserPassword),
                  startingWallet: newUserWallet,
               }),
            }
         );

         if (!response.ok) {
            const message = await response.text();
            alert(message);
            console.log(message);
         } else {
            alert("New user " + newUserDisplay + " created successfully.");
         }
      } catch (err) {
         alert("User create failed");
         console.error(err);
      }

      setIsCreate(false);
      window.location.reload();
   };

   // Saves an edit action
   const saveUserChanges = async (userID: string) => {
      const urlWallet =
         "https://apiz.zachklimowicz.com/users/" +
         userID +
         "/wallet?newAmount=" +
         editUserWallet;
      const urlDisplay =
         "https://apiz.zachklimowicz.com/users/" +
         userID +
         "/name?newName=" +
         editUserDisplayName;

      if (hasWalletChanged) {
         try {
            const response = await fetch(urlWallet, {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
            });
            if (!response.ok) {
               const message = await response.text();
               alert("Error during wallet amount update: " + message);
               throw new Error(message);
            }
         } catch (err) {
            alert(err);
            console.error(err);
         }
         setHasWalletChanged(false);
      }

      if (hasDisplayChanged) {
         try {
            const response = await fetch(urlDisplay, {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
            });
            if (!response.ok) {
               const message = await response.text();
               alert("Error during display name update: " + message);
               throw new Error(message);
            }
         } catch (err) {
            alert(err);
            console.error(err);
         }
         setHasDisplayChanged(false);
      }

      setShowEdit(false);
      window.location.reload();
   };

   // Converter for regular number to decimal
   const currFormat = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
   });

   // Switch and represent for admin (1) and normal user (0)
   function userTypeSwitch() {
      if (userCreateType.localeCompare("User") === 0) {
         setUserCreateType("Admin");
         setNewUserRole(1);
      } else {
         setUserCreateType("User");
         setNewUserRole(0);
      }
   }

   useEffect(() => {
      fetch("https://apiz.zachklimowicz.com/users", {
         method: "GET",
      })
         .then((response) => response.json())
         .then((data) => {
            setData(data);
            setIsLoading(false);
         });
   }, []);

   if (isLoading) return <TableRow>Loading Data...</TableRow>;
   if (!data) return <p>Error loading data</p>;

   return (
      <Fragment>
         {isCreate ? (
            <TableRow key="createUser">
               <TableCell className="font-medium">
                  <Input
                     type="text"
                     placeholder="Username"
                     id="create_username"
                     onChange={(e) => setNewUserName(e.target.value)}
                  />
               </TableCell>
               <TableCell className="hidden md:table-cell">
                  <Input
                     type="password"
                     placeholder="Password"
                     id="create_password"
                     onChange={(e) => setNewUserPassword(e.target.value)}
                  />
               </TableCell>
               <TableCell className="hidden md:table-cell">
                  <Input
                     type="text"
                     placeholder="Display Name"
                     id="create_displayName"
                     onChange={(e) => setNewUserDisplay(e.target.value)}
                  />
               </TableCell>
               <TableCell className="hidden md:table-cell">
                  <Button onClick={userTypeSwitch}>{userCreateType}</Button>
               </TableCell>
               <TableCell className="hidden md:table-cell">
                  <Input
                     type="number"
                     placeholder="0.00"
                     id="create_wallet"
                     onChange={(e) => setNewUserWallet(e.target.value)}
                  />
               </TableCell>
               <TableCell className="hidden md:table-cell">
                  <Button onClick={createUser}>Create</Button>
               </TableCell>
            </TableRow>
         ) : null}

         {data.map((value) => {
            return (
               <TableRow key={value.userID}>
                  <TableCell className="font-medium">{value.userID}</TableCell>
                  <TableCell className="hidden md:table-cell">
                     {value.username}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                     {showEdit ? (
                        <Input
                           type="text"
                           defaultValue={value.displayName}
                           id="displayName"
                           onChange={(e) => {
                              setEditUserDisplayName(e.target.value);
                              setHasDisplayChanged(true);
                           }}
                        />
                     ) : (
                        value.displayName
                     )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                     <Badge variant="outline">
                        {value.userType == 0 ? "User" : "Admin"}
                     </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                     {showEdit ? (
                        <Input
                           type="number"
                           defaultValue={value.wallet}
                           onChange={(e) => {
                              setEditUserWallet(e.target.value);
                              setHasWalletChanged(true);
                           }}
                        />
                     ) : (
                        <span>{currFormat.format(value.wallet)}</span>
                     )}
                  </TableCell>
                  <TableCell>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                           >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                           </Button>
                        </DropdownMenuTrigger>
                        {!showEdit ? (
                           <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                 className="cursor-pointer"
                                 onClick={(e) => setIsCreate(true)}
                              >
                                 Create
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                 className="cursor-pointer"
                                 onClick={(e) => setShowEdit(true)}
                              >
                                 Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                 className="cursor-pointer"
                                 onClick={(e) => deleteUser(value.userID, e)}
                              >
                                 Delete
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        ) : (
                           <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                 className="cursor-pointer"
                                 onClick={(e) =>
                                    saveUserChanges(value.userID, e)
                                 }
                              >
                                 Save
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 className="cursor-pointer"
                                 onClick={(e) => setShowEdit(false)}
                              >
                                 Cancel
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        )}
                     </DropdownMenu>
                  </TableCell>
               </TableRow>
            );
         })}
      </Fragment>
   );
}

export default function Users() {
   return (
      <>
         <div className="flex items-center">
            <h1 className="text-lg font-bold md:text-3xl">User Management</h1>
         </div>
         <div>
            <Table className="mt-6">
               <TableHeader>
                  <TableRow>
                     <TableHead className="hidden md:table-cell">ID</TableHead>
                     <TableHead>Username</TableHead>
                     <TableHead className="hidden md:table-cell">
                        Display Name
                     </TableHead>
                     <TableHead className="hidden md:table-cell">
                        Role
                     </TableHead>
                     <TableHead>Wallet</TableHead>
                     <TableHead>
                        <span>Actions</span>
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>{userTable()}</TableBody>
            </Table>
         </div>
      </>
   );
}
