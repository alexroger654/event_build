"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
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
  PlusCircle,
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateFeedbackQus } from "./(components)/CreateFeedbackQus";
import { IFeedback } from "@/lib/interfaces/feedback.interface";
import { UpdateFeedbackQus } from "./(components)/UpdateFeedBackQus";
import { useToast } from "@/components/ui/use-toast";

////////////////// components //////////////////
export default function UserPage() {
  //========================= states =======================
  const [feedbackQus, setFeedbackQus] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // function==============================

  useEffect(() => {
    getData(setFeedbackQus, "feedback/list", setLoading);
  }, []);

  async function refetch() {
    getData(setFeedbackQus, "feedback/list", setLoading);
  }

  //============= render =================

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-14">
        <div className="grid  auto-rows-max items-start gap-4 md:gap-8 ">
          <Card x-chunk="dashboard-05-chunk-3" className="col-span-2">
            <CardHeader className="px-7 ">
              <div className="flex  justify-between">
                <div>
                  <CardTitle>Mange Feedbacks</CardTitle>
                  <CardDescription>
                    Upcoming feedbackQus Lorem, ipsum dolor.
                  </CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-2 capitalize">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        Create New Feedback Question
                      </Button>
                    </DialogTrigger>
                    <CreateFeedbackQus
                      refetch={refetch}
                      setLoading={setLoading}
                    />
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sl No.</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Category
                    </TableHead>
                    <TableHead className=" sm:table-cell">Status</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbackQus?.map((item, i) => (
                    <TableRow key={item._id} className="bg-accent">
                      <TableCell className="hidden sm:table-cell">
                        {i + 1}
                      </TableCell>
                      <TableCell>
                        <div className=" capitalize">{item?.question}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {item.type}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {item.category}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {item?.status}
                      </TableCell>

                      <TableCell className=" flex items-center justify-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Pen className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <UpdateFeedbackQus
                            refetch={refetch}
                            setLoading={setLoading}
                            feedbackData={item}
                          />
                        </Dialog>

                        <Button
                          onClick={() => {
                            DeleteData(
                              "feedback",
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
