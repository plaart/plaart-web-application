type Size = "xs" | "sm" | "md" | "lg";

interface UserAvatarProps {
  user: { name: string };
  size?: Size;
}

const sizeClasses: Record<Size, string> = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};
const UserAvatar = ({ user, size = "sm" }: UserAvatarProps) => {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium`}>
      {initials}
    </div>
  );
};

export default UserAvatar;
