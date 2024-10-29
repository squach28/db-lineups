import { useState } from "react";

const Boat = () => {
  const [name, setName] = useState<string>("");
  const [lefts, setLefts] = useState<Array<string>>([
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
  ]);
  const [rights, setRights] = useState<Array<string>>([
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
    "Paddler",
  ]);

  return (
    <div className="bg-red-500 p-4 grid grid-cols-3 gap-2 grid-rows-12 justify-items-center justify-center min-w-36 min-h-96 rounded-2xl">
      <div className="row-start-1 col-start-1 col-span-3 text-center">
        Drummer
      </div>
      {lefts.map((row, index) => {
        return (
          <div
            key={`${row} ${index}`}
            className={`col-start-1 row-start-${index + 2}`}
          >
            <p className="row-start-1">{row}</p>
          </div>
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
      {rights.map((row, index) => {
        return (
          <div
            key={`${row} ${index}`}
            className={`col-start-3 row-start-${index + 2}`}
          >
            <p className="row-start-1">{row}</p>
          </div>
        );
      })}
      <div className="row-start-12 col-start-1 col-span-3 text-center">
        Steers
      </div>
    </div>
  );
};

export default Boat;
