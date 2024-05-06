"use client";

import { ListFilter, PlusCircle, Upload } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { Separator } from "@/components/ui/separator";
import { CreateList } from "./(components)/CreateList";
import { useEffect, useState } from "react";
import { IEvent } from "@/lib/interfaces/event.interface";
import { CreateSchedule } from "./(components)/CreateSchedule";
import { UserSelect } from "./(components)/UserSelect";
import { IUser } from "@/lib/interfaces/user.interface";
import { createData, getData } from "@/lib/commonFunctions";
import { CreateContact } from "./(components)/CreateContact";
import { CreateHotelInfo } from "./(components)/CreateHotelInfo";
import { useRouter } from "next/navigation";

//////////////////////// component ///////////////////////
export default function CreateEventPage() {
  // =================== states ===========================

  const [eventData, setEventData] = useState<IEvent>({
    eventName: "",
    description: "",
    //@ts-ignore
    startDate: new Date(),
    //@ts-ignore
    endDate: new Date(),
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
  const [excelFile, setExcelFile] = useState<any>(null);
  const [userGroupName, setUserGroupName] = useState<any>("");

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [userGroupList, setUserGroupList] = useState<any>([]);
  const [selectedUserGroup, setSelectedUserGroup] = useState<any>("");

  const router = useRouter();

  // getting user data
  useEffect(() => {
    getData(setUsers, "user/list", setLoading);
  }, []);

  // getting user group data
  useEffect(() => {
    if (users?.length) {
      let uniqueGroup: any = [];
      users?.forEach((item) => {
        if (!uniqueGroup.includes(item.userGroupName)) {
          uniqueGroup.push(item.userGroupName);
        }
      });
      setUserGroupList(uniqueGroup);
    }
  }, [users?.length]);
  useEffect(() => {
    if (selectedUserGroup) {
      console.log(selectedUserGroup, "ffffffffffffffffff");
    }
  }, [selectedUserGroup]);

  //=================== functions ==================================

  async function createEvent() {
    const result: any = await createData(eventData, "event", setLoading);

    console.log("rrrrrrrrrrrrrrrrrrr", result);

    // update user if group is selected
    if (result) {
      localStorage.setItem("eventId", result?._id);

      if (selectedUserGroup) {
        const userIds = users?.map((user) => user._id);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}user/update_bulk`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              eventId: result?._id,
              ids: userIds,
            }),
          }
        );
      }

      if (excelFile) {
        const data = new FormData();
        data.set("file", excelFile);
        const res = await fetch("/api/handelExcelFile", {
          method: "POST",
          body: data,
        });

        const jsonData = await res.json();

        console.log(jsonData);
        if (!jsonData.success) {
          console.error(jsonData.error);
          return;
        }

        // handle signUp

        let formattedData = jsonData?.data?.map((item: any) => {
          return {
            name: item.NAME.toLowerCase(),
            userGroupName: userGroupName.toLowerCase(),
            phone: item.MOBILE,
            state: item.STATE.toLowerCase(),
            email: "",
            city: item.CITY.toLowerCase(),
            zone: item.ZONE.toLowerCase(),
            totalMembers: parseInt(item["No. of Pax"]),
            eventUserId: item["ID #"],
            destinationCountry: item.DESTINATION.toLowerCase(),
          };
        });

        const regRes = await fetch(
          `http://localhost:4000/api/v1/user/create_bulk`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formattedData, eventId: result?._id }),
          }
        );

        const regData = await regRes.json();
        console.log(regRes.status);

        if (regData.status === "success") {
          console.log(
            regData?.data,
            "----------0------------------0----------------0--------------------"
          );
        }
      }
    }

    router.push("/admin/events");
  }

  async function handleUserCreation() {
    //handle excel file
    if (!excelFile) {
      return;
    }
    const data = new FormData();
    data.set("file", excelFile);
    const res = await fetch("/api/handelExcelFile", {
      method: "POST",
      body: data,
    });

    const jsonData = await res.json();

    console.log(jsonData);
    if (!jsonData.success) {
      console.error(jsonData.error);
      return;
    }

    // handle signUp

    let formattedData = jsonData?.data?.map((item: any) => {
      return {
        name: item.NAME.toLowerCase(),
        userGroupName: userGroupName.toLowerCase(),
        phone: item.MOBILE,
        state: item.STATE.toLowerCase(),
        email: "",
        city: item.CITY.toLowerCase(),
        zone: item.ZONE.toLowerCase(),
        totalMembers: parseInt(item["No. of Pax"]),
        eventUserId: item["ID #"],
        destinationCountry: item.DESTINATION.toLowerCase(),
      };
    });

    const regRes = await fetch(
      `http://localhost:4000/api/v1/user/create_bulk`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      }
    );

    const regData = await regRes.json();
    console.log(regRes.status);

    if (regData.status === "success") {
      console.log(
        regData?.data,
        "----------0------------------0----------------0--------------------"
      );
    }
  }

  //========================= render ======================
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[89rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Create Event
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button onClick={createEvent} size="sm">
              Create
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={eventData?.eventName}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          eventName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue={eventData?.description}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          description: e.target.value,
                        })
                      }
                      className="min-h-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pre-Departure Checklist===================================== */}
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Pre-Departure Checklist</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                {eventData?.preDepartureChecklist.map((item, index) => (
                  <div key={index}>
                    <div className="py-3">
                      <Label>
                        {index + 1}. {item}
                      </Label>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <CreateList
                    eventData={eventData}
                    setEventData={setEventData}
                    currentItem="preDepartureChecklist"
                  />
                </Dialog>
              </CardFooter>
            </Card>
            {/* DOS===================================== */}
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>DOS</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                {eventData?.dos.map((item, index) => (
                  <div key={index}>
                    <div className="py-3">
                      <Label>
                        {index + 1}. {item}
                      </Label>
                    </div>
                    <Separator />
                  </div>
                ))}

                <Separator />
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <CreateList
                    eventData={eventData}
                    setEventData={setEventData}
                    currentItem="dos"
                  />
                </Dialog>
              </CardFooter>
            </Card>
            {/* DON’TS===================================== */}
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>DON’TS</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                {eventData?.donts.map((item, index) => (
                  <div key={index}>
                    <div key={index} className="py-3">
                      <Label>
                        {index + 1}. {item}
                      </Label>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <CreateList
                    eventData={eventData}
                    setEventData={setEventData}
                    currentItem="donts"
                  />
                </Dialog>
              </CardFooter>
            </Card>
            {/* Itinerary ===================================== */}
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                {eventData.itinerary?.map((item: any, i) => (
                  <div key={i}>
                    <div key={i} className="py-3">
                      <Label>
                        {i + 1}. {item?.title} ( {item.date} -{" "}
                        {item?.scheduleTime} )
                      </Label>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <CreateSchedule
                    eventData={eventData}
                    setEventData={setEventData}
                    currentItem="itinerary"
                  />
                </Dialog>
              </CardFooter>
            </Card>
            {/* Contact===================================== */}
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Contact Info</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                {eventData.contact?.map((item: any, i) => (
                  <div key={i}>
                    <div key={i} className="py-3">
                      <Label>
                        {i + 1}. {item?.name}
                      </Label>
                      <Label className="mt-2 block">
                        {item?.phone} ( {item.location} )
                      </Label>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <CreateContact
                    eventData={eventData}
                    setEventData={setEventData}
                    currentItem="contact"
                  />
                </Dialog>
              </CardFooter>
            </Card>
            {/* Hotel info===================================== */}
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Hotel Info</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                {eventData.hotelInfo?.map((item: any, i) => (
                  <div key={i}>
                    <div key={i} className="py-3">
                      <Label>
                        {i + 1}. Address: {item?.address} ---
                      </Label>
                      <Label className="mt-2 block">Phone {item?.phone}</Label>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <CreateHotelInfo
                    eventData={eventData}
                    setEventData={setEventData}
                    currentItem="hotelInfo"
                  />
                </Dialog>
              </CardFooter>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            {/* ============== location */}
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Country</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={eventData?.country}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          country: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Capital</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={eventData?.capital}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          capital: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="grid gap-0">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Language</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={eventData?.language}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          language: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="grid gap-0">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Currency Name</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={eventData?.currency}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          currency: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="grid gap-0">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Currency Exchange Rate</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={eventData?.currencyExchangeRate}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          currencyExchangeRate: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="grid gap-0">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Airport Name</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={eventData?.airportName}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          airportName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* image ======================= */}
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Event Image</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {/* <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src="/placeholder.svg"
                    width="300"
                  /> */}
                  <div className="grid grid-cols-3 gap-2">
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* User ======================= */}
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Select Or Create Users</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="w-full gap-2 capitalize">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm w-full py-4"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">
                            Select User Group
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Select</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {userGroupList?.map((item: any, i: number) => (
                          <DropdownMenuCheckboxItem
                            key={i}
                            onClick={() => setSelectedUserGroup(item)}
                            checked={selectedUserGroup === item ? true : false}
                          >
                            {item}
                          </DropdownMenuCheckboxItem>
                        ))}
                        <DropdownMenuCheckboxItem
                          onClick={() => setSelectedUserGroup("POU")}
                          checked={selectedUserGroup === "POU" ? true : false}
                        >
                          POU
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardContent className="mt-8 ">
                <CardTitle> Create Users</CardTitle>
              </CardContent>

              <CardContent>
                <div className="grid gap-4 mt-3">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Group Name / Company Name</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={userGroupName}
                      onChange={(e) => setUserGroupName(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Excel File</Label>
                    <Input
                      id="picture"
                      type="file"
                      className="w-full"
                      onChange={(e) => {
                        if (e.target.files) {
                          setExcelFile(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* ===================== hubs ================== */}
            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>International Hubs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className=" gap-6 ">
                  <div className="grid gap-3">
                    {/* <Label htmlFor="category">International Hub</Label> */}
                    <Select>
                      <SelectTrigger id="category" aria-label="Select category">
                        <SelectValue placeholder="Select Hub" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* meetings ====================================== */}
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Meeting Schedules</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                {eventData.meetings?.map((item: any, i) => (
                  <div key={i}>
                    <div key={i} className="py-3">
                      <Label>
                        {i + 1}. {item?.title}
                      </Label>
                      <p className="text-xs mt-3">
                        {" "}
                        <Label>
                          ( {item.date} - {item?.scheduleTime} )
                        </Label>
                      </p>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <CreateSchedule
                    eventData={eventData}
                    setEventData={setEventData}
                    currentItem="meetings"
                  />
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
    </main>
  );
}
