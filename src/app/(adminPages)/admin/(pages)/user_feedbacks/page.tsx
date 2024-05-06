"use client";

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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FeedbackDetails from "./(components)/FeedbackDetails";
import { getData } from "@/lib/commonFunctions";
import { IFeedback } from "@/lib/interfaces/feedback.interface";
import { useState, useEffect } from "react";
import { IUserFeedbacks } from "@/lib/interfaces/user_feedback.interface";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import Link from "next/link";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<IUserFeedbacks[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // function==============================

  useEffect(() => {
    getData(
      setFeedback,
      `user_feedback/list?limit=10&page=${currentPage}`,
      setLoading
    );
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-14 ">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8  ">
          <Card
            x-chunk="dashboard-05-chunk-3"
            className="col-span-2 min-h-[80vh]"
          >
            <CardHeader className="px-7">
              <CardTitle>User Feedbacks</CardTitle>

              <div className="ml-auto flex items-center gap-2 capitalize">
                {feedback.length >= 10 && (
                  <>
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
                  </>
                )}
                <Link href="/admin/create_feedback">
                  <Button>Create Feedback Questions</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Name</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Event Name
                    </TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedback?.map((item, i) => (
                    <TableRow key={item?._id} className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{item?.userName}</div>
                      </TableCell>

                      <TableCell className="">{item?.eventName}</TableCell>
                      <TableCell className="text-right">
                        <Sheet>
                          <SheetTrigger>
                            <Button size="sm">View Details</Button>
                          </SheetTrigger>
                          <FeedbackDetails data={item} />
                        </Sheet>
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
