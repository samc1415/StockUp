import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    SiTesla,
    SiApple,
    SiAmazon,
    SiGoogle,
} from "react-icons/si"
export default function TransactionHistory() {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-bold md:text-3xl">Transaction history</h1>
            </div>
            <div>
                <Input className="rounded-full" placeholder="Seach stocks or Identifier" />

                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="hidden md:table-cell text-right">
                                Date
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="hidden sm:table-cell">
                                <SiApple className="p-4 w-[64px] h-[64px] text-[#afb5b8] dark:text-white border border-[#afb5b8] dark:border-gray-800 dark:bg-gray-800 aspect-square rounded-md" />
                            </TableCell>
                            <TableCell className="font-medium">
                                <h3 className="uppercase font-semibold text-lg">AAPL</h3>
                                <p className="mt-2">Bought 50 shares at $100</p>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-right">
                                2023-07-12 10:42 AM
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden sm:table-cell">
                                <SiGoogle className="p-4 w-[64px] h-[64px] aspect-square rounded-md bg-blue-500 dark:text-white dark:bg-gray-800 text-white" />
                            </TableCell>
                            <TableCell className="font-medium">
                                <h3 className="uppercase font-semibold text-lg">GOOGL</h3>
                                <p className="mt-2">Bought 30 shares at $2800</p>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-right">
                                2023-10-18 03:21 PM
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden sm:table-cell">
                                <SiTesla className="p-4 w-[64px] h-[64px] aspect-square rounded-md bg-red-700 text-white dark:bg-gray-800" />
                            </TableCell>
                            <TableCell className="font-medium">
                                <h3 className="uppercase font-semibold text-lg">TSLA</h3>
                                <p className="mt-2">Sold 5 shares at $700 each</p>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-right">
                                2023-12-25 11:59 PM
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden sm:table-cell">
                                <SiAmazon className="p-4 w-[64px] h-[64px] aspect-square rounded-md bg-blue-500 dark:text-white dark:bg-gray-800"/>
                            </TableCell>
                            <TableCell className="font-medium">
                                <h3 className="uppercase font-semibold text-lg">AMZN</h3>
                                <p className="mt-2">Bought 10 shares at $3300</p>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-right">
                                2023-11-29 08:15 AM
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="mt-10 text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                </div>
            </div>
        </>
    )
}
