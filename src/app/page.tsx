"use client";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import {
  Copy,
  MoreVertical,
  Contact,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { IEvent } from "@/lib/interfaces/event.interface";
import { getData } from "@/lib/commonFunctions";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Loading from "@/components/Loading";
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
    const userData = JSON.parse(localStorage.getItem("user") as string);
    setCurrentEvent(userData?.eventId as string);
    getData(
      setEventData,
      `event/list?id=${userData?.eventId || "6634eeb567f0c4a290214e92"}`,
      setLoading
    );
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") as string);
    if (eventData) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userData,
          eventName: eventData.eventName,
        })
      );
    }
  }, [eventData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10  min-h-screen px-4 lg:px-8 py-6">
      <div className="col-span-2 space-y-6">
        {/* top carousel ============================================= */}
        <Carousel className="w-full col-span-2">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="  h-[200px] lg:h-[400px]">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="w-full h-full rounded-xl"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
        <CarouselNext /> */}
        </Carousel>

        <div className="">
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  {eventData?.eventName}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Date: {eventData.startDate?.slice(0, 10)}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Event Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Country</span>
                    <span>{eventData?.country}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Capital</span>
                    <span>{eventData?.capital}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Official Language
                    </span>
                    <span> {eventData?.language}</span>
                  </li>
                </ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Area</span>
                    <span> {eventData?.country}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Dial Code</span>
                    <span> -</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {" "}
                      Temperature in April
                    </span>
                    <span>-</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {" "}
                      Currency Rate of Exchange
                    </span>
                    <span>{eventData?.currencyExchangeRate}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground"> Airport Name</span>
                    <span>{eventData?.airportName}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Pre-Departure Checklist
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              {eventData?.preDepartureChecklist?.map((item, index) => (
                <>
                  <div key={index} className="py-3">
                    <Label>
                      {index + 1}. {item}
                    </Label>
                  </div>
                  <Separator />
                </>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  DOS
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              {eventData?.dos?.map((item, index) => (
                <>
                  <div key={index} className="py-3">
                    <Label>
                      {index + 1}. {item}
                    </Label>
                  </div>
                  <Separator />
                </>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  DON’TS
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              {eventData?.donts?.map((item, index) => (
                <>
                  <div key={index} className="py-3">
                    <Label>
                      {index + 1}. {item}
                    </Label>
                  </div>
                  <Separator />
                </>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Itinerary
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Link href="/itinerary">
                  <Button variant="outline" className="">
                    <span className="">View all</span>
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent className="p-6 text-sm">
              <ul className=" list-inside lg:pl-3">
                {eventData.itinerary?.map((item: any, i) => (
                  <>
                    <li key={i} className="text-muted-foreground py-2   ">
                      <p className="font-semibold mb-2"> {item?.title}</p>
                      <p>
                        <Badge>
                          {" "}
                          {item.date?.slice(0, 10)} {item?.scheduleTime}
                        </Badge>
                      </p>
                    </li>
                    <Separator className="my-2" />
                  </>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <div>
          <Card
            className="overflow-hidden hidden lg:block"
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
              {eventData.hotelInfo?.map((item: any, i) => (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <div className="font-semibold">
                        Hotel Information- {i + 1}
                      </div>
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

              {eventData.contact?.map((item: any, i) => (
                <>
                  <div key={i} className="grid gap-3 my-5  ">
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
      </div>
    </section>
  );
}
