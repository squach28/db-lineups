import React from "react";
import { Paddler } from "../types/Paddler";

interface BoatProps {
  name: string;
  lefts: Array<Paddler | null>;
  rights: Array<Paddler | null>;
}

const Boat = (boatProps: BoatProps) => {
  const handleRowDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("message");
    e.currentTarget.textContent = data;
  };

  return (
    <div className="bg-red-500 p-4 grid grid-cols-3 gap-2 grid-rows-12 justify-items-center justify-center min-w-36 min-h-96 rounded-2xl">
      <div className="row-start-1 col-start-1 col-span-3 text-center">
        Drummer
      </div>
      {boatProps.lefts.map((row, index) => {
        return row ? (
          <div
            key={`${row} ${index}`}
            className={`col-start-1 row-start-${index + 2}`}
          >
            <p className="row-start-1">{row.fullName}</p>
          </div>
        ) : (
          <div
            key={`${index}`}
            className="min-w-20 border p-2"
            onDragOver={handleRowDragOver}
            onDrop={handleDrop}
          ></div>
        );
      })}
      <div className="row-start-2 col-start-2">1</div>
      <div className="row-start-3 col-start-2">2</div>
      <div className="row-start-4 col-start-2">3</div>
      <div className="row-start-5 col-start-2">4</div>
      <div className="row-start-6 col-start-2">5</div>
      <div className="row-start-7 col-start-2">6</div>
      <div className="row-start-8 col-start-2">7</div>
      <div className="row-start-9 col-start-2">8</div>
      <div className="row-start-10 col-start-2">9</div>
      <div className="row-start-11 col-start-2">10</div>
      {boatProps.rights.map((row, index) => {
        return row ? (
          <div
            key={`${row} ${index}`}
            className={`col-start-1 row-start-${index + 2}`}
          >
            <p className="row-start-1">{row.fullName}</p>
          </div>
        ) : (
          <div key={`${index}`} className="min-w-20 border p-2"></div>
        );
      })}
      <div className="row-start-12 col-start-1 col-span-3 text-center">
        Steers
      </div>
    </div>
  );
};

export default Boat;
