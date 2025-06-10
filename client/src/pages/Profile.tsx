import { useEffect, useState } from "react";
import { BiBook, BiCog } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const { status, currentUser } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser && status !== "loading") navigate("/login");
  }, [currentUser, navigate, status]);

  return (
    <div className="flex items-center justify-center mt-30 p-6">
      <div className="max-w-4xl flex-1 border-2 border-[#264143] rounded-2xl shadow-[6px_6px_0px_#e99f4c] p-12 bg-white bg-opacity-90 backdrop-blur-lg animate-fadeIn transition-all duration-300">
        {/* Header Section */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-[#e99f4c]">
          <h3 className="text-[#264143] font-black text-xl sm:text-4xl drop-shadow-md">
            Profile
          </h3>
          <h5 className="text-gray-600 text-lg">
            Welcome back,{" "}
            <span className="font-semibold">{currentUser?.username}</span>
          </h5>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mt-6 border-b-2 border-[#e99f4c]">
          {["Profile", "My Books", "Settings"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-lg font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "border-b-4 border-[#de5499] text-[#de5499]"
                  : "text-gray-500 hover:text-[#de5499]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "Profile" && (
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center text-center md:border-r-2 border-[#e99f4c] pr-8">
                <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-[#e99f4c] bg-gradient-to-r from-[#de5499] to-[#e99f4c] text-white shadow-lg">
                  {currentUser ? (
                    <img src={currentUser.image} alt="user image" />
                  ) : (
                    <CiUser className="text-4xl" />
                  )}
                </div>
                <h4 className="mt-4 text-xl font-semibold text-[#264143]">
                  {currentUser?.firstName} {currentUser?.lastName}
                </h4>
                <p className="text-gray-600 text-sm">{currentUser?.email}</p>
              </div>
              {/* User Info Section */}
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#264143]">
                  <div>
                    <h6 className="font-semibold">Full Name:</h6>
                    <p className="text-gray-700">
                      {currentUser?.firstName} {currentUser?.lastName}
                    </p>
                  </div>
                  <div>
                    <h6 className="font-semibold">name:</h6>
                    <p className="text-gray-700">
                      {" "}
                      {currentUser?.maidenName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h6 className="font-semibold">Gender:</h6>
                    <p className="text-gray-700">{currentUser?.gender}</p>
                  </div>
                  <div>
                    <h6 className="font-semibold">
                      Phone:{currentUser?.phone}
                    </h6>
                  </div>
                  <div>
                    <h6 className="font-semibold">
                      Location: {currentUser?.address?.address}
                    </h6>
                    <p className="text-gray-700">
                      {currentUser?.address?.city},{" "}
                      {currentUser?.address?.stateCode}(
                      {currentUser?.address?.country})
                    </p>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                  <button className="px-6 py-2 text-[15px] font-extrabold bg-[#de5499] rounded-xl shadow-[3px_3px_0px_0px_#e99f4c] hover:opacity-90 focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#e99f4c]">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "My Books" && (
            <div className="text-center text-gray-700">
              <BiBook className="mx-auto text-6xl text-[#de5499]" />
              <h3 className="mt-4 text-xl font-semibold">Your Saved Books</h3>
              <p className="text-sm text-gray-600 mt-2">
                No books added yet. Start saving books to your collection!
              </p>
            </div>
          )}

          {activeTab === "Settings" && (
            <div className="text-center text-gray-700">
              <BiCog className="mx-auto text-6xl text-[#de5499]" />
              <h3 className="mt-4 text-xl font-semibold">Account Settings</h3>
              <p className="text-sm text-gray-600 mt-2">
                Manage your account settings and preferences.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
