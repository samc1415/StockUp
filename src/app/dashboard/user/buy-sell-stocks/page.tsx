"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { useCookies } from "react-cookie";

type Stock = {
   stockID: string;
   displayName: string;
   displayCode: string;
   createDate: string;
   latestPrice: number;
   volume: number;
   openingPrice: number;
};

type PriceData = {
   updateID: string;
   stockID: string;
   price: number;
   updateTime: string;
};

export default function BuySellStocks() {
   const [stocks, setStocks] = useState<Stock[]>([]);
   const [priceData, setPriceData] = useState<Record<string, PriceData[]>>({});
   const [searchQuery, setSearchQuery] = useState("");
   const [showModal, setShowModal] = useState(false);
   const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
   const [transactionAction, setTransactionAction] = useState<"buy" | "sell">("buy");
   const [quantity, setQuantity] = useState(1);
   const [isAmountConfirmed, setIsAmountConfirmed] = useState(false);
   const [confirmationTime, setConfirmationTime] = useState(60);
   const [userCookie] = useCookies(["UserID"]);

   // Fetch stock list from API
   const fetchStocks = async () => {
      try {
         const response = await fetch("https://apiz.zachklimowicz.com/stocks");
         if (!response.ok) throw new Error("Failed to fetch stocks.");
         const data: Stock[] = await response.json();
         setStocks(data);
      } catch (error) {
         console.error("Error fetching stocks:", error);
      }
   };

   // Fetch and process price data
   const fetchPriceData = async (stockID: string) => {
      try {
         const response = await fetch(
            `https://apiz.zachklimowicz.com/prices/history/${stockID}/day`
         );
         if (!response.ok) throw new Error("Failed to fetch price data.");
         const data: PriceData[] = await response.json();

         // Store price data as-is for the stock
         setPriceData((prev) => ({
            ...prev,
            [stockID]: data,
         }));
      } catch (error) {
         console.error(`Error fetching price data for ${stockID}:`, error);
      }
   };

   const calculateHighLow = (prices: PriceData[]) => {
      if (prices.length === 0) return { high: null, low: null };

      const high = Math.max(...prices.map((entry) => entry.price));
      const low = Math.min(...prices.map((entry) => entry.price));
      return { high, low };
   };

   const handleBuy = (stock: Stock) => {
      setSelectedStock(stock);
      setTransactionAction("buy");
      setShowModal(true);
      resetConfirmation();
   };

   const handleSell = (stock: Stock) => {
      setSelectedStock(stock);
      setTransactionAction("sell");
      setShowModal(true);
      resetConfirmation();
   };

   const handleConfirmAmount = () => {
      setIsAmountConfirmed(true);
   };

   const handleConfirmTransaction = async () => {
      if (!selectedStock) return;

      const transactionData = {
         stockID: selectedStock.stockID,
         quantity,
         action: transactionAction,
         price: selectedStock.latestPrice,
         userID: userCookie.UserID,
      };

      try {
         const response = await fetch(
            `https://apiz.zachklimowicz.com/transactions/${transactionAction}`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(transactionData),
            }
         );
         if (!response.ok) throw new Error("Transaction failed.");
         alert(`Transaction ${transactionAction} completed successfully!`);
      } catch (error) {
         console.error(`Error completing transaction:`, error);
      } finally {
         setShowModal(false);
         resetConfirmation();
      }
   };

   const resetConfirmation = () => {
      setIsAmountConfirmed(false);
      setConfirmationTime(60);
   };

   useEffect(() => {
      fetchStocks();
   }, []);

   useEffect(() => {
      stocks.forEach((stock) => {
         if (!priceData[stock.stockID]) fetchPriceData(stock.stockID);
      });
   }, [stocks, priceData]);

   // Countdown for modal confirmation
   useEffect(() => {
      if (showModal && isAmountConfirmed) {
         const timer = setInterval(() => {
            setConfirmationTime((prev) => {
               if (prev === 0) {
                  clearInterval(timer);
                  setShowModal(false);
                  alert("Transaction timed out. Please try again.");
                  return 0;
               }
               return prev - 1;
            });
         }, 1000);

         return () => clearInterval(timer);
      }
   }, [showModal, isAmountConfirmed]);

   const filteredStocks = stocks.filter((stock) =>
      stock.displayName.toLowerCase().includes(searchQuery.toLowerCase())
   );

   return (
      <div>
         <h1>Buy & Sell Stocks</h1>
         <Input
            type="text"
            placeholder="Search stocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
         />
         <Table>
            <TableHeader>
               <TableRow>
                  <TableCell>Stock Name</TableCell>
                  <TableCell>Latest Price</TableCell>
                  <TableCell>Actions</TableCell>
               </TableRow>
            </TableHeader>
            <TableBody>
               {filteredStocks.map((stock) => (
                  <TableRow key={stock.stockID}>
                     <TableCell>{stock.displayName}</TableCell>
                     <TableCell>{stock.latestPrice}</TableCell>
                     <TableCell>
                        <Button onClick={() => handleBuy(stock)}>Buy</Button>
                        <Button onClick={() => handleSell(stock)}>Sell</Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         {showModal && selectedStock && (
            <div>
               <h2>{transactionAction === "buy" ? "Buy" : "Sell"} {selectedStock.displayName}</h2>
               <p>Price: {selectedStock.latestPrice}</p>
               <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
               />
               <Button onClick={handleConfirmAmount}>Confirm Amount</Button>
               {isAmountConfirmed && (
                  <div>
                     <p>Confirming in {confirmationTime} seconds...</p>
                     <Button onClick={handleConfirmTransaction}>Confirm Transaction</Button>
                  </div>
               )}
            </div>
         )}
      </div>
         /* Confirmation Modal */
         {showModal && (
            <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
               <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-black">
                     {transactionAction === "buy" ? "Buy Stock" : "Sell Stock"}
                  </h3>
                  <p className="mt-2 text-black">Enter the amount</p>
                  <Input
                     type="number"
                     value={quantity}
                     onChange={(e) => setQuantity(Number(e.target.value))}
                     min="1"
                     max={
                        transactionAction === "buy"
                           ? undefined
                           : selectedStock?.volume
                     }
                     className="text-black"
                  />
                  <div className="mt-4 flex flex-col gap-2">
                     {isAmountConfirmed ? (
                        <span className="text-black">
                           Time Remaining: {confirmationTime}s
                        </span>
                     ) : (
                        <Button onClick={handleConfirmAmount}>
                           Confirm Amount
                        </Button>
                     )}
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                     <Button
                        variant="ghost"
                        onClick={() => setShowModal(false)}
                        className="w-full text-black"
                     >
                        Cancel
                     </Button>
                     <Button
                        onClick={handleConfirmTransaction}
                        className="w-full"
                        disabled={!isAmountConfirmed}
                     >
                        Confirm Transaction
                     </Button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
