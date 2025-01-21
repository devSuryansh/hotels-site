import { Bell, User } from "lucide-react";

export const TopNav = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center">
            <button className="p-2 mr-4 text-gray-600 hover:text-gray-800">
              <Bell size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
