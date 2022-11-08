import { Todo } from '../store/todosSlice';
import isAfter from 'date-fns/isAfter';

export function compareTextAscend(a: Todo, b: Todo) {
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

export function compareTextDescend(a: Todo, b: Todo) {
  const textA = a.text.toLowerCase();
  const textB = b.text.toLowerCase();

  if (textA < textB) {
    return 1;
  }
  if (textA > textB) {
    return -1;
  }
  return 0;
}

const prepareStr = (str: string) =>
  str.slice(0, 10).split('.').reverse().join('.');

export function compareDateAscend(a: Todo, b: Todo) {
  const dateAStr = prepareStr(a.creationDate);
  const dateBStr = prepareStr(b.creationDate);
  const dateAObj = new Date(dateAStr);
  const dateBObj = new Date(dateBStr);

  if (isAfter(dateAObj, dateBObj)) {
    return 1;
  }
  if (isAfter(dateBObj, dateAObj)) {
    return -1;
  }
  return 0;
}

export function compareDateDescend(a: Todo, b: Todo) {
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
