"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import Cookies from "js-cookie";
import { BASE_URL } from "@/lib/services/api/fetchers";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const { currentUserFromStore } = useCurrentUser() 
 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const token = Cookies.get("authToken");
  const navigate = useRouter();

  useEffect(() => {
    if (currentUserFromStore) {
      setUsername(currentUserFromStore.username || "");
      setEmail(currentUserFromStore.email || "");
      setContact(currentUserFromStore.contact || "");
    }
  }, [currentUserFromStore]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${BASE_URL}/api/v1/user/update`,
        { username,  email,  contact },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      setMessage(res.data.message);
      navigate.push("/profile")
      
      console.log("from userupdate", res.data.message);
    } catch (error) {
      setMessage("Something went wrong");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="flex justify-center  min-h-screen px-4">
      <div className="w-full max-w-2xl  p-8 ">
        <h1 className="text-2xl font-semibold text-primary mb-6 text-center font-serif">
          Edit Profile
        </h1>

        {message && (
          <p className="text-center text-green-600 font-medium mb-4">
            {message}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-black">UserName</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-2 border-b-2 border-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 border-b-2 border-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-black">Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="py-2 border-b-2 border-primary focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
