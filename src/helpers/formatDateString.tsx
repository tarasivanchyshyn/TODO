function formatDateString(dateStr: string | undefined) {
  if (!dateStr) return;
  const date = dateStr.split(' ')[0].split('.').reverse().join('-');
  const time = dateStr.split(' ')[1];
  return `${date}T${time}`;
}

export default formatDateString;
