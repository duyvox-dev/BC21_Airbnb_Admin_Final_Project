import React from "react";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
export default function Loading() {
    const { loading } = useSelector((state) => state.loadingSlice);
    return (
        <>
            {loading ? (
                <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center">
                    <PacmanLoader color="#f43f5e" size="50px" loading={true} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
