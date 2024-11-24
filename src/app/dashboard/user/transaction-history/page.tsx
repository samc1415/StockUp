"use client";

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
import { useCookies } from "react-cookie";

type transaction = {
   transactionID: string;
   transactionType: string;
   transactionTime: string;
   targetUser: string;
   targetStock: string;
   targetStockPrice: number;
   targetStockQuantity: number;
};

type Stock = {
   stockID: string;
   displayName: string;
   displayCode: string;
   createDate: string;
   latestPrice: number;
   volume: number;
   openingPrice: number;
};

export default function TransactionHistory() {
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

   const [transactionData, setTransactionData] = useState<transaction[]>([]);
   const [stockData, setStockData] = useState<Stock[]>([]);

   useEffect(() => {
      if (userCookie.UserID) {
         fetchUserData();
         fetchTransactionData(userCookie.UserID);
      }
   }, [userCookie.UserID]);

   const fetchUserData = async () => {
      const url = "https://apiz.zachklimowicz.com/users/" + userCookie.UserID;
      try {
         const response = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         });
         const data = await response.json();
         setUser(data);
      } catch (error) {
         console.error("Failed to fetch user data:", error);
      }
   };

   // Fetch transaction data for the given user
   const fetchTransactionData = async (userID: string) => {
      const url = `https://apiz.zachklimowicz.com/transactions/user/${userID}`;
      try {
         const response = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         });
         const data = await response.json();
         // Filter out transactions with quantity of zero
         const filteredData = data.filter(
            (txn: transaction) => txn.targetStockQuantity > 0
         );
         setTransactionData(filteredData);
         fetchStockInfo(filteredData); // Fetch stock info once filtered transactions are loaded
      } catch (error) {
         console.error("Failed to fetch transaction data:", error);
      }
   };

   // Fetch stock information for each transaction
   const fetchStockInfo = async (transactions: transaction[]) => {
      const stocks: Stock[] = [];
      for (const txn of transactions) {
         const url = `https://apiz.zachklimowicz.com/stocks/${txn.targetStock}`;
         try {
            const response = await fetch(url, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            });
            const stock = await response.json();
            stocks.push(stock);
         } catch (error) {
            console.error(
               `Failed to fetch stock info for ${txn.targetStock}:`,
               error
            );
         }
      }
      setStockData(stocks);
   };

   return (
      <>
         <div className="flex items-center">
            <h1 className="text-lg font-bold md:text-3xl">
               Transaction History
            </h1>
         </div>
         <div>
            <Table className="mt-6">
               <TableHeader>
                  <TableRow>
                     <TableHead>Stock</TableHead>
                     <TableHead className="hidden md:table-cell text-right">
                        Date
                     </TableHead>
                     <TableHead className="hidden md:table-cell text-right">
                        Total Price
                     </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {transactionData.map((txn, index) => {
                     const stock = stockData.find(
                        (s) => s.stockID === txn.targetStock
                     );
                     const totalPrice =
                        txn.targetStockQuantity * txn.targetStockPrice;
                     return (
                        <TableRow key={txn.transactionID}>
                           <TableCell className="font-medium">
                              <div className="flex items-center space-x-2">
                                 {/* White square for the ticker, restoring original size */}
                                 <div className="w-16 h-16 flex items-center justify-center bg-white border border-gray-300 rounded-lg">
                                    <span className="text-black text-sm font-semibold">
                                       {stock?.displayCode ?? txn.targetStock}
                                    </span>
                                 </div>
                                 {/* Stock name to the right of the ticker */}
                                 <div className="flex flex-col ml-4">
                                    <p className="text-lg font-semibold">
                                       {stock?.displayName ?? "Unknown Stock"}
                                    </p>
                                    {/* Bought/Sold information to the right of the stock name */}
                                    <p className="text-sm mt-1">
                                       {txn.transactionType === "buy"
                                          ? `Bought ${
                                               txn.targetStockQuantity
                                            } shares at $${txn.targetStockPrice.toFixed(
                                               2
                                            )}`
                                          : `Sold ${
                                               txn.targetStockQuantity
                                            } shares at $${txn.targetStockPrice.toFixed(
                                               2
                                            )}`}
                                    </p>
                                 </div>
                              </div>
                           </TableCell>
                           <TableCell className="hidden md:table-cell text-right">
                              {new Date(txn.transactionTime).toLocaleString()}
                           </TableCell>
                           <TableCell className="hidden md:table-cell text-right">
                              ${totalPrice.toFixed(2)}
                           </TableCell>
                        </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
            <div className="mt-10 text-xs text-muted-foreground"></div>
         </div>
      </>
   );
}
