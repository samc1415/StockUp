import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function CardWithForm() {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-bold md:text-3xl">Deposit Cash</h1>
            </div>
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <form>
                        <div className="grid w-full items-center gap-3">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Amount</Label>
                                <Input id="name" placeholder="$" />
                            </div>
                            <p className="text-sm">Current Amount: $3200</p>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between gap-8">
                    <Button className="w-full bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32]">
                        Deposit
                    </Button>
                    <Button variant="secondary" className="w-full bg-gray-200/70 dark:bg-secondary dark:hover:bg-secondary/80">
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
            <Separator />
            <div>
                <h2 className="text-lg font-semibold md:text-lg">Transaction Details</h2>
                <p className="text-sm">Please confirm the amount you wish to deposit. The amount will be added to your current balance immediately</p>
            </div>
        </>
    )
}
