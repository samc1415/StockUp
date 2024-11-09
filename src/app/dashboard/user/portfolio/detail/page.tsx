"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { SiApple } from "react-icons/si"

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]
const chartConfig = {
    desktop: {
        label: "Income",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function Details() {
    return (
        <>
            <div className="flex items-center">
                <h1 className="font-bold">Stock Details</h1>
            </div>
            <div>
                <div className="flex flex-col md:flex-row gap-10 md:gap-[10%]">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm">AAPL (Apple Inc.) Stock Price</p>
                        <h1 className="font-bold text-3xl">$150.25</h1>
                        <p className="text-sm">Today +1.2%</p>
                    </div>
                    <div className="flex-1">
                        <ChartContainer config={chartConfig} className="w-full h-[23rem]">
                            <AreaChart
                                accessibilityLayer
                                data={chartData}
                                height={200}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                                />
                                <Area
                                    dataKey="desktop"
                                    type="linear"
                                    fill="var(--color-desktop)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-desktop)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>

                </div>
                <div className="flex items-center mt-5">
                    <SiApple className="w-12 h-12 p-2 rounded-full mr-2 text-[#afb5b8] dark:text-white border border-[#afb5b8] dark:border-secondary dark:bg-secondary" />
                    <div className="mr-2">
                        <p className="text-sm font-bold">Apple Inc.</p>
                        <p className="text-sm">Apple Inc. is an American Multinational Company...</p>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 mt-6">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-4 lg:grid-cols-5">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 dark:bg:secondary mr-2">
                            </div>
                            <div>
                                <h3 className="font-bold">Volume</h3>
                                <p className="text-sm">75M</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 dark:bg:secondary mr-2">
                            </div>
                            <div>
                                <h3 className="font-bold">Market Cap</h3>
                                <p className="text-sm">75M</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 dark:bg:secondary mr-2">
                            </div>
                            <div>
                                <h3 className="font-bold">High of the Day</h3>
                                <p className="text-sm">75M</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 dark:bg:secondary mr-2">
                            </div>
                            <div>
                                <h3 className="font-bold">Low of the Day</h3>
                                <p className="text-sm">75M</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 dark:bg:secondary mr-2">
                            </div>
                            <div>
                                <h3 className="font-bold">Opening Price</h3>
                                <p className="text-sm">75M</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}