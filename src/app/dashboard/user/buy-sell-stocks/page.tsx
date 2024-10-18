import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function BuySellStocks() {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-bold md:text-3xl">Buy/Sell Stocks</h1>
            </div>
            <div>
                <Input className="rounded-full w-1/2 ml-auto" placeholder="Seach stocks..." />

                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden md:table-cell">
                                Stock Ticker
                            </TableHead>
                            <TableHead>Price (USD)</TableHead>
                            <TableHead className="hidden md:table-cell">
                                High (Today) (USD)
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Low (Today) (USD)
                            </TableHead>
                            <TableHead>Market Capitalization (USD)</TableHead>
                            <TableHead>
                                <span>Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                AAPL
                            </TableCell>
                            <TableCell className="font-medium">
                                $150.25
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                $152.25
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                1,000,000
                            </TableCell>
                            <TableCell>
                                $150,250,000
                            </TableCell>
                            <TableCell className="gap-5">
                                <Button className="w-full bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32]">Buy/Sell</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                TSLA
                            </TableCell>
                            <TableCell className="font-medium">
                                $700.50
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                $710.50
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                500,000
                            </TableCell>
                            <TableCell>
                                $350,250,000
                            </TableCell>
                            <TableCell>
                                <Button className="w-full bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32]">Buy/Sell</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                AMZN
                            </TableCell>
                            <TableCell className="font-medium">
                                $3,150.00
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                $3,200.00
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                200,000
                            </TableCell>
                            <TableCell>
                                $630,000,000
                            </TableCell>
                            <TableCell>
                                <Button className="w-full bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32]">Buy/Sell</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <Card className="mt-4 w-full">
                <CardContent className="grid gap-4 mt-6">
                    <div className="grid gap-2">
                        <Label htmlFor="shares">Number of Shares</Label>
                        <Input id="shares" placeholder="Value" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="symbol">Stock Symbol</Label>
                        <Input id="symbol" placeholder="Value" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex gap-12">
                        <Button className="w-full bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32]">Confirm</Button>
                        <Button variant="secondary" className="w-full bg-gray-200/70 dark:bg-secondary dark:hover:bg-secondary/80">Cancel</Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}