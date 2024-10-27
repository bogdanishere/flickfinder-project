export function extractRating(value: string): number {
  if (value.includes("/")) {
    const [numerator, denominator] = value.split("/").map(Number);
    return (numerator / denominator) * 10;
  } else if (value.includes("%")) {
    return parseFloat(value) / 10;
  }
  return 0;
}
