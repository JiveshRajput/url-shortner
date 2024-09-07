export function formatDateAndTime(date: string | Date) {
  const newDate: Date = new Date(date);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const isPm = hours > 12;

  const formattedDate: string = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  const formattedTime: string = `${isPm ? `0${hours - 12}` : hours}:${minutes > 10 ? minutes : `0${minutes}`} ${isPm ? 'PM' : 'AM'}`;

  return `${formattedDate} ${formattedTime}`;
}
