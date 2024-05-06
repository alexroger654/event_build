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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IEvent } from "@/lib/interfaces/event.interface";
import { useState } from "react";

interface IProps {
  eventData: any;
  setEventData: (eventData: IEvent) => void;
  currentItem: string;
}

////////////////// component //////////////////
export function CreateList({ eventData, setEventData, currentItem }: IProps) {
  // states ===========================
  const [content, setContent] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    let oldArray = [...eventData[currentItem]];

    if (content) {
      oldArray.push(content);
    }

    setEventData({
      ...eventData,
      [currentItem]: oldArray,
    });

    e.target.reset();
    setContent("");
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
              Content
            </Label>
            <Textarea
              id="name"
              className="col-span-3"
              defaultValue={content}
              onChange={(e) => setContent(e.target.value)}
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
