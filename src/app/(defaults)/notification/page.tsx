"use client";

import Loading from "@/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getData } from "@/lib/commonFunctions";
import { INotification } from "@/lib/interfaces/notification.interface";
import React, { useEffect, useState } from "react";

export default function Page() {
  //states==============================
  const [notification, setNotification] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getData(setNotification, "notification/list", setLoading);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-16">
      <Card x-chunk="dashboard-01-chunk-5" className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 mt-8">
          {notification?.map((item) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src={item?.imageUrl} alt="Avatar" />
                <AvatarFallback>{item?.title?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {item?.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
          {notification?.length === 0 && (
            <p className="text-sm text-center text-muted-foreground">
              No notifications found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
