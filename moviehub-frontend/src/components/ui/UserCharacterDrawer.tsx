import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Avatar from "./Avatar";

const allUsers = [
  { name: "John Doe", character: "Darth Vader" },
  { name: "Jane Smith", character: "Hermione Granger" },
  { name: "Rick Sanchez", character: "Iron Man" },
  { name: "Alice Johnson", character: "Lara Croft" },
  { name: "Bob Lee", character: "Gandalf" },
  { name: "Ellen Page", character: "Katniss Everdeen" },
  { name: "Mark Twain", character: "Sherlock Holmes" },
  { name: "Laura Palmer", character: "Wonder Woman" },
  { name: "Tony Stark", character: "Deadpool" },
  { name: "Clark Kent", character: "Superman" },
];

function getRandomSubset(arr: typeof allUsers, count: number) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function UserCharacterDrawer() {
  const [users, setUsers] = useState(() => getRandomSubset(allUsers, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(getRandomSubset(allUsers, 5));
    }, 10000); // la fiecare 10 secunde

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="block lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="fixed bottom-4 right-4 z-50">
            Useri & Personaje
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>Useri & Personaje</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-3 px-4">
            {users.map((user, index) => (
              <Card
                key={index}
                className="py-1 px-3 flex items-center gap-4"
              >
                <Avatar name={user.name} size={32} />
                <div>
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs italic text-muted-foreground">
                    {user.character}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
