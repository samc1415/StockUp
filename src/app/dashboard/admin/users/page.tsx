import { Badge } from "@/components/ui/badge"
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

export default function Users() {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-bold md:text-3xl">User Management</h1>
            </div>
            <div>
                <Input className="rounded-full w-1/2 ml-auto" placeholder="Seach stocks..." />

                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden md:table-cell">
                                ID
                            </TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Email
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Role
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>
                                <span>Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                1
                            </TableCell>
                            <TableCell className="font-medium">
                                Hazelbear
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                hazelbear@gmail.com
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                Customer
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">Active</Badge>
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
                                        <DropdownMenuItem className="cursor-pointer">Create</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                2
                            </TableCell>
                            <TableCell className="font-medium">
                                BrokerMan
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                brokerman@gmail.com
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                Customer
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">Active</Badge>
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
                                        <DropdownMenuItem className="cursor-pointer">Create</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                3
                            </TableCell>
                            <TableCell className="font-medium">
                                Danielson
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                danielson@gmail.com
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                Customer
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">Active</Badge>
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
                                        <DropdownMenuItem className="cursor-pointer">Create</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                4
                            </TableCell>
                            <TableCell className="font-medium">
                                Johnson
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                johnson@gmail.com
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                Customer
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">Draft</Badge>
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
                                        <DropdownMenuItem className="cursor-pointer">Create</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                5
                            </TableCell>
                            <TableCell className="font-medium">
                                Okiemute
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                okiemute@gmail.com
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                Customer
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">Active</Badge>
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
                                        <DropdownMenuItem className="cursor-pointer">Create</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden md:table-cell">
                                6
                            </TableCell>
                            <TableCell className="font-medium">
                                Jackson
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                jackson@gmail.com
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                Customer
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">Active</Badge>
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
                                        <DropdownMenuItem className="cursor-pointer">Create</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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