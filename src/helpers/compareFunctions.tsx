import { Todo } from '../store/store';
import isAfter from 'date-fns/isAfter';

export function compareText(a: Todo, b: Todo) {
  const textA = a.text.toLowerCase();
  const textB = b.text.toLowerCase();

  if (textA > textB) {
    return 1;
  }
  if (textA < textB) {
    return -1;
  }
  return 0;
}

const prepareStr = (str: string) =>
  str.slice(0, 10).split('.').reverse().join('.');

export function compareDate(a: Todo, b: Todo) {
  const dateAStr = prepareStr(a.creationDate);
  const dateBStr = prepareStr(b.creationDate);
  const dateAObj = new Date(dateAStr);
  const dateBObj = new Date(dateBStr);

  if (isAfter(dateBObj, dateAObj)) {
    return 1;
  }
  if (isAfter(dateAObj, dateBObj)) {
    return -1;
  }
  return 0;
}
