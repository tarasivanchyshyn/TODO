function dateFormater(date: Date) {
  return date.toLocaleString().slice(0, -3).split(', ').join(' ');
}

export default dateFormater;
