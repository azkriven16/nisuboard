"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";
import { IconBrandGoogle, IconLoader2 } from "@tabler/icons-react";

export default function SignUpPage() {
    return (
        <SignUp.Root>
            <Clerk.Loading>
                {(isGlobalLoading) => (
                    <>
                        <SignUp.Step name="start">
                            <Card className="w-full sm:w-[400px] absolute inset-0 pt-40 md:pt-20 mx-auto border-none shadow-none">
                                <CardHeader className="space-y-2">
                                    <CardTitle className="text-3xl font-bold tracking-tight">
                                        NISU BH
                                    </CardTitle>
                                    <div className="space-y-1">
                                        <CardTitle className="text-2xl font-semibold">
                                            Create your account
                                        </CardTitle>
                                        <CardDescription>
                                            Welcome! Please fill in the details to get started.
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="grid gap-y-4">
                                    <div className="grid gap-x-4">
                                        <Clerk.Connection name="google" asChild>
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                type="button"
                                                disabled={isGlobalLoading}
                                                className="w-full"
                                            >
                                                <Clerk.Loading scope="provider:google">
                                                    {(isLoading) =>
                                                        isLoading ? (
                                                            <IconLoader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <>
                                                                <IconBrandGoogle className="mr-2 h-4 w-4" />
                                                                Continue with Google
                                                            </>
                                                        )
                                                    }
                                                </Clerk.Loading>
                                            </Button>
                                        </Clerk.Connection>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>
                                    <Clerk.Field name="emailAddress" className="space-y-2">
                                        <Clerk.Label asChild>
                                            <Label>Email address</Label>
                                        </Clerk.Label>
                                        <Clerk.Input type="email" required asChild>
                                            <Input />
                                        </Clerk.Input>
                                        <Clerk.FieldError className="block text-sm text-destructive" />
                                    </Clerk.Field>
                                    <Clerk.Field name="password" className="space-y-2">
                                        <Clerk.Label asChild>
                                            <Label>Password</Label>
                                        </Clerk.Label>
                                        <Clerk.Input type="password" required asChild>
                                            <Input />
                                        </Clerk.Input>
                                        <Clerk.FieldError className="block text-sm text-destructive" />
                                    </Clerk.Field>
                                </CardContent>
                                <CardFooter>
                                    <div className="grid w-full gap-y-4">
                                        <SignUp.Captcha className="empty:hidden" />
                                        <SignUp.Action submit asChild>
                                            <Button
                                                disabled={isGlobalLoading}
                                                size="lg"
                                                className="w-full"
                                            >
                                                <Clerk.Loading>
                                                    {(isLoading) => {
                                                        return isLoading ? (
                                                            <IconLoader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            "Continue"
                                                        );
                                                    }}
                                                </Clerk.Loading>
                                            </Button>
                                        </SignUp.Action>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            asChild
                                            className="font-normal"
                                        >
                                            <Link href="/sign-in">
                                                Already have an account? Sign in
                                            </Link>
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </SignUp.Step>

                        <SignUp.Step name="continue">
                            <Card className="w-full sm:w-[400px] absolute inset-0 pt-40 md:pt-20 mx-auto border-none shadow-none">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-semibold">
                                        Continue registration
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Clerk.Field name="username" className="space-y-2">
                                        <Clerk.Label asChild>
                                            <Label>Username</Label>
                                        </Clerk.Label>
                                        <Clerk.Input type="text" required asChild>
                                            <Input />
                                        </Clerk.Input>
                                        <Clerk.FieldError className="block text-sm text-destructive" />
                                    </Clerk.Field>
                                </CardContent>
                                <CardFooter>
                                    <div className="grid w-full gap-y-4">
                                        <SignUp.Action submit asChild>
                                            <Button
                                                disabled={isGlobalLoading}
                                                size="lg"
                                                className="w-full"
                                            >
                                                <Clerk.Loading>
                                                    {(isLoading) => {
                                                        return isLoading ? (
                                                            <IconLoader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            "Continue"
                                                        );
                                                    }}
                                                </Clerk.Loading>
                                            </Button>
                                        </SignUp.Action>
                                    </div>
                                </CardFooter>
                            </Card>
                        </SignUp.Step>

                        <SignUp.Step name="verifications">
                            <SignUp.Strategy name="email_code">
                                <Card className="w-full sm:w-[400px] absolute inset-0 pt-40 md:pt-20 mx-auto border-none shadow-none">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-semibold">
                                            Verify your email
                                        </CardTitle>
                                        <CardDescription>
                                            Use the verification link sent to your email address
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4">
                                        <Clerk.Field name="code" className="space-y-2">
                                            <Clerk.Label className="sr-only">
                                                Verification code
                                            </Clerk.Label>
                                            <div className="flex justify-center">
                                                <Clerk.Input
                                                    type="text"
                                                    required
                                                    asChild
                                                >
                                                    <Input className="text-center" />
                                                </Clerk.Input>
                                            </div>
                                            <Clerk.FieldError className="block text-sm text-destructive text-center" />
                                            <SignUp.Action
                                                asChild
                                                resend
                                                className="text-muted-foreground"
                                                fallback={({
                                                    resendableAfter,
                                                }) => (
                                                    <Button
                                                        variant="link"
                                                        size="sm"
                                                        disabled
                                                        className="font-normal"
                                                    >
                                                        Didn&apos;t receive a code? Resend (
                                                        <span className="tabular-nums">
                                                            {resendableAfter}
                                                        </span>
                                                        )
                                                    </Button>
                                                )}
                                            >
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="font-normal"
                                                >
                                                    Didn&apos;t receive a code? Resend
                                                </Button>
                                            </SignUp.Action>
                                        </Clerk.Field>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignUp.Action submit asChild>
                                                <Button
                                                    disabled={isGlobalLoading}
                                                    size="lg"
                                                    className="w-full"
                                                >
                                                    <Clerk.Loading>
                                                        {(isLoading) => {
                                                            return isLoading ? (
                                                                <IconLoader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                "Continue"
                                                            );
                                                        }}
                                                    </Clerk.Loading>
                                                </Button>
                                            </SignUp.Action>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignUp.Strategy>
                        </SignUp.Step>
                    </>
                )}
            </Clerk.Loading>
        </SignUp.Root>
    );
}
