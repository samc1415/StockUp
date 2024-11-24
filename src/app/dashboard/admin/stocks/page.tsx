"use client";

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
import { Fragment, useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

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
   const [isLoading, setIsLoading] = useState(true);
   const [isEdit, setIsEdit] = useState(false);

   const [stockDisplayName, setStockDisplayName] = useState(String);
   const [stockDisplayTick, setStockDisplayTick] = useState(String);
   const [stockCurrentPrice, setStockCurrentPrice] = useState(String);

   const [isDisplayChange, setIsDisplayChanged] = useState(false);
   const [isTickerChange, setIsTickerChanged] = useState(false);
   const [isPriceChange, setIsPriceChanged] = useState(false);

   const currFormat = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
   });

   const saveStock = async (stockID: String, event: any) => {
      event.preventDefault();
      let urlDisplayName =
         "https://apiz.zachklimowicz.com/stock/" +
         stockID +
         "/name?newName=" +
         stockDisplayName;
      let urlDisplayCode =
         "https://apiz.zachklimowicz.com/stock/" +
         stockID +
         "/code?newCode=" +
         stockDisplayTick;
      let urlStockPrice =
         "https://apiz.zachklimowicz.com/stock/" +
         stockID +
         "/price?newPrice=" +
         stockCurrentPrice;

      if (isDisplayChange) {
         try {
            const response = await fetch(urlDisplayName, {
               method: "PATCH",
               headers: {
                  ContentType: "application/json",
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
                  ContentType: "application/json",
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
                  ContentType: "application/json",
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

   const deleteStock = async (stockID: String, event: any) => {
      if (
         confirm(
            "Are you sure you want to delete the stock? This cannot be undone."
         )
      ) {
         const url = "https://apiz.zachklimowicz.com/stocks/delete/" + stockID;
         try {
            const response = await fetch(url, {
               method: "DELETE",
            });

            if (!response.ok) {
               const message = await response.text();
               alert(message);
               console.log(message);
            } else {
               alert("Stock " + stockID + " deleted successfully.");
            }
            window.location.reload();
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
                           onClick={(e) => {
                              setIsEdit(true);
                           }}
                        >
                           Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                           className="cursor-pointer"
                           onClick={(e) => {
                              deleteStock(stock.stockID, e);
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
                           onClick={(e) => {
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

// Main Stocks component
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
