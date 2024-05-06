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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IEvent } from "@/lib/interfaces/event.interface";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  eventData: any;
  setEventData: (eventData: IEvent) => void;
  currentItem: string;
}

////////////////// component //////////////////
export function CreateSchedule({
  eventData,
  setEventData,
  currentItem,
}: IProps) {
  // states ===========================
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const startTimeString = startTime.toString();
    const endTimeString = endTime.toString();
    let oldArray = [...eventData[currentItem]];

    oldArray.push({
      title: title,
      date: date?.toDateString(),
      scheduleTime: `${startTimeString}-${endTimeString}`,
    });

    setEventData({
      ...eventData,
      [currentItem]: oldArray,
    });

    e.target.reset();
  }

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle className="uppercase">Add New {currentItem}</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              type="text"
              className="col-span-3"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Date
            </Label>
            <div className="w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Start Time
            </Label>
            <Input
              id="name"
              type="time"
              className="col-span-3"
              defaultValue={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              End Time
            </Label>
            <Input
              id="name"
              type="time"
              className="col-span-3"
              defaultValue={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
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
