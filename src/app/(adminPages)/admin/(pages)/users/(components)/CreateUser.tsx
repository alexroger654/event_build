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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
export function CreateUser({ refetch, setLoading }: IProps) {
  // states ===========================

  const [excelFile, setExcelFile] = useState<any>(null);
  const [userGroupName, setUserGroupName] = useState<any>("");

  //hooks ====================
  const { toast } = useToast();

  async function handleUserCreation() {
    setLoading(true);
    //handle excel file
    if (!excelFile) {
      return;
    }
    const data = new FormData();
    data.set("file", excelFile);
    const res = await fetch("/api/handelExcelFile", {
      method: "POST",
      body: data,
    });

    const jsonData = await res.json();

    console.log(jsonData);
    if (!jsonData.success) {
      console.error(jsonData.error);
      return;
    }

    console.log(jsonData);

    // handle signUp

    let formattedData = jsonData?.data?.map((item: any) => {
      return {
        userGroupName: userGroupName,
        eventUserId: item?.id,
        salutation: item?.salutation,
        firstName: item["first name"],
        surname: item?.surname,
        phone: item["passenger contact"],
        city: item?.city,
        state: item?.state,
        flightFrom: item["flight from / hub"],
        passportNo: item["passport no:"],
        dob: item?.dob,
        arrivalFlightName: item["flight name"],
        arrivalFlightNo: item["flight no:"],
        arrivalDate: item["arrival date"],
        departureDate: item["departure date"],
        departureFlightName: item["flight no:_1"],
        departureFlightNo: item["flight no:_1"],
      };
    });

    console.log(formattedData, "-------------------0--------------------");

    const regRes = await fetch(
      `http://localhost:4000/api/v1/user/create_bulk`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      }
    );

    const regData = await regRes.json();

    if (regData.status === "success") {
      refetch();
      toast({
        title: "Users created successfully",
      });
    }

    setLoading(false);
  }

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle className="uppercase">Create users</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <div>
        <Card x-chunk="dashboard-07-chunk-3" className="">
          <CardContent>
            <div className="grid gap-4 mt-5">
              <div className="grid gap-2">
                <Label htmlFor="name">Group Name / Company Name</Label>
                <Input
                  id="name"
                  type="text"
                  className="w-full"
                  defaultValue={userGroupName}
                  onChange={(e) => setUserGroupName(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Excel File</Label>
                <Input
                  id="picture"
                  type="file"
                  className="w-full"
                  onChange={(e) => {
                    if (e.target.files) {
                      setExcelFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="justify-center border-t p-4">
            <DialogClose asChild>
              <Button onClick={handleUserCreation} className="mr-2 w-full">
                Add
              </Button>
            </DialogClose>
          </CardFooter>
        </Card>
      </div>
    </DialogContent>
  );
}
