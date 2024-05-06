"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { getData } from "@/lib/commonFunctions";
import { IEvent } from "@/lib/interfaces/event.interface";
import { useSession } from "next-auth/react";
export default function Page() {
  const { data: session, status } = useSession();
  const [currentEvent, setCurrentEvent] = useState("");
  const [eventData, setEventData] = useState<IEvent>({
    eventName: "",
    description: "",
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
    country: "",
    capital: "",
    language: "",
    area: "",
    temperatureInEventMonth: 0,
    currency: "",
    currencyExchangeRate: 0,
    airportName: "",
    preDepartureChecklist: [],
    dos: [],
    donts: [],
    itineraryDocUrl: "",
    itinerary: [],
    meetings: [],
    contact: [],
    hotelInfo: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const eventId = localStorage.getItem("eventId");
    setCurrentEvent(eventId as string);
    getData(setEventData, `event/list?id=${eventId}`, setLoading);
  }, []);

  return (
    <section className="w-full h-[80vh] flex lg:items-center justify-center py-8 lg:py-0 ">
      <div className="">
        <Card
          className="overflow-hidden w-full lg:w-[450px] "
          x-chunk="dashboard-05-chunk-4"
        >
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Contact Info
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>Date: November 23, 2023</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            {eventData?.hotelInfo?.map((item: any, i) => (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">
                      Hotel Information- {i + 1}
                    </div>
                    <p>{item?.name}</p>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      {item?.address}
                    </address>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Hotel Contact Info</div>
                    <div className="text-muted-foreground">{item?.phone}</div>
                  </div>
                </div>
                <Separator className="my-4" />
              </>
            ))}

            {eventData?.contact?.map((item: any, i) => (
              <>
                <div key={i} className="grid gap-3 my-4 ">
                  <div className="font-semibold">
                    Tour Operator In {item.location}
                  </div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground"> Name </dt>
                      <dd>{item?.name}</dd>
                    </div>
                    {/* <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>
                          <a href="mailto:">liam@acme.com</a>
                        </dd>
                      </div> */}
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href="tel:">{item?.phone}</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator />
              </>
            ))}
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">-</div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
