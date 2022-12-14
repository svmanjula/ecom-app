import React, { useContext } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FilterContext } from "../context/FilterContext/FilterContext";

const Rating = ({ rating }) => {
  const { filterDispatch } = useContext(FilterContext);
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          onClick={() => {
            filterDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            });
          }}
        >
          {rating > i ? <AiFillStar /> : <AiOutlineStar />}
        </span>
      ))}
    </div>
  );
};

export default Rating;
