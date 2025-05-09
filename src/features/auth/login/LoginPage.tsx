"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { InputPassword } from "@/components/ui/InputPassword";

function LoginPage() {
  const form = useForm();

  return (
    <div className="w-screen h-screen p-4 relative overflow-hidden">
      <div className="size-70 rounded-full bg-radial from-hmc-base-lightblue to-transparent to-70% absolute -top-20 -left-20 blur-3xl"></div>
      <div className="size-70 rounded-full bg-radial from-hmc-base-lightblue to-transparent to-70% absolute -bottom-20 -right-20 blur-3xl"></div>
      <div className="flex min-h-full relative overflow-hidden justify-center items-center">
        <div className="flex flex-col items-center justify-center lg:w-4/12">
          <div className="flex flex-col gap-10 mx-auto lg:w-96">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-4xl">Sign In</h1>
              <p className="text-sm text-[#828282] mt-2">
                Let&apos;s started! Please Sign In to access the best learning resources.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Form {...form}>
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="Enter Email" className="focus-visible:ring-black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputPassword
                          type="password"
                          placeholder="Enter Password"
                          colorIcon="text-[#828282]"
                          className="outline-none"
                          suffix={<LockKeyhole className="text-[#828282]" />}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </div>
            <div className="flex flex-col gap-4 ">
              <Button className="text-white rounded-2xl bg-linear-to-l from-hmc-base-blue to-hmc-base-lightblue">
                Sign In
              </Button>
              <p className="text-xs text-center">
                Don&apos;t have an account yet?{" "}
                <Link href="/sign-up" className="text-hmc-base">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Image
          priority
          width={399}
          height={330}
          src="/assets/auth/signin-astronout.svg"
          alt="Sign In Background"
          className="hidden lg:block w-4/12 h-4/12"
        />
      </div>
    </div>
  );
}

export default LoginPage;
