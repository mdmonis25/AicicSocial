export const getCorrectRating = rating =>
  Math.floor(rating >= 2 ? rating / 2 : rating);

export const getFractionDigitsRating = rating => rating.toFixed(1);

export const getRatingLabel = rating => {
  const reviews = ['Bad', 'Okay', 'Good', 'Very Good', 'Amazing'];
  return reviews[rating - 1];
};
