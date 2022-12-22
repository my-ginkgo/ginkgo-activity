import { Activity } from './activity.model';
import { KeyValue } from './ng-keyvalue.model';

export const getMillisecondsBetweenTwoDates = (deltaTime: number, start: number, isDeltaUTC = false): number => {
  const startTime = new Date(start);
  let seconds = Math.round(new Date(deltaTime).getSeconds() - startTime.getSeconds());
  let minutes = Math.round(new Date(deltaTime).getMinutes() - startTime.getMinutes());
  let hours = 0;
  if (isDeltaUTC) {
    hours = Math.round(
      new Date(deltaTime).getHours() - startTime.getHours() - new Date(deltaTime * 1000).getTimezoneOffset() / 60,
    );
  } else {
    hours = Math.round(new Date(deltaTime).getHours() - startTime.getHours());
  }
  if (seconds < 0) {
    seconds = 60 - seconds * -1;
    minutes = minutes - 1;
  }
  if (minutes < 0) {
    minutes = 60 - minutes * -1;
    hours = hours - 1;
  }
  if (hours < 0) {
    hours = 24 - hours * -1;
  }
  return hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000;
};

export const generateActivityNameByTime = (): string => {
  const now = new Date();

  if (now.getHours() <= 11 && now.getHours() > 6) {
    return 'Morning Training';
  }

  if (now.getHours() <= 14 && now.getHours() > 11) {
    return 'Lounch Training';
  }

  if (now.getHours() <= 19 && now.getHours() > 14) {
    return 'Afternoon Training';
  }

  if (now.getHours() <= 6 && now.getHours() > 19) {
    return 'Night Training';
  }

  return 'Default';
};

export const isActivity = (object: any): object is Activity => {
  return 'blocks' in object;
};
export const calculateValueInRange = (value: number, range: KeyValue<string, number>[]): string => {
  if (value === 0) {
    return range[0].key;
  }

  for (let i = 0; i < range.length; i++) {
    if (i === 0) {
      if (value > 0 && value <= range[i].value) {
        return range[i].key;
      }
    } else {
      if (value > range[i - 1].value && value <= range[i].value) {
        return range[i].key;
      }
    }
  }
  return 'Out of range';
};

export const calculateAge = (birthdateString: string, execDate?: Date): number => {
  const now = execDate ? execDate : new Date();
  const date = birthdateString.split('-');
  const dd = +date[0];
  const mm = +date[1] - 1;
  const yyyy = +date[2];
  const birthdate = new Date(yyyy, mm, dd);
  let age = now.getFullYear() - birthdate.getFullYear();
  const m = now.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birthdate.getDate())) {
    age = age - 1;
  }
  return age;
};
