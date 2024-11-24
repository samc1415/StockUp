"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

type Holiday = {
   id: string;
   date: string;
   description: string;
};

type MarketHour = {
   openHour: string;
   closeHour: string;
};

const HolidayCard: React.FC<{ holidays: Holiday[] }> = ({ holidays }) => {
   if (holidays.length === 0) {
      return <p>No holidays available.</p>;
   }

   return (
      <div className="flex flex-col gap-4">
         {holidays.map((holiday) => (
            <div key={holiday.id} className="flex flex-row items-center gap-4">
               <div className="flex justify-center items-center text-3xl p-4 w-[64px] h-[64px] dark:text-secondary border border-[#afb5b8] dark:border-primary dark:bg-primary aspect-square rounded-md">
                  <p>{holiday.date.substring(8, 10)}</p>
               </div>
               <div className="flex flex-col">
                  <h2 className="font-bold">{holiday.description}</h2>
                  <p className="text-sm">
                     {new Date(holiday.date).toLocaleDateString("en-US")}
                  </p>
               </div>
            </div>
         ))}
      </div>
   );
};

const Market: React.FC = () => {
   const [isCreate, setIsCreate] = useState(false);
   const [holidayName, setHolidayName] = useState("");
   const [holidayDate, setHolidayDate] = useState("");
   const [hours, setHours] = useState<MarketHour | null>(null);
   const [loading, setLoading] = useState(true);
   const [holidays, setHolidays] = useState<Holiday[]>([]);
   const [openTime, setOpenTime] = useState("");
   const [closeTime, setCloseTime] = useState("");

   const getTime = async () => {
      setLoading(true); // Start loading Inputs
      try {
         const response = await fetch("https://apiz.zachklimowicz.com/hours", {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         });

         if (response.ok) {
            const data = await response.json();
            setHours({
               openHour: data.starttime,
               closeHour: data.endtime,
            });
         } else {
            console.error("Failed to fetch hours.");
         }
      } catch (err) {
         console.error("Error fetching hours:", err);
      } finally {
         setLoading(false); // Stop loading Inputs
      }
   };

   const setTime = async () => {
      const start =
         new Date().toISOString().split("T")[0] + "T" + openTime + ":00Z";
      const end =
         new Date().toISOString().split("T")[0] + "T" + closeTime + ":00Z";
      const url =
         "https://apiz.zachklimowicz.com/hours?starttime=" +
         start +
         "&endtime=" +
         end;
      try {
         const response = await fetch(url, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
         });

         if (response.ok) {
            alert("Hours set successfully");
         } else {
            alert("Error saving hours, please try again later");
         }
      } catch (err) {
         console.error("Error setting hours:", err);
      }
   };

   const fetchHolidays = async () => {
      try {
         const response = await fetch(
            "https://apiz.zachklimowicz.com/holidays",
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );

         if (response.ok) {
            const data = await response.json();
            setHolidays(data);
         } else {
            console.error("Failed to fetch holidays.");
         }
      } catch (err) {
         console.error("Error fetching holidays:", err);
      }
   };

   const createHoliday = async () => {
      try {
         await fetch("https://apiz.zachklimowicz.com/holidays", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               date: holidayDate,
               description: holidayName,
            }),
         }).then((response) => {
            if (response.ok) {
               setIsCreate(false);
               fetchHolidays();
            }
         });
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      getTime();
      fetchHolidays();
   }, []);

   return (
      <>
         <div className="flex items-center">
            <h1 className="text-lg font-bold md:text-3xl">Market Settings</h1>
         </div>

         <div className="w-[66%]">
            <h1 className="text-xl font-bold mb-4">
               Market Hours and Schedule
            </h1>
            {loading ? (
               <p>Loading market hours...</p>
            ) : (
               <div className="flex gap-1 md:gap-4 flex-col md:flex-row items-center">
                  <Input
                     aria-label="Open Time"
                     className="w-[180px] relative"
                     type="time"
                     defaultValue={hours?.openHour.substring(11) || ""}
                     onChange={(e) => setOpenTime(e.target.value)}
                  />
                  <div className="flex-1 hidden md:block">
                     <Separator />
                  </div>
                  <Input
                     aria-label="Close Time"
                     className="w-[180px] relative"
                     type="time"
                     defaultValue={hours?.closeHour.substring(11) || ""}
                     onChange={(e) => setCloseTime(e.target.value)}
                  />
               </div>
            )}
         </div>

         <div className="w-full lg:grid lg:grid-cols-2 gap-[10%]">
            <div>
               <h1 className="text-xl font-bold mb-4">Holiday Schedule</h1>
               <HolidayCard holidays={holidays} />
               <div className="mt-4">
                  <div className="flex items-center">
                     <div className="flex justify-center items-center text-3xl mr-3 p-4 w-[64px] h-[64px] dark:text-secondary border border-[#afb5b8] dark:border-primary dark:bg-primary aspect-square rounded-md">
                        {isCreate ? (
                           <Button onClick={createHoliday}>Save</Button>
                        ) : (
                           <Button onClick={() => setIsCreate(true)}>
                              New
                           </Button>
                        )}
                     </div>
                     <div className="flex flex-col gap-1">
                        {isCreate ? (
                           <Input
                              type="text"
                              placeholder="Holiday Description"
                              required
                              onChange={(e) => setHolidayName(e.target.value)}
                           />
                        ) : (
                           <h2 className="font-bold">Create A New Holiday</h2>
                        )}

                        {isCreate ? (
                           <Input
                              type="date"
                              aria-label="Holiday Date"
                              required
                              onChange={(e) => setHolidayDate(e.target.value)}
                           />
                        ) : (
                           <p className="text-sm">Click to Create</p>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-10 md:mt-0">
               <h1 className="text-xl font-bold mb-4">Weekend Schedule</h1>
               <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                     <div className="flex justify-center items-center text-2xl mr-3 p-4 w-[64px] h-[64px] bg-[#d9d9d9] dark:bg-primary dark:text-secondary aspect-square rounded-md">
                        <p>Sat</p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <h2 className="font-bold">Saturday</h2>
                        <p className="text-sm">Market Closed</p>
                     </div>
                  </div>
                  <div className="flex items-center">
                     <div className="flex justify-center items-center text-2xl mr-3 p-4 w-[64px] h-[64px] bg-[#d9d9d9] dark:bg-primary dark:text-secondary aspect-square rounded-md">
                        <p>Sun</p>
                     </div>
                     <div className="flex flex-col gap-1">
                        <h2 className="font-bold">Sunday</h2>
                        <p className="text-sm">Market Closed</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="mt-[2rem] w-full flex gap-5 md:gap-10 flex-col md:flex-row">
            <Button
               className="w-full bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d33]"
               onClick={setTime}
            >
               Save Hours
            </Button>
         </div>
      </>
   );
};

export default Market;
