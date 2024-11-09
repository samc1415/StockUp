import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function Market() {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-bold md:text-3xl">Market Settings</h1>
            </div>
            <div className="w-[72%]">
                <h1 className="text-xl font-bold mb-4">Market Hours and Schedule</h1>
                <div className="flex gap-1 md:gap-4 flex-col md:flex-row items-center">
                    <Select>
                        <SelectTrigger className="w-[180px] relative">
                            <SelectValue placeholder="9:00 AM" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apple">9:00 AM</SelectItem>
                                <SelectItem value="banana">9:01 AM</SelectItem>
                                <SelectItem value="blueberry">9:02 AM</SelectItem>
                                <SelectItem value="grapes">9:03 AM</SelectItem>
                                <SelectItem value="pineapple">9:04 AM</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div className="flex-1 hidden md:block">
                        <Separator />
                    </div>

                    <Select>
                        <SelectTrigger className="w-[180px] relative">
                            <SelectValue placeholder="5:00 PM" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apple">5:00 PM</SelectItem>
                                <SelectItem value="banana">5:01 PM</SelectItem>
                                <SelectItem value="blueberry">5:02 PM</SelectItem>
                                <SelectItem value="grapes">5:03 PM</SelectItem>
                                <SelectItem value="pineapple">5:04 PM</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>
            </div>
            <div className="w-full lg:grid lg:grid-cols-2 gap-[10%]">
                <div className="">
                    <h1 className="text-xl font-bold mb-4">Holiday Schedule</h1>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center">
                            <div className="flex justify-center items-center text-3xl mr-3 p-4 w-[64px] h-[64px] dark:text-secondary border border-[#afb5b8] dark:border-primary dark:bg-primary aspect-square rounded-md">
                                <p>1</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <h2 className="font-bold">New Year’s Day</h2>
                                <p className="text-sm">January 1st</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex justify-center items-center text-3xl mr-3 p-4 w-[64px] h-[64px] bg-blue-300 dark:bg-primary dark:text-secondary aspect-square rounded-md">
                                <p>4</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="font-bold">Independence Day</h2>
                                <p className="text-sm">July 4th</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex justify-center items-center text-3xl mr-3 p-4 w-[64px] h-[64px] bg-red-400 dark:bg-primary dark:text-secondary aspect-square rounded-md">
                                <p>25</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="font-bold">Christmas Day</h2>
                                <p className="text-sm">December 25th</p>
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
                <Button className="w-full bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32]">
                    Save Schedule
                </Button>
                <Button variant="secondary" className="w-full bg-gray-200/70 dark:bg-secondary dark:hover:bg-secondary/80">
                    Cancel
                </Button>
            </div>
        </>
    )
}
