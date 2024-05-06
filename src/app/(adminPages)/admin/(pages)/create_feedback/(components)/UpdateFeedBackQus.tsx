import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { type } from "os";
import { createData, updateData } from "@/lib/commonFunctions";
import { useToast } from "@/components/ui/use-toast";
import { IFeedback } from "@/lib/interfaces/feedback.interface";

interface IProps {
  refetch: () => void;
  feedbackData: IFeedback;
  setLoading: (loading: boolean) => void;
}

////////////////// component //////////////////
export function UpdateFeedbackQus({
  refetch,
  feedbackData,
  setLoading,
}: IProps) {
  // states ===========================

  const [questionData, setQuestionData] = useState({
    question: "",
    type: "text",
    status: "active",
  });

  //hooks ====================
  const { toast } = useToast();

  // use Effect

  useEffect(() => {
    if (feedbackData) {
      setQuestionData({
        question: feedbackData.question,
        type: feedbackData.type,
        status: feedbackData.status,
      });
    }
  }, [feedbackData]);

  //functions ====================

  async function handleSubmit(e: any) {
    e.preventDefault();

    const result = await updateData(
      questionData,
      "feedback",
      feedbackData?._id as string,
      setLoading
    );
    if (result) {
      refetch();
      toast({
        description: "Updated successfully",
      });
    }

    e.target.reset();
  }

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle className="uppercase">Update Question</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Question
            </Label>
            <Input
              id="name"
              type="text"
              className="col-span-3"
              defaultValue={questionData.question}
              onChange={(e) =>
                setQuestionData({ ...questionData, question: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Type
            </Label>
            <RadioGroup defaultValue={questionData.type}>
              <div
                onClick={() =>
                  setQuestionData({ ...questionData, type: "text" })
                }
                className={`  
                ${
                  questionData.type === "text"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60"
                }
                flex items-center space-x-2  shadow-sm py-3 border rounded-lg px-5 lg:w-[60%]`}
              >
                {/* <RadioGroupItem value="text" id="r1" /> */}
                <Label htmlFor="r1">Text</Label>
              </div>
              <div
                onClick={() =>
                  setQuestionData({ ...questionData, type: "yesNo" })
                }
                className={`  
                ${
                  questionData.type === "yesNo"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60"
                }
                flex items-center space-x-2  shadow-sm py-3 border rounded-lg px-5 lg:w-[60%]`}
              >
                {/* <RadioGroupItem value="yesNo" id="r2" /> */}
                <Label htmlFor="r2">Yes/No</Label>
              </div>
              <div
                onClick={() =>
                  setQuestionData({ ...questionData, type: "rating" })
                }
                className={`  
                ${
                  questionData.type === "rating"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60"
                }
                flex items-center space-x-2  shadow-sm py-3 border rounded-lg px-5 lg:w-[60%]`}
              >
                {/* <RadioGroupItem value="rating" id="r3" /> */}
                <Label htmlFor="r3" className="w-full">
                  Rating
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Status
            </Label>
            <RadioGroup defaultValue={questionData.type}>
              <div
                onClick={() =>
                  setQuestionData({ ...questionData, status: "active" })
                }
                className={`  
                ${
                  questionData.status === "active"
                    ? "bg-green-200 text-green-700"
                    : "bg-muted/60"
                }
                flex items-center space-x-2  shadow-sm py-3 border rounded-lg px-5 lg:w-[60%]`}
              >
                {/* <RadioGroupItem value="text" id="r1" /> */}
                <Label htmlFor="r1">Active</Label>
              </div>
              <div
                onClick={() =>
                  setQuestionData({ ...questionData, status: "disabled" })
                }
                className={`  
                ${
                  questionData.status === "disabled"
                    ? "bg-red-200 text-red-700"
                    : "bg-muted/60"
                }
                flex items-center space-x-2  shadow-sm py-3 border rounded-lg px-5 lg:w-[60%]`}
              >
                {/* <RadioGroupItem value="yesNo" id="r2" /> */}
                <Label htmlFor="r2">Disabled</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
