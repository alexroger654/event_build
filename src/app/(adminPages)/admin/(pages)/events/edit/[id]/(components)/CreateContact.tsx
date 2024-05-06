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
export function CreateContact({
  eventData,
  setEventData,
  currentItem,
}: IProps) {
  // states ===========================
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    let oldArray = [...eventData[currentItem]];

    oldArray.push({
      name,
      phone,
      location,
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
              name
            </Label>
            <Input
              id="name"
              type="text"
              className="col-span-3"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              phone
            </Label>
            <Input
              id="name"
              type="text"
              className="col-span-3"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              location
            </Label>
            <Input
              id="name"
              type="text"
              className="col-span-3"
              defaultValue={location}
              onChange={(e) => setLocation(e.target.value)}
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
