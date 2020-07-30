const calculateTip = (total, tipPercent = .25) => {
  const tip = total * tipPercent;
  return total + tip;
}

const fahrenheitToCelsius = (temp) => {
  return (temp - 32) / 1.8;
};
const celsisuToFahrenheit = (temp) => {
  return (temp * 1.8) + 32;
};

module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsisuToFahrenheit,
  }
