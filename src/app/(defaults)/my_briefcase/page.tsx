import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Upload } from "lucide-react";
export default function Page() {
  return (
    <section className="w-full min-h-[80vh] flex lg:items-center justify-center py-8 lg:py-0 ">
      <div className="">
        <Card
          className="overflow-hidden w-[350] lg:w-[550px]"
          x-chunk="dashboard-05-chunk-4"
        >
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                My Briefcase
              </CardTitle>
              <CardDescription>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Passport</div>
              <div className="flex items-center justify-between">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt=""
                  className="w-14 h-14 rounded-lg"
                />
                <button className="flex aspect-square w-12 items-center justify-center rounded-md border border-dashed">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </button>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="font-semibold">Photo</div>
              <div className="flex items-center justify-between">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt=""
                  className="w-14 h-14 rounded-lg"
                />
                <button className="flex aspect-square w-12 items-center justify-center rounded-md border border-dashed">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </button>
              </div>
            </div>

            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">My Documents</div>
              <div className="flex items-center justify-between ">
                <p className="font-semibold">Itinerary </p>
                <button className="flex aspect-square w-12 items-center justify-center rounded-md border border-dashed">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Copy</span>
                </button>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between ">
                <p className="font-semibold">visa </p>
                <button className="flex aspect-square w-12 items-center justify-center rounded-md border border-dashed">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Copy</span>
                </button>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between ">
                <p className="font-semibold">insurance </p>
                <button className="flex aspect-square w-12 items-center justify-center rounded-md border border-dashed">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Copy</span>
                </button>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between ">
                <p className="font-semibold">Air ticket </p>
                <button className="flex aspect-square w-12 items-center justify-center rounded-md border border-dashed">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Copy</span>
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">-</div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
