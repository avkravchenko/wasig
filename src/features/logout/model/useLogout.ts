import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { clearAuthTokens } from "@/shared/lib/auth";
import { useAuthStore } from "@/shared/lib/authStore";

const useLogout = () => {
  const queryClient = useQueryClient();
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await clearAuthTokens();
      queryClient.clear();
      setUnauthenticated();
    } catch {
      setIsLoggingOut(false);
    }
  };

  return {
    isLoggingOut,
    logout,
  };
};

export default useLogout;
