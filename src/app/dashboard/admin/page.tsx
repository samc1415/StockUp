"use client"

import {
  Avatar,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  SiTesla,
  SiApple,
  SiAmazon,
  SiNetflix,
  SiGoogle,
  SiMcdonalds,
  SiWise,
} from "react-icons/si";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";

// export const description =
//   "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action."

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-bold md:text-3xl">Dashboard</h1>
      </div>

      <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-3">
            <Card className="bg-[#eaf1f3] border-none shadow-none dark:bg-gray-900" x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row p-[7px] mb-[-17px] gap-2 items-center">
                <SiApple className="w-7 h-7 p-1 text-white bg-gray-900 dark:bg-transparent dark:border dark:border-[#27272a] rounded-lg" />
                <p className="text-sm">
                  Apple <span className="text-muted-foreground">APPL</span>
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
                  data={[
                    {
                      date: "2024-01-01",
                      time: 8.5,
                    },
                    {
                      date: "2024-01-02",
                      time: 7.2,
                    },
                    {
                      date: "2024-01-03",
                      time: 8.1,
                    },
                    {
                      date: "2024-01-04",
                      time: 6.2,
                    },
                    {
                      date: "2024-01-05",
                      time: 5.2,
                    },
                    {
                      date: "2024-01-06",
                      time: 8.1,
                    },
                    {
                      date: "2024-01-07",
                      time: 7.0,
                    },
                  ]}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="date" hide />
                  <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
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
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    formatter={(value) => (
                      <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                        Time in till cashout
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {value}
                          <span className="font-normal text-muted-foreground">
                            hr
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </AreaChart>
              </ChartContainer>
              <CardHeader className="pb-0">
                <CardTitle className="text-sm font-medium">
                  Current Value
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row items-center justify-between space-y-0 ">
                <div className="text-2xl font-bold">$107.54</div>
                <p className="text-right text-xs text-muted-foreground">
                  APPL <br />
                  +23.41
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#eaf1f3] border-none shadow-none dark:bg-gray-900" x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row p-[7px] mb-[-17px] gap-2 items-center">
                <SiTesla className="w-7 h-7 p-1 text-white bg-gray-900 dark:bg-transparent dark:border dark:border-[#27272a] rounded-lg" />
                <p className="text-sm">
                  Tesla <span className="text-muted-foreground">TSL</span>
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
                  data={[
                    {
                      date: "2024-01-01",
                      time: 3.9,
                    },
                    {
                      date: "2024-01-02",
                      time: 6.4,
                    },
                    {
                      date: "2024-01-03",
                      time: 8.1,
                    },
                    {
                      date: "2024-01-04",
                      time: 5.7,
                    },
                    {
                      date: "2024-01-05",
                      time: 8.1,
                    },
                    {
                      date: "2024-01-06",
                      time: 7.1,
                    },
                    {
                      date: "2024-01-07",
                      time: 9.8,
                    },
                  ]}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="date" hide />
                  <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
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
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    formatter={(value) => (
                      <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                        Time in till cashout
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {value}
                          <span className="font-normal text-muted-foreground">
                            hr
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </AreaChart>
              </ChartContainer>
              <CardHeader className="pb-0">
                <CardTitle className="text-sm font-medium">
                  Current Value
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row items-center justify-between space-y-0 ">
                <div className="text-2xl font-bold">$152.25</div>
                <p className="text-right text-xs text-muted-foreground">
                  TSLA <br />
                  +15.78
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#eaf1f3] border-none shadow-none dark:bg-gray-900" x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row p-[7px] mb-[-17px] gap-2 items-center">
                <SiAmazon className="w-7 h-7 p-1 text-white bg-gray-900 dark:bg-transparent dark:border dark:border-[#27272a] rounded-lg" />
                <p className="text-sm">
                  Amazon <span className="text-muted-foreground">AMZN</span>
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
                  data={[
                    {
                      date: "2024-01-01",
                      time: 6.2,
                    },
                    {
                      date: "2024-01-02",
                      time: 3.6,
                    },
                    {
                      date: "2024-01-03",
                      time: 7.2,
                    },
                    {
                      date: "2024-01-04",
                      time: 7.5,
                    },
                    {
                      date: "2024-01-05",
                      time: 6.7,
                    },
                    {
                      date: "2024-01-06",
                      time: 8.7,
                    },
                    {
                      date: "2024-01-07",
                      time: 9.6,
                    },
                  ]}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="date" hide />
                  <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
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
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    formatter={(value) => (
                      <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                        Time in till cashout
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {value}
                          <span className="font-normal text-muted-foreground">
                            hr
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </AreaChart>
              </ChartContainer>
              <CardHeader className="pb-0">
                <CardTitle className="text-sm font-medium">
                  Current Value
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row items-center justify-between space-y-0 ">
                <div className="text-2xl font-bold">$427.26</div>
                <p className="text-right text-xs text-muted-foreground">
                  AMZN <br />
                  +92.41
                </p>
              </CardContent>
            </Card>
          </div>

          <Card
            className="mt-6 md:mt-0 flex flex-col" x-chunk="charts-01-chunk-1"
          >


            <CardHeader>
              <CardTitle>Evaluation</CardTitle>
              <p className="text-xs text-muted-foreground">
                Total assets
              </p>
              <div className="flex justify-between">
                <div className="flex items-end">
                  <h1 className="text-3xl font-bold mr-2">$49,825
                    <span className="text-base font-base">.82</span>
                  </h1>
                  <div className="flex items-center rounded-sm bg-green-200 dark:bg-transparent dark:border dark:border-gray text-xs p-1 mr-1">
                    <FaArrowUpRightDots className="w-3 h-3 mr-1" />
                    1.9%
                  </div>
                  <div className="flex items-center rounded-sm bg-green-200 dark:bg-transparent dark:border dark:border-gray text-xs p-1">
                    <FaDollarSign className="w-3 h-3" />
                    747.29
                  </div>
                </div>

                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Last 30 days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Stock duration</SelectLabel>
                      <SelectItem value="60">Last 60 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                      <SelectItem value="120">Last 6 months</SelectItem>
                      <SelectItem value="356">Last year</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

              </div>
            </CardHeader>
            <CardContent className="p-0 md:p-6 flex flex-1 items-center">
              <ChartContainer
                config={{
                  resting: {
                    label: "Resting",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="w-full h-64"
              >
                <LineChart
                  accessibilityLayer
                  margin={{
                    left: 14,
                    right: 14,
                    top: 10,
                  }}
                  data={[
                    {
                      date: "2024-01-01",
                      trading: 62,
                    },
                    {
                      date: "2024-01-02",
                      trading: 72,
                    },
                    {
                      date: "2024-01-03",
                      trading: 35,
                    },
                    {
                      date: "2024-01-04",
                      trading: 62,
                    },
                    {
                      date: "2024-01-05",
                      trading: 52,
                    },
                    {
                      date: "2024-01-06",
                      trading: 62,
                    },
                    {
                      date: "2024-01-07",
                      trading: 70,
                    },
                  ]}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity={0.5}
                  />
                  <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        weekday: "short",
                      })
                    }}
                  />
                  <Line
                    dataKey="trading"
                    type="natural"
                    fill="var(--color-resting)"
                    stroke="var(--color-resting)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      fill: "var(--color-resting)",
                      stroke: "var(--color-resting)",
                      r: 4,
                    }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        }}
                      />
                    }
                    cursor={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <Button className="bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32] w-full py-5 mb-4">Create New Stock</Button>
          <Button className="bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32] w-full py-5">Manage Stocks</Button>
          <Card className="mt-6" x-chunk="dashboard-01-chunk-5">
            <CardHeader className="flex-row justify-between items-center">
              <CardTitle>Market</CardTitle>
              <Select>
                <SelectTrigger className="w-[90px]">
                  <SelectValue placeholder="1 day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="120">6 months</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center gap-4 px-2 py-2 bg-gray-100 dark:bg-gray-900 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer">
                <Avatar className="hidden h-9 w-9 sm:flex justify-center items-center bg-blue-500 dark:text-white dark:bg-gray-800">
                  <SiAmazon className="w-7 h-7 p-1" />
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-semibold leading-none">
                    AMZN
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Amazon
                  </p>
                </div>
                <div className="ml-auto">
                  <p className="font-medium text-sm">$854.54</p>
                  <p className="font-medium text-sm text-green-500">+$23.41</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-2 py-2 bg-gray-100 dark:bg-gray-900 rounded-md">
                <Avatar className="hidden h-9 w-9 sm:flex justify-center items-center bg-red-500 dark:text-white dark:bg-gray-800">
                  <SiNetflix className="w-7 h-7 p-1" />
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-semibold leading-none">
                    NTFX
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Neflix
                  </p>
                </div>
                <div className="ml-auto">
                  <p className="font-medium text-sm">$4,378.20</p>
                  <p className="font-medium text-sm text-green-500">+$39.00</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-2 py-2 bg-gray-100 dark:bg-gray-900 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer">
                <Avatar className="hidden h-9 w-9 sm:flex justify-center items-center bg-blue-500 dark:text-white dark:bg-gray-800">
                  <SiGoogle className="text-white w-7 h-7 p-1" />
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-semibold leading-none">
                    GOOGL
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Google
                  </p>
                </div>
                <div className="ml-auto">
                  <p className="font-medium text-sm">$2,753.11</p>
                  <p className="font-medium text-sm text-green-500">+$99.00</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-2 py-2 bg-gray-100 dark:bg-gray-900 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer">
                <Avatar className="hidden h-9 w-9 sm:flex justify-center items-center bg-yellow-500 dark:text-white dark:bg-gray-800">
                  <SiWise className="text-white w-7 h-7 p-1" />
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-semibold leading-none">
                    WSE
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Wise
                  </p>
                </div>
                <div className="ml-auto">
                  <p className="font-medium text-sm">$1,021.31</p>
                  <p className="font-medium text-sm text-red-500">-$299.00</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-2 py-2 bg-gray-100 dark:bg-gray-900 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer">
                <Avatar className="hidden h-9 w-9 sm:flex justify-center items-center bg-red-700 dark:text-white dark:bg-gray-800">
                  <SiMcdonalds className="text-white w-7 h-7 p-1" />
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-semibold leading-none">
                    MCD
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Mcdonald
                  </p>
                </div>
                <div className="ml-auto">
                  <p className="font-medium text-sm">$854.54</p>
                  <p className="font-medium text-sm text-red-500">-$399.00</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  )
}
