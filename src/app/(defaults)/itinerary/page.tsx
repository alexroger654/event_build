"use client";
import { getData } from "@/lib/commonFunctions";
import { IEvent } from "@/lib/interfaces/event.interface";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
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
  const [bookmarkChanged, setBookmarkChanged] = useState(false);
  const [bookmarkData, setBookmarkData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") as string);
    getData(setEventData, `event/list?id=${userData?.eventId}`, setLoading);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") as string);

    const bookmarkIds = userData.bookmarks;

    // find items with   bookmarkIds from eventData.itinerary array
    const bookmarkData = eventData.itinerary.filter((item) =>
      bookmarkIds.includes(item.title)
    );
    setBookmarkData(bookmarkData);
  }, [bookmarkChanged]);

  function handleBookmarks(title: string) {
    const userData = JSON.parse(localStorage.getItem("user") as string);
    if (userData.bookmarks && userData.bookmarks.length) {
      let oldBookmarks = [...userData.bookmarks];
      // if bookmark already exists remove it
      if (oldBookmarks.includes(title)) {
        oldBookmarks = oldBookmarks.filter((item) => item !== title);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userData,
            bookmarks: oldBookmarks,
          })
        );
        setBookmarkChanged(!bookmarkChanged);
      } else {
        // if bookmark doesn't exist add it
        oldBookmarks.push(title);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userData,
            bookmarks: oldBookmarks,
          })
        );
        setBookmarkChanged(!bookmarkChanged);
      }
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userData,
          bookmarks: [title],
        })
      );
      setBookmarkChanged(!bookmarkChanged);
    }
  }

  function checkBookmark(id: string) {
    const userData = JSON.parse(localStorage.getItem("user") as string);
    if (userData.bookmarks && userData.bookmarks.length) {
      let oldBookmarks = [...userData.bookmarks];
      // if bookmark already exists remove it
      if (oldBookmarks.includes(id)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <div>
      <div className="lg:px-16">
        <Tabs defaultValue="Itinerary">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="Itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="Bookmarks">Bookmarks</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2"></div>
          </div>
          <TabsContent value="Itinerary">
            <Card
              className="overflow-hidden min-h-[80vh]"
              x-chunk="dashboard-05-chunk-4"
            >
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
              </CardHeader>

              <CardContent className="p-6 text-sm">
                <ul className=" list-inside lg:pl-3">
                  {eventData?.itinerary?.map((item: any, i) => (
                    <>
                      <li
                        key={i}
                        className="text-muted-foreground py-2 flex items-center justify-between   "
                      >
                        <div>
                          <p className="font-semibold mb-2"> {item?.title}</p>
                          <p>
                            <Badge>
                              {" "}
                              {item.date?.slice(0, 10)} {item?.scheduleTime}
                            </Badge>
                          </p>
                        </div>

                        <Button
                          onClick={() => handleBookmarks(item.title)}
                          size="icon"
                          variant={
                            checkBookmark(item?.title) ? "default" : "outline"
                          }
                        >
                          <Bookmark size={20} />
                        </Button>
                      </li>
                      <Separator className="my-2" />
                    </>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="Bookmarks">
            <Card
              className="overflow-hidden min-h-[80vh]"
              x-chunk="dashboard-05-chunk-4"
            >
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Bookmarks
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
                <ul className=" list-inside lg:pl-3">
                  {bookmarkData?.map((item: any, i: number) => (
                    <>
                      <li
                        key={i}
                        className="text-muted-foreground py-2 flex items-center justify-between "
                      >
                        <div>
                          <p className="font-semibold mb-2"> {item?.title}</p>
                          <p>
                            <Badge>
                              {" "}
                              {item.date?.slice(0, 10)} {item?.scheduleTime}
                            </Badge>
                          </p>
                        </div>

                        <Button size="icon" variant="outline">
                          <Bookmark size={20} />
                        </Button>
                      </li>
                      <Separator className="my-2" />
                    </>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
