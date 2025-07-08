import React from "react";
import Header from "../components/header";

export function LandingPage () {

    return (
        <div className="grid grid-rows-[20%_1fr_1fr] grid-cols-3 gap-2 w-full h-full">
            <div className="row-start-1 col-span-3">
                <Header/>
            </div>
            <div className="row-start-2 bg-gray-700 p-4 text-center">Cell 1</div>
            <div className="row-start-2 bg-gray-700 p-4 text-center">Cell 2</div>
            <div className="row-start-2 bg-gray-700 p-4 text-center">Cell 3</div>

            <div className="row-start-3 col-span-3 bg-gray-800 p-4 text-center">Row 3 (spans all 3 columns)</div>
        </div>
    )
};