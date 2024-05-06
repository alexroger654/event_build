"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CircleChevronLeft,
  CircleChevronRight,
  Contact,
  Copy,
  CreditCard,
  Eye,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Pen,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { DeleteData, getData } from "@/lib/commonFunctions";
import { IUser } from "@/lib/interfaces/user.interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IEvent } from "@/lib/interfaces/event.interface";
import { useToast } from "@/components/ui/use-toast";

////////////////// components //////////////////
export default function UserPage() {
  //========================= states =======================

  const [excelFile, setExcelFile] = useState<any>(null);
  const [userGroupName, setUserGroupName] = useState<any>("");
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [userGroupList, setUserGroupList] = useState<any>([]);
  const [selectedUserGroup, setSelectedUserGroup] = useState<any>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { toast } = useToast();

  // function==============================

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

    console.log(formattedData, "-------------------0--------------------");

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

  useEffect(() => {
    const result = getData(setEvents, "event/list", setLoading);
  }, []);

  async function refetch() {
    getData(setEvents, "event/list", setLoading);
  }

  useEffect(() => {
    getData(setEvents, `event/list?limit=10&page=${currentPage}`, setLoading);
  }, [currentPage]);

  //============= render =================

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-14">
        <div className="grid  auto-rows-max items-start gap-4 md:gap-8 ">
          <Card
            x-chunk="dashboard-05-chunk-3"
            className="col-span-2 min-h-[70vh]"
          >
            <CardHeader className="px-7 ">
              <div className="flex  justify-between">
                <div>
                  <CardTitle>Events</CardTitle>
                  <CardDescription>
                    Upcoming events Lorem, ipsum dolor.
                  </CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-2 capitalize">
                  {events.length >= 10 && (
                    <div className="ml-auto flex items-center gap-2 capitalize">
                      <Button variant="outline">
                        <p>{currentPage}</p>
                      </Button>
                      <Button
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                          }
                        }}
                        variant="outline"
                      >
                        <CircleChevronLeft />
                      </Button>

                      <Button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        variant="outline"
                      >
                        <CircleChevronRight />
                      </Button>
                    </div>
                  )}

                  <Link href="/admin/create_event">
                    <Button>Create New Event</Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sl No.</TableHead>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Start Date
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      End Date
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events?.map((item, i) => (
                    <TableRow key={item._id} className="bg-accent">
                      <TableCell className="hidden sm:table-cell">
                        {i + 1}
                      </TableCell>
                      <TableCell>
                        <div className=" capitalize">{item.eventName}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {item.country}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {item?.startDate?.slice(0, 10)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-center capitalize">
                        {item?.endDate?.slice(0, 10)}
                      </TableCell>

                      <TableCell className=" flex items-center justify-center space-x-2">
                        <Link href={`/admin/events/edit/${item?._id}`}>
                          <Button variant="outline" size="icon">
                            <Pen className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          onClick={() => {
                            DeleteData(
                              "event",
                              item?._id as string,
                              setLoading,
                              refetch
                            );
                            toast({
                              variant: "destructive",
                              title: "Deleted Successfully",
                            });
                          }}
                          variant="outline"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        {/* <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
