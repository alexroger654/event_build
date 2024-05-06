import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { IUserFeedbacks } from "@/lib/interfaces/user_feedback.interface";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function FeedbackDetails({ data }: { data: IUserFeedbacks }) {
  return (
    <>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> Feedback Details</SheetTitle>

          <SheetDescription className="">
            {data?.feedbacks?.map((item, i) => (
              <div key={i}>
                <div className="pb-2">
                  <p className="font-semibold capitalize pb-2 ">
                    {item.question}
                  </p>

                  <p className="mt-2 ">
                    {item.answer ? item.answer : "no answer"}
                  </p>
                </div>
                <Separator />
              </div>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </>
  );
}
