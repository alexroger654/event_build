"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy, Download, Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getData } from "@/lib/commonFunctions";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";

export default function Page() {
  //======================= states====================
  const [loading, setLoading] = useState(false);
  const [userDate, setUserDate] = useState({
    salutation: "",
    firstName: "",
    surname: "",
    eventId: "",
    email: "",
    phone: "",
    companyName: "",
    userGroupName: "",
    bio: "",
    profileImageUrl: "",
    dateOfBirth: "",
    shopName: "",
    mealPreference: "",
    city: "",
    state: "",
    zone: "",
    totalMembers: 0,
    internationalHub: "",
    panCardImageUrl: "",
    passportImageUrl: "",
    passportSizeImageUrl: "",
    bookmarks: [],
    gender: "",
    passengerContact: "",
    flightFrom: "",
    passportNo: "",
    dob: "",
    arrivalFlightName: "",
    arrivalFlightNo: "",
    arrivalDate: "",
    departureDate: "",
    departureFlightName: "",
    departureFlightNo: "",
    airTicketUrl: "",
    insuranceUrl: "",
    visaImageUrl: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") as string);

    const result = getData(
      setUserDate,
      `user/list?id=${userData?.id}`,
      setLoading
    );
  }, []);

  const userInputFields = [
    {
      label: "salutation",
      type: "text",
      defaultValue: userDate.salutation,
      onchange: (e: any) =>
        setUserDate({ ...userDate, salutation: e.target.value }),
    },
    {
      label: "firstName",
      type: "text",
      defaultValue: userDate.firstName,
      onchange: (e: any) =>
        setUserDate({ ...userDate, firstName: e.target.value }),
    },
    {
      label: "surname",
      type: "text",
      defaultValue: userDate.surname,
      onchange: (e: any) =>
        setUserDate({ ...userDate, surname: e.target.value }),
    },
    {
      label: "eventId",
      type: "text",
      defaultValue: userDate.eventId,
      onchange: (e: any) =>
        setUserDate({ ...userDate, eventId: e.target.value }),
    },
    {
      label: "email",
      type: "email",
      defaultValue: userDate.email,
      onchange: (e: any) => setUserDate({ ...userDate, email: e.target.value }),
    },
    {
      label: "phone",
      type: "tel",
      defaultValue: userDate.phone,
      onchange: (e: any) => setUserDate({ ...userDate, phone: e.target.value }),
    },
    {
      label: "companyName",
      type: "text",
      defaultValue: userDate.companyName,
      onchange: (e: any) =>
        setUserDate({ ...userDate, companyName: e.target.value }),
    },
    {
      label: "userGroupName",
      type: "text",
      defaultValue: userDate.userGroupName,
      onchange: (e: any) =>
        setUserDate({ ...userDate, userGroupName: e.target.value }),
    },

    {
      label: "bio",
      type: "text",
      defaultValue: userDate.bio,
      onchange: (e: any) => setUserDate({ ...userDate, bio: e.target.value }),
    },
    {
      label: "profileImageUrl",
      type: "text",
      defaultValue: userDate.profileImageUrl,
      onchange: (e: any) =>
        setUserDate({ ...userDate, profileImageUrl: e.target.value }),
    },
    {
      label: "dateOfBirth",
      type: "date",
      defaultValue: userDate.dateOfBirth,
      onchange: (e: any) =>
        setUserDate({ ...userDate, dateOfBirth: e.target.value }),
    },
    {
      label: "shopName",
      type: "text",
      defaultValue: userDate.shopName,
      onchange: (e: any) =>
        setUserDate({ ...userDate, shopName: e.target.value }),
    },
    {
      label: "mealPreference",
      type: "text",
      defaultValue: userDate.mealPreference,
      onchange: (e: any) =>
        setUserDate({ ...userDate, mealPreference: e.target.value }),
    },
    {
      label: "city",
      type: "text",
      defaultValue: userDate.city,
      onchange: (e: any) => setUserDate({ ...userDate, city: e.target.value }),
    },
    {
      label: "state",
      type: "text",
      defaultValue: userDate.state,
      onchange: (e: any) => setUserDate({ ...userDate, state: e.target.value }),
    },
    {
      label: "zone",
      type: "text",
      defaultValue: userDate.zone,
      onchange: (e: any) => setUserDate({ ...userDate, zone: e.target.value }),
    },
    {
      label: "totalMembers",
      type: "number",
      defaultValue: userDate.totalMembers,
      onchange: (e: any) =>
        setUserDate({ ...userDate, totalMembers: parseInt(e.target.value) }),
    },
    {
      label: "internationalHub",
      type: "text",
      defaultValue: userDate.internationalHub,
      onchange: (e: any) =>
        setUserDate({ ...userDate, internationalHub: e.target.value }),
    },
    {
      label: "panCardImageUrl",
      type: "text",
      defaultValue: userDate.panCardImageUrl,
      onchange: (e: any) =>
        setUserDate({ ...userDate, panCardImageUrl: e.target.value }),
    },
    {
      label: "passportImageUrl",
      type: "text",
      defaultValue: userDate.passportImageUrl,
      onchange: (e: any) =>
        setUserDate({ ...userDate, passportImageUrl: e.target.value }),
    },
    {
      label: "passportSizeImageUrl",
      type: "text",
      defaultValue: userDate.passportSizeImageUrl,
      onchange: (e: any) =>
        setUserDate({ ...userDate, passportSizeImageUrl: e.target.value }),
    },
    {
      label: "bookmarks",
      type: "array",
      defaultValue: userDate.bookmarks,
      onchange: (e: any) =>
        setUserDate({ ...userDate, bookmarks: e.target.value.split(",") }),
    },
    {
      label: "gender",
      type: "text",
      defaultValue: userDate.gender,
      onchange: (e: any) =>
        setUserDate({ ...userDate, gender: e.target.value }),
    },
    {
      label: "passengerContact",
      type: "text",
      defaultValue: userDate.passengerContact,
      onchange: (e: any) =>
        setUserDate({ ...userDate, passengerContact: e.target.value }),
    },
    {
      label: "flightFrom",
      type: "text",
      defaultValue: userDate.flightFrom,
      onchange: (e: any) =>
        setUserDate({ ...userDate, flightFrom: e.target.value }),
    },
    {
      label: "passportNo",
      type: "text",
      defaultValue: userDate.passportNo,
      onchange: (e: any) =>
        setUserDate({ ...userDate, passportNo: e.target.value }),
    },
    {
      label: "dob",
      type: "date",
      defaultValue: userDate.dob,
      onchange: (e: any) => setUserDate({ ...userDate, dob: e.target.value }),
    },
    {
      label: "arrivalFlightName",
      type: "text",
      defaultValue: userDate.arrivalFlightName,
      onchange: (e: any) =>
        setUserDate({ ...userDate, arrivalFlightName: e.target.value }),
    },
    {
      label: "arrivalFlightNo",
      type: "text",
      defaultValue: userDate.arrivalFlightNo,
      onchange: (e: any) =>
        setUserDate({ ...userDate, arrivalFlightNo: e.target.value }),
    },
    {
      label: "arrivalDate",
      type: "date",
      defaultValue: userDate.arrivalDate,
      onchange: (e: any) =>
        setUserDate({ ...userDate, arrivalDate: e.target.value }),
    },
    {
      label: "departureDate",
      type: "date",
      defaultValue: userDate.departureDate,
      onchange: (e: any) =>
        setUserDate({ ...userDate, departureDate: e.target.value }),
    },
    {
      label: "departureFlightName",
      type: "text",
      defaultValue: userDate.departureFlightName,
      onchange: (e: any) =>
        setUserDate({ ...userDate, departureFlightName: e.target.value }),
    },
    {
      label: "departureFlightNo",
      type: "text",
      defaultValue: userDate.departureFlightNo,
      onchange: (e: any) =>
        setUserDate({ ...userDate, departureFlightNo: e.target.value }),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="w-full min-h-[80vh] flex lg:items-center justify-center py-8 lg:py-0 ">
      <div className="w-full px-3 lg:px-10">
        <Card className="overflow-hidden w-full" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Edit Profile
              </CardTitle>
              <CardDescription>Edit User Profile</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <form className="grid  grid-cols-1 lg:grid-cols-3 items-start gap-4 lg:gap-8">
              {userInputFields?.map((item, i) => (
                <div key={i} className="grid gap-2">
                  <Label htmlFor="email" className="capitalize">
                    {item?.label}
                  </Label>
                  <Input
                    type={item.type}
                    id="email"
                    defaultValue={item.defaultValue}
                    onChange={item.onchange}
                  />
                </div>
              ))}

              <Button type="submit" className="col-span-full w-20 mt-5">
                Update
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">-</div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
