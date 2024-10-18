import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-bold md:text-3xl">Account Settings</h1>
            </div>
            <Card className="mx-auto w-full md-w-[60%] lg-w-[80%] max-w-xl">
                <CardContent className="pt-6">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Full name</Label>
                            <Input
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@doe.com"
                                required
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0 shadow-none mx-auto w-full md-w-[60%] lg-w-[80%] max-w-xl">
                <CardHeader>
                    <CardTitle className="text-lg text-center">Password Change</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Current Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Confirm New Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <Button type="submit" className="w-full">
                            Save Changes
                        </Button>
                        <Button variant="outline" className="w-full">
                            Log out
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}