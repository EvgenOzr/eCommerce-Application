export const formatPrice = (price: number) => {
  return Number.isInteger(price) ? price.toFixed(2) : price.toString();
};
