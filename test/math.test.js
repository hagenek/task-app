const { calculateTip, fahrenheitToCelsius, celsisuToFahrenheit } = require("../src/math")

test("Should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
})

test("Should convert 32 F to 0 C", () => {
  const degrees = fahrenheitToCelsius(32);
  expect(degrees).toBe(0);
})

test("Should convert 0 F to 32 C", () => {
  const degrees = celsisuToFahrenheit(0);
  expect(degrees).toBe(32);
})

test("Should calculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
})
