const convertToCelcius = (value: string): string => {
  return (parseFloat(value) - 273.15).toString();
};

export { convertToCelcius };
