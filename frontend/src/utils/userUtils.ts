const getRoleColor = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "from-red-500 to-pink-600";
    case "MANAGER":
      return "from-yellow-500 to-orange-600";
    case "USER":
      return "from-green-500 to-blue-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};
const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "bg-red-100 text-red-800";
    case "MANAGER":
      return "bg-yellow-100 text-yellow-800";
    case "USER":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export { getRoleColor, getRoleBadgeColor };
