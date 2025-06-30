"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "@/store/userSlice";

const SessionSync = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(login({ name: session?.user?.name || "" }));
    } else if (status === "unauthenticated") {
      dispatch(logout());
    }
  }, [session, status]);

  return null;
};

export default SessionSync;
