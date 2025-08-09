import { useState, useEffect } from "react";
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

export default function UserCharacterList() {
  const [users, setUsers] = useState(() => getRandomSubset(allUsers, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(getRandomSubset(allUsers, 5));
    }, 10000); // 10 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden lg:block fixed right-0 top-16 w-64 h-[calc(100vh-4rem)] px-4 overflow-y-auto border-l border-gray-200 bg-white z-40">
      <Card className="p-4 space-y-4 border-none shadow-none bg-transparent">
        <h2 className="text-xl font-semibold">Useri & Personaje</h2>
        <ul className="space-y-3">
          {users.map((user, index) => (
            <li key={index} className="pb-2 flex items-center gap-3">
              <Avatar name={user.name} isOnline={true} />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm italic text-muted-foreground">
                  {user.character}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
