"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useNotificationStore from "@/stores/notificationStore";

export function NotificationSheet() {
  const { notificationSheetState, toggleNotificationSheet, notifications } =
    useNotificationStore();
   
  console.log('stored noties',notifications);
  
  return (
    <Sheet open={notificationSheetState}>
      <SheetContent className="min-w-[500px] space-y-5">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        {notifications &&
          notifications.map((notification) => (
            <div key={notification.id} className="notifications-wraper w-full">
              <Card>
                <CardHeader>
                  <CardTitle className="tracking-wide">{notification.title}</CardTitle>
                  <CardDescription>{notification.description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        <SheetFooter className="py-3 ">
          <SheetClose>
            <Button
              onClick={() => toggleNotificationSheet(false)}
              variant={"secondary"}
            >
              Go Back
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
