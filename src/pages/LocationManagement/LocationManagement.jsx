import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LocationManagement() {
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);
  return <div>LocationManagement</div>;
}
