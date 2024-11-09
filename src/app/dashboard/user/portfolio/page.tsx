import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { SiApple, SiTesla } from "react-icons/si"

export default function BuySellStocks() {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-bold md:text-3xl">Your Portfolio</h1>
            </div>
            <div>
                <div className="flex items-center">
                    <div className="mr-3 p-4 w-[64px] h-[64px] bg-[#d9d9d9] dark:bg-white dark:bg-gray-800 aspect-square rounded-md">
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-bold">Cash Balance</h2>
                        <p className="text-sm">$3,200</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <h3 className="font-bold">Table of Holdings</h3>
                    <Input className="rounded-full w-1/2" placeholder="Seach stocks..." />
                </div>
                <Table className="mt-6">
                    <TableHeader className="bg-[#b5b5b5] dark:bg-secondary">
                        <TableRow>
                            <TableHead className="hidden md:table-cell text-primary">
                                Stock Name
                            </TableHead>
                            <TableHead className="text-primary">Ticker</TableHead>
                            <TableHead className="hidden md:table-cell text-primary">
                                Current Price (USD)
                            </TableHead>
                            <TableHead className="hidden md:table-cell text-primary">
                                Volume owned
                            </TableHead>
                            <TableHead className="text-primary">Total Value (USD)</TableHead>
                            <TableHead className="hidden md:table-cell text-primary">
                                % Change (Today)
                            </TableHead>
                            <TableHead className="text-primary">
                                <span>Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                Apple Inc.
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                AAPL
                            </TableCell>
                            <TableCell className="font-medium">
                                $150.25
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                100
                            </TableCell>
                            <TableCell>
                                $15,025
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                +1.2%
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="cursor-pointer">Buy/Sell</DropdownMenuItem>
                                        <Link href="/dashboard/user/portfolio/detail" passHref>
                                            <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                Tesla Inc.
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                TSLA
                            </TableCell>
                            <TableCell className="font-medium">
                                $700.50
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                50
                            </TableCell>
                            <TableCell>
                                $35,025
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                -0.8%
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="cursor-pointer">Buy/Sell</DropdownMenuItem>
                                        <Link href="/dashboard/user/portfolio/detail" passHref>
                                            <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                Amazon Inc.
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                AMZN
                            </TableCell>
                            <TableCell className="font-medium">
                                $3,150.00
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                10
                            </TableCell>
                            <TableCell>
                                $31,500
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                +2.5%
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="cursor-pointer">Buy/Sell</DropdownMenuItem>
                                        <Link href="/dashboard/user/portfolio/detail" passHref>
                                            <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div>
                <h3 className="font-bold mb-3">Available Stocks to Trade</h3>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center">
                        <SiApple className="mr-3 p-4 w-[64px] h-[64px] text-[#afb5b8] dark:text-white border border-[#afb5b8] dark:border-gray-800 dark:bg-gray-800 aspect-square rounded-md" />
                        <div>
                            <h2 className="font-bold">AAPL (Apple Inc.)</h2>
                            <p className="text-sm">Current Price $150.25</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <SiTesla className="mr-3 p-4 w-[64px] h-[64px] aspect-square rounded-md bg-red-700 text-white dark:bg-gray-800" />
                        <div>
                            <h2 className="font-bold">TSLA (Tesla Inc.)</h2>
                            <p className="text-sm">Current Price $150.25</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}