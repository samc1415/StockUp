"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useState, useEffect, Fragment, useRef } from "react";
import React from "react";

type stock = {
   stockID: string;
   displayName: string;
   displayCode: string;
   createDate: string;
   latestPrice: number;
   volume: number;
   openingPrice: number;
};

type price = {
   updateID: string;
   stockID: string;
   price: number;
   updateTime: string;
};

const currFormat = new Intl.NumberFormat("en-US", {
   style: "currency",
   currency: "USD",
   minimumFractionDigits: 2,
});

const StockGraph = React.memo(({ Stock }: { Stock: stock }) => {
   const [priceData, setPriceData] = useState<price[]>([]);
   const hasFetched = useRef(false);

   useEffect(() => {
      if (hasFetched.current) return;

      const url = `https://apiz.zachklimowicz.com/prices/history/${Stock.stockID}/day`;
      fetch(url)
         .then((response) => response.json())
         .then((data) => {
            const formattedData = data.map((entry: any) => ({
               date: entry.updateTime,
               time: entry.price,
            }));
            setPriceData(formattedData);
            hasFetched.current = true;
         })
         .catch((err) => console.error("Error fetching price data:", err));
   }, [Stock.stockID]);

   if (priceData.length === 0) return <p>Loading data...</p>;

   console.log(priceData);

   return (
      <Card className="bg-[#eaf1f3] border-none shadow-none dark:bg-gray-900">
         <CardHeader className="flex flex-row p-[7px] mb-[-17px] gap-2 items-center">
            <p className="text-sm">
               {Stock.displayName}{" "}
               <span className="text-muted-foreground">
                  {Stock.displayCode}
               </span>
            </p>
         </CardHeader>
         <ChartContainer
            config={{
               time: {
                  label: "Time",
                  color: "hsl(var(--chart-2))",
               },
            }}
         >
            <AreaChart
               accessibilityLayer
               height={280}
               width={330}
               data={priceData}
               margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
            >
               <defs>
                  <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="time"
                  type="natural"
                  fill="url(#fillTime)"
                  fillOpacity={0.4}
                  stroke="var(--color-time)"
               />
            </AreaChart>
         </ChartContainer>
         <CardHeader className="pb-0">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
         </CardHeader>
         <CardContent className="flex flex-row items-center justify-between space-y-0 ">
            <div className="text-2xl font-bold">
               {currFormat.format(Stock.latestPrice)}
            </div>
            <p className="text-right text-xs text-muted-foreground">
               {Stock.displayCode} <br />
               {currFormat.format(Stock.latestPrice - Stock.openingPrice)}
            </p>
         </CardContent>
      </Card>
   );
});

// Add a display name for better debugging
StockGraph.displayName = "StockGraph";

export default function Dashboard() {
   const [stocks, setStocks] = useState<stock[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setIsLoading(true);
      fetch("https://apiz.zachklimowicz.com/stocks/")
         .then((response) => response.json())
         .then((data) => {
            setStocks(data);
            setIsLoading(false);
         })
         .catch((err) => {
            console.error("Error fetching stock data:", err);
            setIsLoading(false);
         });
   }, []);

   function marketTable() {
      if (isLoading) return <p>Loading data...</p>;
      if (!stocks || stocks.length === 0) return <p>Error loading data...</p>;

      return (
         <Fragment key="marketList">
            {stocks.map((stock) => (
               <div
                  key={stock.stockID + "-card"}
                  className="flex items-center gap-4 px-2 py-2 bg-gray-100 dark:bg-gray-900 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer"
               >
                  <div className="grid gap-1">
                     <p className="text-sm font-semibold leading-none">
                        {stock.displayCode}
                     </p>
                     <p className="text-xs text-muted-foreground">
                        {stock.displayName}
                     </p>
                  </div>
                  <div className="ml-auto">
                     <p className="font-medium text-sm">
                        {currFormat.format(stock.latestPrice)}
                     </p>
                     {stock.latestPrice >= stock.openingPrice ? (
                        <p className="font-medium text-sm text-green-500">
                           {currFormat.format(
                              stock.latestPrice - stock.openingPrice
                           )}
                        </p>
                     ) : (
                        <p className="font-medium text-sm text-red-500">
                           {currFormat.format(
                              stock.latestPrice - stock.openingPrice
                           )}
                        </p>
                     )}
                  </div>
               </div>
            ))}
         </Fragment>
      );
   }

   return (
      <>
         <div className="flex items-center">
            <h1 className="text-lg font-bold md:text-3xl">Dashboard</h1>
         </div>

         <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
               <div className="grid gap-2 grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-3">
                  {stocks.length > 0 && stocks[0] ? (
                     <StockGraph Stock={stocks[0]} />
                  ) : null}
                  {stocks.length > 0 && stocks[1] ? (
                     <StockGraph Stock={stocks[1]} />
                  ) : null}
                  {stocks.length > 0 && stocks[2] ? (
                     <StockGraph Stock={stocks[2]} />
                  ) : null}
               </div>
               <div className="grid gap-2 grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-3"></div>
            </div>

            <div>
               <Card className="mt-0">
                  <CardHeader className="flex-row justify-between items-center">
                     <CardTitle>Market</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                     {marketTable()}
                  </CardContent>
               </Card>
            </div>
         </div>
      </>
   );
}
