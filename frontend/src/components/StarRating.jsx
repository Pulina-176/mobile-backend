import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(null);

  const handleRatingChange = (value) => {
    setRating(value);
    console.log(value); // Log the new rating value
    if (onRatingChange) {
      onRatingChange(value); // Notify parent component about the rating change
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;

        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={ratingValue}
              checked={rating === ratingValue}
              onChange={() => handleRatingChange(ratingValue)}
              id={`rating-${ratingValue}`}
            />
            <FaStar
              className={`cursor-pointer transition-colors ${
                ratingValue <= rating ? "text-yellow-500" : "text-gray-300"
              } hover:text-yellow-600`}
              size={24}
              htmlFor={`rating-${ratingValue}`}
            />
          </label>
        );
      })}
      <p className="ml-2">({rating || 'No rating'})</p>
    </div>
  );
};

export default StarRating;
