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
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";
import { IconBrandGoogle, IconLoader2 } from "@tabler/icons-react";

export default function SignInPage() {
    return (
        <SignIn.Root>
            <Clerk.Loading>
                {(isGlobalLoading) => (
                    <>
                        <SignIn.Step name="start">
                            <Card className="w-full sm:w-[400px] absolute inset-0 pt-40 md:pt-20 mx-auto border-none shadow-none">
                                <CardHeader className="space-y-2">
                                    <CardTitle className="text-3xl font-bold tracking-tight">
                                        NISU BH
                                    </CardTitle>
                                    <div className="space-y-1">
                                        <CardTitle className="text-2xl font-semibold">
                                            Sign in to your account
                                        </CardTitle>
                                        <CardDescription>
                                            Welcome back! Please sign in to
                                            continue
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
                                                                Continue with
                                                                Google
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
                                    <Clerk.Field
                                        name="identifier"
                                        className="space-y-2"
                                    >
                                        <Clerk.Label asChild>
                                            <Label>Email address</Label>
                                        </Clerk.Label>
                                        <Clerk.Input
                                            type="email"
                                            required
                                            asChild
                                        >
                                            <Input />
                                        </Clerk.Input>
                                        <Clerk.FieldError className="block text-sm text-destructive" />
                                    </Clerk.Field>
                                </CardContent>
                                <CardFooter>
                                    <div className="grid w-full gap-y-4">
                                        <SignIn.Action submit asChild>
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
                                        </SignIn.Action>

                                        <Button
                                            variant="link"
                                            size="sm"
                                            asChild
                                            className="font-normal"
                                        >
                                            <Link href="/sign-up">
                                                Don&apos;t have an account? Sign
                                                up
                                            </Link>
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </SignIn.Step>

                        <SignIn.Step name="choose-strategy">
                            <Card className="w-full sm:w-[400px]">
                                <CardHeader>
                                    <CardTitle>Use another method</CardTitle>
                                    <CardDescription>
                                        Facing issues? You can use any of these
                                        methods to sign in.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-y-4">
                                    <SignIn.SupportedStrategy
                                        name="email_code"
                                        asChild
                                    >
                                        <Button
                                            type="button"
                                            variant="link"
                                            disabled={isGlobalLoading}
                                        >
                                            Email code
                                        </Button>
                                    </SignIn.SupportedStrategy>
                                    <SignIn.SupportedStrategy
                                        name="password"
                                        asChild
                                    >
                                        <Button
                                            type="button"
                                            variant="link"
                                            disabled={isGlobalLoading}
                                        >
                                            Password
                                        </Button>
                                    </SignIn.SupportedStrategy>
                                </CardContent>
                                <CardFooter>
                                    <div className="grid w-full gap-y-4">
                                        <SignIn.Action
                                            navigate="previous"
                                            asChild
                                        >
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
                                                            "Go back"
                                                        );
                                                    }}
                                                </Clerk.Loading>
                                            </Button>
                                        </SignIn.Action>
                                    </div>
                                </CardFooter>
                            </Card>
                        </SignIn.Step>

                        <SignIn.Step name="verifications">
                            <SignIn.Strategy name="password">
                                <Card className="w-full sm:w-[400px]">
                                    <CardHeader>
                                        <CardTitle>Check your email</CardTitle>
                                        <CardDescription>
                                            Enter the verification code sent to
                                            your email
                                        </CardDescription>
                                        <p className="text-sm text-muted-foreground">
                                            Welcome back{" "}
                                            <SignIn.SafeIdentifier />
                                        </p>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4">
                                        <Clerk.Field
                                            name="password"
                                            className="space-y-2"
                                        >
                                            <Clerk.Label asChild>
                                                <Label>Password</Label>
                                            </Clerk.Label>
                                            <Clerk.Input
                                                type="password"
                                                asChild
                                            >
                                                <Input />
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive" />
                                        </Clerk.Field>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignIn.Action submit asChild>
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
                                            </SignIn.Action>
                                            <SignIn.Action
                                                navigate="choose-strategy"
                                                asChild
                                            >
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="link"
                                                    className="font-normal"
                                                >
                                                    Use another method
                                                </Button>
                                            </SignIn.Action>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignIn.Strategy>

                            <SignIn.Strategy name="email_code">
                                <Card className="w-full sm:w-[400px]">
                                    <CardHeader>
                                        <CardTitle>Check your email</CardTitle>
                                        <CardDescription>
                                            Enter the verification code sent to
                                            your email
                                        </CardDescription>
                                        <p className="text-sm text-muted-foreground">
                                            Welcome back{" "}
                                            <SignIn.SafeIdentifier />
                                        </p>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4">
                                        <Clerk.Field name="code">
                                            <Clerk.Label className="sr-only">
                                                Email verification code
                                            </Clerk.Label>
                                            <div className="grid gap-y-2 items-center justify-center">
                                                <div className="flex justify-center text-center">
                                                    <Clerk.Input
                                                        type="otp"
                                                        autoSubmit
                                                        className="flex justify-center has-[:disabled]:opacity-50"
                                                        render={({
                                                            value,
                                                            status,
                                                        }) => {
                                                            return (
                                                                <div
                                                                    data-status={
                                                                        status
                                                                    }
                                                                    className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-ring data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring"
                                                                >
                                                                    {value}
                                                                </div>
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <Clerk.FieldError className="block text-sm text-destructive text-center" />
                                                <SignIn.Action
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
                                                            Didn&apos;t recieve
                                                            a code? Resend (
                                                            <span className="tabular-nums">
                                                                {
                                                                    resendableAfter
                                                                }
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
                                                        Didn&apos;t recieve a
                                                        code? Resend
                                                    </Button>
                                                </SignIn.Action>
                                            </div>
                                        </Clerk.Field>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignIn.Action submit asChild>
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
                                            </SignIn.Action>
                                            <SignIn.Action
                                                navigate="choose-strategy"
                                                asChild
                                            >
                                                <Button
                                                    size="sm"
                                                    variant="link"
                                                    className="font-normal"
                                                >
                                                    Use another method
                                                </Button>
                                            </SignIn.Action>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignIn.Strategy>
                        </SignIn.Step>
                    </>
                )}
            </Clerk.Loading>
        </SignIn.Root>
    );
}
