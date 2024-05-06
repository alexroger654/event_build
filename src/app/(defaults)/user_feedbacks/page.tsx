"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createData, getData } from "@/lib/commonFunctions";
import { IFeedback } from "@/lib/interfaces/feedback.interface";
import { IUserFeedbacks } from "@/lib/interfaces/user_feedback.interface";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

//=================== components =====================
export default function Page() {
  //========================= states =======================
  const [feedbackQus, setFeedbackQus] = React.useState<IFeedback[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [userFeedBacks, setUserFeedBacks] = React.useState<IUserFeedbacks>({
    userName: "",
    userId: "",
    eventName: "",
    eventId: "",
    feedbacks: [],
  });

  //hooks======================================
  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    getData(setFeedbackQus, "feedback/list", setLoading);
  }, []);

  React.useEffect(() => {
    if (feedbackQus.length) {
      let qusWithEmptyAns = feedbackQus.map((feedback) => {
        return {
          question: feedback.question,
          answer: "", // Initially set answer to empty string
        };
      });

      setUserFeedBacks({
        ...userFeedBacks,
        feedbacks: qusWithEmptyAns,
      });
    }
  }, [feedbackQus?.length]);

  // function==============================

  // Function to handle setting answer for a question
  const setAnswer = (question: string, answer: string) => {
    setUserFeedBacks((prevState) => ({
      ...prevState,
      feedbacks: prevState.feedbacks.map((feedback) => {
        if (feedback.question === question) {
          return { ...feedback, answer: answer };
        }
        return feedback;
      }),
    }));
  };

  async function handleCreateFeedback() {
    const userData = JSON.parse(localStorage.getItem("user") as string);

    const data = {
      userName: userData.name,
      userId: userData._id,
      eventName: userData.eventName,
      eventId: userFeedBacks.eventId,
      feedbacks: userFeedBacks.feedbacks,
    };

    const result = await createData(data, "user_feedback", setLoading);
    if (result) {
      router.push("/");
      toast({
        description: "Thank you for your feedback",
      });
    }
  }

  //========================= render ======================

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center p-5">
      <Card className="w-full lg:w-[750px]">
        <CardHeader>
          <CardTitle>Help Us Improve Our Services</CardTitle>
          <CardDescription>
            We Thank You For The Time Spent To Give Your Feedback On Your Tour.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle>Airport Services:</CardTitle>

          {feedbackQus.length > 0 &&
            feedbackQus
              ?.filter((i) => i.category === "AIRPORT_SERVICES")
              .map((feedbackQus) => (
                <div key={feedbackQus._id}>
                  <CardDescription className="py-5 capitalize">
                    {feedbackQus.question}
                  </CardDescription>
                  {feedbackQus.type == "yesNo" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "yes"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "yes")} // Set answer to "yes" on click
                      >
                        Yes
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "no"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "no")} // Set answer to "no" on click
                      >
                        No
                      </p>
                    </CardDescription>
                  )}
                  {feedbackQus.type == "text" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <Input
                        type="text"
                        placeholder="Enter you taught"
                        onChange={(e) =>
                          setAnswer(feedbackQus.question, e.target.value)
                        }
                      />
                    </CardDescription>
                  )}
                  {feedbackQus.type == "rating" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Good"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "Good")} // Set answer to "yes" on click
                      >
                        Good
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Average"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() =>
                          setAnswer(feedbackQus.question, "Average")
                        } // Set answer to "no" on click
                      >
                        Average
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Bad"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "Bad")}
                      >
                        Bad
                      </p>
                    </CardDescription>
                  )}
                </div>
              ))}
        </CardContent>
        <CardContent>
          <CardTitle>Transport / Vehicle:</CardTitle>

          {feedbackQus.length > 0 &&
            feedbackQus
              ?.filter((i) => i.category === "TRANSPORT")
              .map((feedbackQus) => (
                <div key={feedbackQus._id}>
                  <CardDescription className="py-5 capitalize">
                    {feedbackQus.question}
                  </CardDescription>
                  {feedbackQus.type == "yesNo" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "yes"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "yes")} // Set answer to "yes" on click
                      >
                        Yes
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "no"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "no")} // Set answer to "no" on click
                      >
                        No
                      </p>
                    </CardDescription>
                  )}
                  {feedbackQus.type == "text" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <Input
                        type="text"
                        placeholder="Enter you taught"
                        onChange={(e) =>
                          setAnswer(feedbackQus.question, e.target.value)
                        }
                      />
                    </CardDescription>
                  )}
                  {feedbackQus.type == "rating" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Good"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "Good")} // Set answer to "yes" on click
                      >
                        Good
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Average"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() =>
                          setAnswer(feedbackQus.question, "Average")
                        } // Set answer to "no" on click
                      >
                        Average
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Bad"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "Bad")}
                      >
                        Bad
                      </p>
                    </CardDescription>
                  )}
                </div>
              ))}
        </CardContent>
        <CardContent>
          <CardTitle>Tour Manager / Local Guide:</CardTitle>

          {feedbackQus.length > 0 &&
            feedbackQus
              ?.filter((i) => i.category === "TOUR_MANAGER")
              .map((feedbackQus) => (
                <div key={feedbackQus._id}>
                  <CardDescription className="py-5 capitalize">
                    {feedbackQus.question}
                  </CardDescription>
                  {feedbackQus.type == "yesNo" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "yes"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "yes")} // Set answer to "yes" on click
                      >
                        Yes
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "no"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "no")} // Set answer to "no" on click
                      >
                        No
                      </p>
                    </CardDescription>
                  )}
                  {feedbackQus.type == "text" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <Input
                        type="text"
                        placeholder="Enter you taught"
                        onChange={(e) =>
                          setAnswer(feedbackQus.question, e.target.value)
                        }
                      />
                    </CardDescription>
                  )}
                  {feedbackQus.type == "rating" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Good"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "Good")} // Set answer to "yes" on click
                      >
                        Good
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Average"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() =>
                          setAnswer(feedbackQus.question, "Average")
                        } // Set answer to "no" on click
                      >
                        Average
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Bad"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "Bad")}
                      >
                        Bad
                      </p>
                    </CardDescription>
                  )}
                </div>
              ))}
        </CardContent>
        <CardContent>
          <CardTitle>Hotels:</CardTitle>

          {feedbackQus.length > 0 &&
            feedbackQus
              ?.filter((i) => i.category === "HOTELS")
              .map((feedbackQus) => (
                <div key={feedbackQus._id}>
                  <CardDescription className="py-5 capitalize">
                    {feedbackQus.question}
                  </CardDescription>
                  {feedbackQus.type == "yesNo" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "yes"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "yes")} // Set answer to "yes" on click
                      >
                        Yes
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "no"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "no")} // Set answer to "no" on click
                      >
                        No
                      </p>
                    </CardDescription>
                  )}
                  {feedbackQus.type == "text" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <Input
                        type="text"
                        placeholder="Enter you taught"
                        onChange={(e) =>
                          setAnswer(feedbackQus.question, e.target.value)
                        }
                      />
                    </CardDescription>
                  )}
                  {feedbackQus.type == "rating" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Good"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "Good")} // Set answer to "yes" on click
                      >
                        Good
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Average"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() =>
                          setAnswer(feedbackQus.question, "Average")
                        } // Set answer to "no" on click
                      >
                        Average
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Bad"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "Bad")}
                      >
                        Bad
                      </p>
                    </CardDescription>
                  )}
                </div>
              ))}
        </CardContent>
        <CardContent>
          <CardTitle>OVERALL: </CardTitle>

          {feedbackQus.length > 0 &&
            feedbackQus
              ?.filter((i) => i.category === "OVERALL")
              .map((feedbackQus) => (
                <div key={feedbackQus._id}>
                  <CardDescription className="py-5 capitalize">
                    {feedbackQus.question}
                  </CardDescription>
                  {feedbackQus.type == "yesNo" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "yes"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "yes")} // Set answer to "yes" on click
                      >
                        Yes
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "no"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "no")} // Set answer to "no" on click
                      >
                        No
                      </p>
                    </CardDescription>
                  )}
                  {feedbackQus.type == "text" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <Input
                        type="text"
                        placeholder="Enter you taught"
                        onChange={(e) =>
                          setAnswer(feedbackQus.question, e.target.value)
                        }
                      />
                    </CardDescription>
                  )}
                  {feedbackQus.type == "rating" && (
                    <CardDescription className="flex items-center  space-x-3">
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Good"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "Good")} // Set answer to "yes" on click
                      >
                        Good
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Average"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() =>
                          setAnswer(feedbackQus.question, "Average")
                        } // Set answer to "no" on click
                      >
                        Average
                      </p>
                      <p
                        className={`${
                          userFeedBacks.feedbacks.find(
                            (feedback) =>
                              feedback.question === feedbackQus.question
                          )?.answer === "Bad"
                            ? "bg-primary text-primary-foreground "
                            : "bg-muted"
                        } py-3 px-5 border rounded-md`}
                        onClick={() => setAnswer(feedbackQus.question, "Bad")}
                      >
                        Bad
                      </p>
                    </CardDescription>
                  )}
                </div>
              ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleCreateFeedback}>Send</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
