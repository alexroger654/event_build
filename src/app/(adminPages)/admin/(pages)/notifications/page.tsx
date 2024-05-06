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
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  Truck,
  Users2,
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
import { set } from "date-fns";
import { createData, DeleteData, getData } from "@/lib/commonFunctions";
import { INotification } from "@/lib/interfaces/notification.interface";
import { useToast } from "@/components/ui/use-toast";

export default function NotificationPage() {
  // =================== states =====================
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState("");
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  // functions =====================================

  useEffect(() => {
    getData(setNotifications, "notification/list", setLoading);
  }, []);

  // refetch

  function refetch() {
    getData(setNotifications, "notification/list", setLoading);
  }

  useEffect(() => {
    getData(
      setNotifications,
      `notification/list?limit=10&page=${currentPage}`,
      setLoading
    );
  }, [currentPage]);
  // handle notification create

  async function handleNotificationCreate() {
    const data = {
      title: title,
      description: description,
      imageUrl:
        "https://static.vecteezy.com/system/resources/thumbnails/001/505/138/small/notification-bell-icon-free-vector.jpg",
    };

    const result = await createData(data, "notification", setLoading, refetch);
    if (result) {
      toast({
        description: "Notification has been sent.",
      });

      setTitle("");
      setDescription("");
      setImage("");
    }
  }

  //===================== render=========================

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-14">
        <div className="grid grid-cols-3 auto-rows-max items-start gap-4 md:gap-8 ">
          <Card x-chunk="dashboard-05-chunk-3" className="col-span-2">
            <CardHeader className="px-7">
              <CardTitle>Notification</CardTitle>
              <CardDescription>
                Upcoming events Lorem, ipsum dolor.
              </CardDescription>

              {notifications.length >= 10 && (
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
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image </TableHead>
                    <TableHead>Title </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Description
                    </TableHead>

                    <TableHead className="">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications?.length ? (
                    <>
                      {notifications?.map((item, i) => (
                        <TableRow key={i} className="bg-accent">
                          <TableCell>
                            <img
                              src={item?.imageUrl}
                              className="h-7 w-7 rounded-xl"
                              alt={item?.title}
                            />
                          </TableCell>
                          <TableCell className=" sm:table-cell">
                            {item.title}
                          </TableCell>
                          <TableCell className=" sm:table-cell">
                            {item.description}
                          </TableCell>
                          <TableCell className=" sm:table-cell">
                            <Button
                              onClick={() => {
                                DeleteData(
                                  "notification",
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <p className="py-5 mt-5 ">No Notification Found</p>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div>
            <Card x-chunk="dashboard-07-chunk-3" className="">
              <CardHeader>
                <CardTitle>Send New Notification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Title</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Image</Label>
                    <Input
                      id="picture"
                      type="file"
                      className="w-full"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Description</Label>
                    <Textarea
                      id="name"
                      className="w-full"
                      defaultValue={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button
                  onClick={handleNotificationCreate}
                  className="mr-2 w-full"
                >
                  Send
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
