"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type Stock = {
   stockID: string;
   displayName: string;
   displayCode: string;
   createDate: string;
   latestPrice: number;
   volume: number;
};

function StockTable() {
   const [data, setData] = useState<Stock[]>([]);
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

   const saveStock = async (stockID: string, event: React.FormEvent) => {
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

   const deleteStock = async (stockID: string) => {
      if (confirm("Are you sure you want to delete the stock? This cannot be undone.")) {
         const url = `https://apiz.zachklimowicz.com/stocks/delete/${stockID}`;
         try {
            const response = await fetch(url, {
               method: "DELETE",
            });

            if (!response.ok) {
               const message = await response.text();
               alert(message);
               console.log(message);
            } else {
               alert("User " + stockID + " deleted successfully.");
               window.location.reload();
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


export default function Stocks() {
   const [name, setName] = useState("");
   const [ticker, setTicker] = useState("");
   const [vol, setVol] = useState("");
   const [price, setPrice] = useState("");

   const onStockCreate = async (event: any) => {
      event.preventDefault();

      await fetch("https://apiz.zachklimowicz.com/stocks/new", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            DisplayName: name,
            DisplayCode: ticker,
            StartingPrice: price,
            Volume: vol,
         }),
      }).then((response) => {
         if (response.ok) {
            alert("New stock created successfully.");
            return response.json();
         }
         return response
            .text()
            .then((text) => {
               alert(text);
               throw new Error(text);
            })
            .then((data) => {
               console.log("Stock created information:" + JSON.parse(data));
            })
            .catch((error) => console.log(error));
      });
   };

   return (
      <>
         <div className="flex items-center">
            <h1 className="text-lg font-bold md:text-3xl">Stock Manager</h1>
         </div>
         <div className="w-full lg:grid lg:grid-cols-2 gap-[10%] mb-3">
            <div className="mt-10 md:mt-0">
               <h1 className="text-xl font-bold mb-4">Create New Stocks</h1>
               <form id="stockCreate" onSubmit={onStockCreate}>
                  <div className="grid gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="name">Company Name</Label>
                        <Input
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           id="name"
                           placeholder="Company Name"
                           required
                        />
                     </div>
                     <div className="grid gap-2">
                        <Label htmlFor="ticker">Stock Ticker</Label>
                        <Input
                           value={ticker}
                           onChange={(e) => setTicker(e.target.value)}
                           id="ticker"
                           placeholder="Stock Ticker"
                           required
                        />
                     </div>
                     <div className="grid gap-2">
                        <Label htmlFor="volume">Volume</Label>
                        <Input
                           value={vol}
                           onChange={(e) => setVol(e.target.value)}
                           id="volume"
                           placeholder="Volume"
                           type="number"
                           required
                        />
                     </div>
                     <div className="grid gap-2">
                        <Label htmlFor="initial">Initial Price</Label>
                        <Input
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
                           id="initial"
                           placeholder="Initial Price"
                           type="number"
                           required
                        />
                     </div>
                     <Button className="w-full bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32]">
                        Create Stock
                     </Button>
                  </div>
               </form>
            </div>
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
                  <TableBody>{stockTable()}</TableBody>
               </Table>
            </div>
         </div>
      </>
   );
}
