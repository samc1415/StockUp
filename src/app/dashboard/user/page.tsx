"use client"

import {
  Card,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Rating from "@/components/custom/Rating"
import { Separator } from "@/components/ui/separator"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { SiApple, SiMicrosoft, SiNetflix, SiTesla } from "react-icons/si"

const appleChartData = [
  { month: "January", desktop: 160, mobile: 110 },
  { month: "February", desktop: 220, mobile: 150 },
  { month: "March", desktop: 190, mobile: 180 },
  { month: "April", desktop: 140, mobile: 240 },
  { month: "May", desktop: 180, mobile: 210 },
  { month: "June", desktop: 250, mobile: 130 },
];

const microsoftChartData = [
  { month: "January", desktop: 210, mobile: 95 },
  { month: "February", desktop: 280, mobile: 170 },
  { month: "March", desktop: 230, mobile: 140 },
  { month: "April", desktop: 160, mobile: 190 },
  { month: "May", desktop: 220, mobile: 165 },
  { month: "June", desktop: 240, mobile: 150 },
];

const netflixChartData = [
  { month: "January", desktop: 140, mobile: 170 },
  { month: "February", desktop: 260, mobile: 210 },
  { month: "March", desktop: 180, mobile: 160 },
  { month: "April", desktop: 120, mobile: 230 },
  { month: "May", desktop: 200, mobile: 190 },
  { month: "June", desktop: 170, mobile: 220 },
];

const teslaChartData = [
  { month: "January", desktop: 185, mobile: 140 },
  { month: "February", desktop: 240, mobile: 190 },
  { month: "March", desktop: 220, mobile: 160 },
  { month: "April", desktop: 130, mobile: 220 },
  { month: "May", desktop: 195, mobile: 200 },
  { month: "June", desktop: 210, mobile: 180 },
];


const chartConfig = {
  desktop: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Users() {
  return (
    <>
      <div>
        <div className="mb-10">
          <h2 className="text-lg font-bold md:text-xl">Market Highlights</h2>
          <Separator className="mt-2 mb-4" />
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-[90%] mx-auto"
          >
            <CarouselContent>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div>
                  <Card className="px-3 py-4 shadow-none">
                    <ChartContainer config={chartConfig}>
                      <AreaChart
                        accessibilityLayer
                        data={appleChartData}
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
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          dataKey="mobile"
                          type="natural"
                          fill="url(#fillMobile)"
                          fillOpacity={0.4}
                          stroke="var(--color-mobile)"
                          stackId="a"
                        />
                        <Area
                          dataKey="desktop"
                          type="natural"
                          fill="url(#fillDesktop)"
                          fillOpacity={0.4}
                          stroke="var(--color-desktop)"
                          stackId="a"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </Card>

                  <div className="flex items-center mt-3">
                    <SiApple className="w-10 h-10 p-2 rounded-full mr-2 text-[#afb5b8] dark:text-white border border-[#afb5b8] dark:border-secondary dark:bg-secondary" />
                    <div className="mr-2">
                      <p className="text-sm font-bold">AAPL</p>
                      <p className="text-sm">Apple Inc.</p>
                    </div>
                    <TrendingUp className="text-green-600 h-4 w-4" />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div>
                  <Card className="px-3 py-4 shadow-none">
                    <ChartContainer config={chartConfig}>
                      <AreaChart
                        accessibilityLayer
                        data={microsoftChartData}
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
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          dataKey="mobile"
                          type="natural"
                          fill="url(#fillMobile)"
                          fillOpacity={0.4}
                          stroke="var(--color-mobile)"
                          stackId="a"
                        />
                        <Area
                          dataKey="desktop"
                          type="natural"
                          fill="url(#fillDesktop)"
                          fillOpacity={0.4}
                          stroke="var(--color-desktop)"
                          stackId="a"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </Card>

                  <div className="flex items-center mt-3">
                    <div className="flex justify-center items-center w-10 h-10 rounded-full bg-blue-500 text-white dark:bg-secondary p-2 mr-2">
                      <SiMicrosoft className="w-5 h-5" />
                    </div>
                    <div className="mr-2">
                      <p className="text-sm font-bold">MSFT</p>
                      <p className="text-sm">Microsoft Inc.</p>
                    </div>
                    <TrendingUp className="text-green-600 h-4 w-4" />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div>
                  <Card className="px-3 py-4 shadow-none">
                    <ChartContainer config={chartConfig}>
                      <AreaChart
                        accessibilityLayer
                        data={netflixChartData}
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
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          dataKey="mobile"
                          type="natural"
                          fill="url(#fillMobile)"
                          fillOpacity={0.4}
                          stroke="var(--color-mobile)"
                          stackId="a"
                        />
                        <Area
                          dataKey="desktop"
                          type="natural"
                          fill="url(#fillDesktop)"
                          fillOpacity={0.4}
                          stroke="var(--color-desktop)"
                          stackId="a"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </Card>

                  <div className="flex items-center mt-3">
                    <SiNetflix className="w-10 h-10 rounded-full p-2 mr-2 bg-red-500 dark:bg-secondary" />
                    <div className="mr-2">
                      <p className="text-sm font-bold">NTFX</p>
                      <p className="text-sm">Netflix Inc.</p>
                    </div>
                    <TrendingUp className="text-green-600 h-4 w-4" />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div>
                  <Card className="px-3 py-4 shadow-none">
                    <ChartContainer config={chartConfig}>
                      <AreaChart
                        accessibilityLayer
                        data={teslaChartData}
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
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          dataKey="mobile"
                          type="natural"
                          fill="url(#fillMobile)"
                          fillOpacity={0.4}
                          stroke="var(--color-mobile)"
                          stackId="a"
                        />
                        <Area
                          dataKey="desktop"
                          type="natural"
                          fill="url(#fillDesktop)"
                          fillOpacity={0.4}
                          stroke="var(--color-desktop)"
                          stackId="a"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </Card>

                  <div className="flex items-center mt-3">
                    <SiTesla className="w-10 h-10 rounded-full p-2 mr-2 bg-red-700 text-white dark:bg-secondary" />
                    <div className="mr-2">
                      <p className="text-sm font-bold">TSLA</p>
                      <p className="text-sm">Tesla Inc.</p>
                    </div>
                    <TrendingUp className="text-green-600 h-4 w-4" />
                  </div>
                </div>
              </CarouselItem>

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

        </div>

        <div>
          <Separator className="mt-4 mb-6" />
          <div className="grid auto-rows-min gap-10 md:grid-cols-3">
            <Card className="p-6 flex flex-col gap-4">
              <Rating rating={4} />
              <div>
                <h3 className="text-xl font-semibold">AAPL</h3>
                <p className="text-sm">Applec Inc.</p>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-2"></div>
                <div>
                  <p className="text-sm font-bold">Current Price</p>
                  <p className="text-sm">$150.25</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
              <Rating rating={4} />
              <div>
                <h3 className="text-xl font-semibold">TSLA</h3>
                <p className="text-sm">Tesla Inc.</p>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-2"></div>
                <div>
                  <p className="text-sm font-bold">Current Price</p>
                  <p className="text-sm">$700.50</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
              <Rating rating={3} />
              <div>
                <h3 className="text-xl font-semibold">AMZN</h3>
                <p className="text-sm">Amazon Inc.</p>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-2"></div>
                <div>
                  <p className="text-sm font-bold">Current Price</p>
                  <p className="text-sm">$3,150.00</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

    </>
  )
}