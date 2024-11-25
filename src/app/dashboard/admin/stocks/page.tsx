"use client";

import { Button } from "@/components/ui/button";
<<<<<<< HEAD
=======
import { Input } from "@/components/ui/input";
>>>>>>> 000b5ee9f74a28345fc2668940fe3f13f0eba48d
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Fragment, useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

<<<<<<< HEAD
// StockTable component
function StockTable() {
   type Stock = {
      stockID: string;
      displayName: string;
      displayCode: string;
      createDate: string;
      latestPrice: number;
      volume: number;
   };

   const [data, setData] = useState<Stock[]>();
=======
type Stock = {
   stockID: string;
   displayName: string;
   displayCode: string;
   createDate: string;
   latestPrice: number;
   volume: number;
};

export default function StockTable() {
   const [data, setData] = useState<Stock[]>([]);
>>>>>>> 000b5ee9f74a28345fc2668940fe3f13f0eba48d
   const [isLoading, setIsLoading] = useState(true);
   const [isEdit, setIsEdit] = useState(false);

   const [stockDisplayName, setStockDisplayName] = useState<string>("");
   const [stockDisplayTick, setStockDisplayTick] = useState<string>("");
   const [stockCurrentPrice, setStockCurrentPrice] = useState<string>("");

   const [isDisplayChange, setIsDisplayChanged] = useState(false);
   const [isTickerChange, setIsTickerChanged] = useState(false);
   const [isPriceChange, setIsPriceChanged] = useState(false);

   const currFormat = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
   });

