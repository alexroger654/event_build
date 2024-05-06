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

import { useState } from "react";
import { cn } from "@/lib/utils";
import { type } from "os";
import { createData } from "@/lib/commonFunctions";
import { useToast } from "@/components/ui/use-toast";

interface IProps {
  refetch: () => void;
  setLoading: (loading: boolean) => void;
}

////////////////// component //////////////////
export function CreateFeedbackQus({ refetch, setLoading }: IProps) {
  // states ===========================

  const [questionData, setQuestionData] = useState({
    question: "",
    type: "text",
    category: "HOTELS",
  });

  //hooks ====================
  const { toast } = useToast();

  async function handleSubmit(e: any) {
    e.preventDefault();

    const result = await createData(
      questionData,
      "feedback",
      setLoading,
      refetch
    );
    if (result) {
      toast({
        description: "Question created successfully",
      });
    }

    e.target.reset();
  }

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle className="uppercase">Add New Question</DialogTitle>
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
              Category
            </Label>
            <RadioGroup defaultValue={questionData.category}>
              <div
                onClick={() =>
                  setQuestionData({ ...questionData, category: "OVERALL" })
                }
                className={`  
                ${
                  questionData.category === "OVERALL"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60"
                }
                flex items-center space-x-2  shadow-sm py-3 border rounded-lg px-5 lg:w-[60%]`}
              >
                {/* <RadioGroupItem value="text" id="r1" /> */}
                <Label htmlFor="r1">OVERALL</Label>
              </div>
              <div
                onClick={() =>
                  setQuestionData({ ...questionData, category: "HOTELS" })
                }
                className={`  
                ${
                  questionData.category === "HOTELS"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60"
                }
                flex items-center space-x-2  shadow-sm py-3 border rounded-lg px-5 lg:w-[60%]`}
              >
                {/* <RadioGroupItem value="yesNo" id="r2" /> */}
                <Label htmlFor="r2">HOTELS</Label>
              </div>
              <div
                onClick={() =>
                  setQuestionData({ ...questionData, category: "TOUR_MANAGER" })
                }
                className={`  
                ${
                  questionData.category === "TOUR_MANAGER"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60"
                }
                flex items-center space-x-2  shadow-sm py-3 border rounded-lg px-5 lg:w-[60%]`}
              >
                {/* <RadioGroupItem value="rating" id="r3" /> */}
                <Label htmlFor="r3" className="w-full">
                  TOUR MANAGER
                </Label>
              </div>
              <div
                onClick={() =>
                  setQuestionData({ ...questionData, category: "TRANSPORT" })
                }
                className={`  
                ${
                  questionData.category === "TRANSPORT"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60"
                }
                flex items-center space-x-2  shadow-sm py-3 border rounded-lg px-5 lg:w-[60%]`}
              >
                {/* <RadioGroupItem value="rating" id="r3" /> */}
                <Label htmlFor="r3" className="w-full">
                  TRANSPORT
                </Label>
              </div>
              <div
                onClick={() =>
                  setQuestionData({
                    ...questionData,
                    category: "AIRPORT_SERVICES",
                  })
                }
                className={`  
                ${
                  questionData.category === "AIRPORT_SERVICES"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60"
                }
                flex items-center space-x-2  shadow-sm py-3 border rounded-lg px-5 lg:w-[60%]`}
              >
                {/* <RadioGroupItem value="rating" id="r3" /> */}
                <Label htmlFor="r3" className="w-full">
                  AIRPORT SERVICES
                </Label>
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
