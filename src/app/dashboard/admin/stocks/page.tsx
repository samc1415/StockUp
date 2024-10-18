import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Stocks() {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-bold md:text-3xl">Stock Manager</h1>
            </div>
            <div className="w-full lg:grid lg:grid-cols-2 gap-[15%]">
                <div className="">
                    <h1 className="text-xl font-bold mb-4">Create New Stocks</h1>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Company Name</Label>
                            <Input id="name" placeholder="Value" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ticker">Stock Ticker</Label>
                            <Input id="ticker" placeholder="Value" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="volume">Volume</Label>
                            <Input id="volume" placeholder="Value" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="initial">Initial Price</Label>
                            <Input id="initial" placeholder="Value" required />
                        </div>
                        <Button className="w-full bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32]">
                            Create Stock
                        </Button>
                    </div>
                </div>
                <div className="mt-10 md:mt-0">
                    <h1 className="text-xl font-bold mb-4">Manage Stocks</h1>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Company Name</Label>
                            <Input id="name" placeholder="Value" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ticker">Stock Ticker</Label>
                            <Input id="ticker" placeholder="Value" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="volume">Volume</Label>
                            <Input id="volume" placeholder="Value" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock Price</Label>
                            <Input id="stock" placeholder="Value" required />
                        </div>
                        <div className="flex gap-4">
                            <Button className="w-full bg-[#2e3327] dark:bg-primary dark:hover:bg-primary/90 hover:bg-[#393d32]">
                                Save changes
                            </Button>
                            <Button variant="secondary" className="w-full bg-gray-200/70 dark:bg-secondary dark:hover:bg-secondary/80">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
