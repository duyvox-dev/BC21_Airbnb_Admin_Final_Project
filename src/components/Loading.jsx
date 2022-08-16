import React from "react";
import { useSelector } from "react-redux";
import { RotateLoader } from "react-spinners";
export default function Loading() {
    const { loading } = useSelector((state) => state.loadingSlice);
    return (
        <>
            {loading ? (
                <div className=" fixed top-0 left-0 z-10 w-full h-full flex items-center justify-center">
                    <RotateLoader color="#f43f5e" loading={true} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
