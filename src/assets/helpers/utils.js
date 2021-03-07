export function toNumber(value) {
  return (value && !Array.isArray(value)) ? Number(value) : NaN
}