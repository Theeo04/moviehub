interface AvatarProps {
  name: string;
  size?: number;
  isOnline?: boolean;
}

const colors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

function stringToColorIndex(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % colors.length;
}

export default function Avatar({ name, size = 40 }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const colorClass = colors[stringToColorIndex(name)];

  return (
    <div
      className={`${colorClass} rounded-full flex items-center justify-center text-white font-semibold select-none`}
      style={{ width: size, height: size, fontSize: size / 2 }}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );
}
