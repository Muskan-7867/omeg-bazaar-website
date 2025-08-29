import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/fetchers";
import { CurrentUser } from "../types/auth";
import useCurrentUserStore from "../store/User/user.store";
import Cookies from "js-cookie";

const useCurrentUser = () => {
  const { 
    setCurrentUserForStore, 
    currentUserFromStore, 
    setIsLoggined, 
    reFetch, 
    fetch 
  } = useCurrentUserStore();
   const [loading, setLoading] = useState(true);

  const allocateCurrentUser = (user: CurrentUser | null) => {
    setCurrentUserForStore(user);
    setIsLoggined(!!user); 
  };

    const refetchCurrentUser = async () => {
    await fetchUser();
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        // No token means user is logged out
        setIsLoggined(false);
        allocateCurrentUser(null);
        return;
      }

      const user = await fetchCurrentUser(token);
      if (user) {
        setIsLoggined(true);
        allocateCurrentUser(user as CurrentUser);
      } else {
        // Invalid token or no user returned
        setIsLoggined(false);
        allocateCurrentUser(null);
      }
    } catch (error) {
      console.log("Error fetching user:", error);
      setIsLoggined(false);
      allocateCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (fetch) {
      fetchUser();
    }
  }, [fetch]);

  return {
    currentUserFromStore,
    fetchUser,
    allocateCurrentUser,
    reFetch,
    loading,
    refetchCurrentUser,
  };
};

export default useCurrentUser;