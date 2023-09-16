import React, { useState } from "react";
import "./_catagoriesBar.scss";
import { useDispatch } from "react-redux";
import {
  getPopularVideos,
  getVideosByCatagory,
} from "../../redux/actions/videos.action";

const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Algorithm Art",
  "Guitar",
  "Bangali songs",
  "Coding",
  "Cricket",
  "Football",
  "Real Madrid",
  "Gatesby",
  "Poor Coder",
  "Shwetabh",
];

function CatagoriesBar() {
  const [activeElement, setActiveElement] = useState("All");

  const dispatch = useDispatch();
  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCatagory(value));
    }
  };

  return (
    <div className="catagoriesBar">
      {keywords.map((value, i) => {
        return (
          <span
            onClick={() => handleClick(value)}
            key={i}
            className={activeElement === value ? "active" : ""}
          >
            {value}
          </span> //you should use index as key if list is not being modified.
        );
      })}
    </div>
  );
}

export default CatagoriesBar;
