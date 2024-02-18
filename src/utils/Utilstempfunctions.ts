const convertToCelcius = (value: string): string => {
  return (parseFloat(value) - 273.15).toString();
};


export function getDayOrNightIcon(
  iconName: string,
  dateTimeString: string
): string {
  const hours = new Date(dateTimeString).getHours(); // Get hours from the given date and time string

  const isDayTime = hours >= 6 && hours < 18; // Consider daytime from 6 AM to 6 PM

  return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}

const metersToKilometers = (visibilityInMeters: number): string => {
  const visibilityInKilometers = visibilityInMeters / 1000;
  return `${visibilityInKilometers.toFixed(0)}km`; // Round to 0 decimal places and add 'km' unit
}

const convertWindSpeed = (speedInMetersPerSecond: number): string => {
  const speedInKilometersPerHour = speedInMetersPerSecond * 3.6; // Conversion from m/s to km/h
  return `${speedInKilometersPerHour.toFixed(0)}km/h`;
}


function convertToAMPM(timestamp: number): string {
  // Convert the timestamp to milliseconds
  const date: Date = new Date(timestamp * 1000);

  // Get hours, minutes, and seconds
  let hours: number = date.getHours();
  const minutes: string = ('0' + date.getMinutes()).slice(-2);
  const seconds: string = ('0' + date.getSeconds()).slice(-2);

  // Determine AM or PM
  const meridiem: string = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Handle midnight (0 hours)

  // Construct the time string
  const timeString: string = hours + ':' + minutes + ':' + seconds + ' ' + meridiem;

  return timeString;
}

const timestamp: number = 1708216626;
const formattedTime: string = convertToAMPM(timestamp);
console.log(formattedTime); // Output: 10:50:26 AM




export { convertToCelcius, metersToKilometers, convertWindSpeed, convertToAMPM };
