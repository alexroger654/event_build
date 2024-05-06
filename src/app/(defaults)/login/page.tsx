"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getData } from "@/lib/commonFunctions";
import { useRouter } from "next/navigation";
import { IUser } from "@/lib/interfaces/user.interface";

export default function Page() {
  const [uid, setUId] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [error, setError] = useState("");

  //hooks
  const router = useRouter();

  async function handleLogin() {
    if (!selectedUserId) {
      setError("Please enter user id ");
      return;
    }

    const result = getData(setUsers, `user/list?eventId=${uid}`, setLoading);
    console.log(result);

    // router.push("/");
  }

  async function getUsers() {
    if (!uid) {
      setError("Please enter uid number");
      return;
    }
    await getData(setUsers, `user/list?eventUserId=${uid}`, setLoading);
    if (users.length) {
      setCurrentTab(2);
    } else {
      setError("No User Found");
    }
  }

  function handelUserLogin(user: IUser) {
    // save data to local storage

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user._id,
        name: user.firstName,
        eventId: user.eventId,
        eventUserId: user.eventUserId,
      })
    );

    router.push("/");
  }

  return (
    <>
      {currentTab === 1 && (
        <div className="w-full h-[80vh]  flex items-center justify-center">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardDescription className="text-center mt-5 text-red-500">
                {error}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">User Id</Label>
                  <Input
                    id="email"
                    type="text"
                    defaultValue={uid}
                    onChange={(e) => setUId(e.target.value)}
                    placeholder="9145238865"
                    required
                  />
                </div>

                <Button
                  onClick={getUsers}
                  type="button"
                  className="w-full mt-6 py-5"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {currentTab === 2 && (
        <div className="w-full h-[80vh]  flex items-center justify-center">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Select User</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardDescription className="text-center mt-5 text-red-500">
                {/* {error} */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {users.map((user: any, index) => (
                  <div
                    onClick={() => {
                      handelUserLogin(user);

                      setError("");
                    }}
                    key={index}
                    className="py-4 rounded-md border flex items-center justify-center space-x-3"
                  >
                    <div className="bg-muted border h-8 w-8 text-sm font-bold flex items-center justify-center rounded-full">
                      {user?.firstName?.slice(0, 2)}
                    </div>
                    <Label htmlFor="email" className="capitalize">
                      {user?.salutation} {user?.firstName} {user?.surname}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
