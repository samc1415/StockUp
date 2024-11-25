"use client";

import { Card } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";

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
   stockID: string;
   data: { date: string; price: number }[];
};

type PortfolioEntry = {
   portfolioEntryID: string;
   userID: string;
   stockID: string;
   transactionID: string;
   amount: number;
};

export default function Users() {
   const [isAuthed, setIsAuthed] = useState(false);
   const [tokenCookie] = useCookies(["AccessToken"]);
   const [userCookie] = useCookies(["UserID"]);
   const [portfolio, setPortfolio] = useState<PortfolioEntry[]>([]);
   const [stocks, setStocks] = useState<Stock[]>([]);
   const [priceData, setPriceData] = useState<PriceData[]>([]);
   const router = useRouter();

   // Check user authentication
   useEffect(() => {
      if (!tokenCookie.AccessToken) {
         router.replace("/auth/login");
      } else {
         setIsAuthed(true);
      }
   }, [tokenCookie.AccessToken, router]);

   const fetchPortfolio = async () => {
      try {
         const response = await fetch(
            `https://apiz.zachklimowicz.com/portfolio/${userCookie.UserID}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         if (!response.ok) {
            throw new Error("Data Fetching Failed");
         }
         const data = await response.json();
         setPortfolio(data);
      } catch (error) {
         console.error("Failed to fetch portfolio:", error);
      }
   };

   const fetchAllStocks = async () => {
      try {
         const response = await fetch(`https://apiz.zachklimowicz.com/stocks/`);
         if (!response.ok) {
            throw new Error("Failed to fetch all stocks");
         }
         const data = await response.json();
         setStocks(data); // Set all stocks data
      } catch (error) {
         console.error("Error fetching all stocks:", error);
      }
   };

   const fetchStockPrices = async (stockID: string) => {
      try {
         const response = await fetch(
            `https://apiz.zachklimowicz.com/prices/history/${stockID}/hour`
         );
         if (!response.ok) {
            throw new Error(`Failed to fetch stock price for ID: ${stockID}`);
         }
         const data = await response.json();

         const formattedData = data.map(
            (entry: { updateTime: string; price: number }) => ({
               date: new Date(entry.updateTime).toLocaleTimeString(),
               price: entry.price,
            })
         );
         setPriceData((prevData) => [
            ...prevData.filter((entry) => entry.stockID !== stockID),
            { stockID, data: formattedData },
         ]);
      } catch (error) {
         console.error("Error fetching price data:", error);
      }
   };

   useEffect(() => {
      if (userCookie.UserID) {
         fetchPortfolio(); // Fetch user's portfolio
         fetchAllStocks(); // Fetch all stocks
      }
   }, [userCookie.UserID]);

   useEffect(() => {
      stocks.forEach((stock) => fetchStockPrices(stock.stockID));
   }, [stocks]);

   const getPriceData = (stockID: string) =>
      priceData.find((entry) => entry.stockID === stockID)?.data || [];

   const calculateDailyHighLow = (stockID: string) => {
      const prices = getPriceData(stockID);
      if (!prices.length) return { high: 0, low: 0 };

      const pricesArray = prices.map((entry) => entry.price);
      const high = Math.max(...pricesArray);
      const low = Math.min(...pricesArray);
      return { high, low };
   };

   if (!isAuthed) {
      return null; // Prevent rendering until authentication is verified
   }

   // Filter stocks that are in the user's portfolio for "My Stocks" section
   const portfolioStocks = stocks.filter((stock) =>
      portfolio.some((entry) => entry.stockID === stock.stockID)
   );

   return (
      <div>
         <div className="mb-10">
            <h2 className="text-lg font-bold md:text-xl">Market Highlights</h2>
            <div className="mt-2 mb-4 border-b-2"></div>
            <Carousel opts={{ align: "start" }} className="w-[90%] mx-auto">
               <CarouselContent>
                  {stocks.map((stock) => {
                     const { high, low } = calculateDailyHighLow(stock.stockID);
                     const priceChange = stock.latestPrice - stock.openingPrice;
                     const percentageChange = (
                        (priceChange / stock.openingPrice) *
                        100
                     ).toFixed(2);
                     const isPositive = priceChange > 0;

                     return (
                        <CarouselItem
                           key={stock.stockID}
                           className="md:basis-1/2 lg:basis-1/3"
                        >
                           <Card className="px-3 py-4 shadow-none">
                              <div className="mt-3 flex justify-between items-center">
                                 <div>
                                    <p className="text-2xl font-bold">
                                       {stock.displayCode}
                                    </p>
                                    <p className="text-sm">
                                       {stock.displayName}
                                    </p>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-sm">Latest Price</p>
                                    <p className="text-sm">
                                       ${stock.latestPrice}
                                    </p>
                                    <p className="text-sm">High: ${high}</p>
                                    <p className="text-sm">Low: ${low}</p>
                                 </div>
                              </div>
                              <div className="mt-2 flex justify-end items-center space-x-2">
                                 <div
                                    className={`text-right ${
                                       isPositive
                                          ? "text-green-600"
                                          : "text-red-600"
                                    }`}
                                 >
                                    <p className="text-sm">
                                       {isPositive ? "+" : ""}
                                       {priceChange.toFixed(2)} USD
                                    </p>
                                    <p className="text-sm">
                                       {isPositive ? "+" : ""}
                                       {percentageChange}%
                                    </p>
                                 </div>
                              </div>
                           </Card>
                        </CarouselItem>
                     );
                  })}
               </CarouselContent>
               <CarouselPrevious />
               <CarouselNext />
            </Carousel>
         </div>

         <h2 className="text-lg font-bold md:text-xl">My Stocks</h2>
         <div className="mt-2 mb-4 border-b-2"></div>
         <div className="grid auto-rows-min gap-10 md:grid-cols-3">
            {portfolioStocks.map((stock) => (
               <Card key={stock.stockID} className="p-6 flex flex-col gap-4">
                  <div>
                     <h3 className="text-xl font-semibold">
                        {stock.displayCode}
                     </h3>
                     <p className="text-sm">{stock.displayName}</p>
                  </div>

                  <div className="flex items-center">
                     <div>
                        <p className="text-sm font-bold">Current Price</p>
                        <p className="text-sm">${stock.latestPrice}</p>
                     </div>
                  </div>
                  <ResponsiveContainer width={450} height={200}>
                     <AreaChart
                        data={getPriceData(stock.stockID)}
                        width={450}
                        height={200}
                        margin={{
                           top: 5,
                           right: 0,
                           left: 0,
                           bottom: 5,
                        }}
                     >
                        <defs>
                           <linearGradient
                              id="fillTime"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                           >
                              <stop
                                 offset="5%"
                                 stopColor="var(--color-time)"
                                 stopOpacity={0.8}
                              />
                              <stop
                                 offset="95%"
                                 stopColor="var(--color-time)"
                                 stopOpacity={0.1}
                              />
                           </linearGradient>
                        </defs>

                        <Area
                           type="natural"
                           dataKey="price"
                           stroke="#06402b"
                           fill="#96d9c0"
                        />
                     </AreaChart>
                  </ResponsiveContainer>
               </Card>
            ))}
         </div>
      </div>
   );
}