<<<<<<< HEAD
   const saveStock = async (stockID: String, event: any) => {
=======
   const saveStock = async (stockID: string, event: React.FormEvent) => {
>>>>>>> 000b5ee9f74a28345fc2668940fe3f13f0eba48d
      event.preventDefault();
      const urlDisplayName = `https://apiz.zachklimowicz.com/stock/${stockID}/name?newName=${stockDisplayName}`;
      const urlDisplayCode = `https://apiz.zachklimowicz.com/stock/${stockID}/code?newCode=${stockDisplayTick}`;
      const urlStockPrice = `https://apiz.zachklimowicz.com/stock/${stockID}/price?newPrice=${stockCurrentPrice}`;

      if (isDisplayChange) {
         try {
            const response = await fetch(urlDisplayName, {
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
         setIsDisplayChanged(false);
      }

      if (isTickerChange) {
         try {
            const response = await fetch(urlDisplayCode, {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
            });
            if (!response.ok) {
               const message = await response.text();
               alert("Error during ticker update: " + message);
               throw new Error(message);
            }
         } catch (err) {
            alert(err);
            console.error(err);
         }
         setIsTickerChanged(false);
      }

      if (isPriceChange) {
         try {
            const response = await fetch(urlStockPrice, {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
            });
            if (!response.ok) {
               const message = await response.text();
               alert("Error during pricing update: " + message);
               throw new Error(message);
            }
         } catch (err) {
            alert(err);
            console.error(err);
         }
         setIsPriceChanged(false);
      }
      setIsEdit(false);
      window.location.reload();
   };

<<<<<<< HEAD
   const deleteStock = async (stockID: String, event: any) => {
      if (
         confirm(
            "Are you sure you want to delete the stock? This cannot be undone."
         )
      ) {
         const url = "https://apiz.zachklimowicz.com/stocks/delete/" + stockID;
=======
   const deleteStock = async (stockID: string) => {
      if (confirm("Are you sure you want to delete the stock? This cannot be undone.")) {
         const url = `https://apiz.zachklimowicz.com/stocks/delete/${stockID}`;
>>>>>>> 000b5ee9f74a28345fc2668940fe3f13f0eba48d
         try {
            const response = await fetch(url, {
               method: "DELETE",
            });

            if (!response.ok) {
               const message = await response.text();
               alert(message);
               console.log(message);
            } else {
<<<<<<< HEAD
               alert("Stock " + stockID + " deleted successfully.");
=======
               alert("User " + stockID + " deleted successfully.");
               window.location.reload();
>>>>>>> 000b5ee9f74a28345fc2668940fe3f13f0eba48d
            }
         } catch (err) {
            alert("Stock delete failed");
            console.error(err);
         }
      } else {
         alert("Stock deletion cancelled.");
      }
   };

   useEffect(() => {
      try {
         fetch("https://apiz.zachklimowicz.com/stocks/", {
            method: "GET",
         })
            .then((response) => response.json())
            .then((data) => {
               console.log(data);
               setData(data);
               setIsLoading(false);
            });
      } catch (err) {
         console.error(err);
      }
   }, []);

   if (isLoading) return <span>Loading Data...</span>;
   if (!data) return <span>Data Loading Failed, please refresh the page.</span>;

   return (
      <Fragment key="stockTable">
         {data.map((stock) => (
            <TableRow key={stock.stockID}>
               <TableCell className="table-cell">
                  {isEdit ? (
                     <Input
                        type="text"
                        defaultValue={stock.displayName}
                        id="displayName"
                        onChange={(e) => {
                           setStockDisplayName(e.target.value);
                           setIsDisplayChanged(true);
                        }}
                     />
                  ) : (
                     stock.displayName
                  )}
               </TableCell>
               <TableCell className="table-cell">
                  {isEdit ? (
                     <Input
                        type="text"
                        defaultValue={stock.displayCode}
                        id="displayName"
                        onChange={(e) => {
                           setStockDisplayTick(e.target.value);
                           setIsTickerChanged(true);
                        }}
                     />
                  ) : (
                     stock.displayCode
                  )}
               </TableCell>
               <TableCell className="table-cell">
                  {isEdit ? (
                     <Input
                        type="number"
                        defaultValue={stock.latestPrice}
                        id="displayName"
                        onChange={(e) => {
                           setStockCurrentPrice(e.target.value);
                           setIsPriceChanged(true);
                        }}
                     />
                  ) : (
                     currFormat.format(stock.latestPrice)
                  )}
               </TableCell>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                     </Button>
                  </DropdownMenuTrigger>
                  {!isEdit ? (
                     <DropdownMenuContent align="end">
                        <DropdownMenuItem
                           className="cursor-pointer"
                           onClick={() => {
                              setIsEdit(true);
                           }}
                        >
                           Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                           className="cursor-pointer"
                           onClick={() => {
                              deleteStock(stock.stockID);
                           }}
                        >
                           Delete
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  ) : (
                     <DropdownMenuContent align="end">
                        <DropdownMenuItem
                           className="cursor-pointer"
                           onClick={(e) => saveStock(stock.stockID, e)}
                        >
                           Save
                        </DropdownMenuItem>
                        <DropdownMenuItem
                           className="cursor-pointer"
                           onClick={() => {
                              setIsEdit(false);
                           }}
                        >
                           Cancel
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  )}
               </DropdownMenu>
            </TableRow>
         ))}
      </Fragment>
   );
}

<<<<<<< HEAD
// Main Stocks component
=======

>>>>>>> 000b5ee9f74a28345fc2668940fe3f13f0eba48d
export default function Stocks() {
   return (
      <>
         <div className="flex items-center">
            <h1 className="text-lg font-bold md:text-3xl">Stock Manager</h1>
         </div>
         <div className="w-full lg:grid lg:grid-cols-2 gap-[10%] mb-3">
            <div className="mt-10 md:mt-0">{/* Create New Stocks */}</div>
            <div>
               <h1 className="text-xl font-bold mb-1">Manage Stocks</h1>
               <Table className="mt-6">
                  <TableHeader>
                     <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead className="hidden md:table-cell">
                           Ticker
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                           Last Price
                        </TableHead>
                        <TableHead>
                           <span>Actions</span>
                        </TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     <StockTable />
                  </TableBody>
               </Table>
            </div>
         </div>
      </>
   );
}
