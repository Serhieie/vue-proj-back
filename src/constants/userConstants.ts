export const passwordRegexp: string =
  "^[a-zA-Zа-яА-Я0-9\\s!@#$%^&*()_+\\-='`~[\\]{}|\\\\:;\"'<>,.?/]{8,64}$";

export const emailRegexp: string =
  "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]{2,}@([a-zA-Z0-9-]{2,}\\.)+[a-zA-Z0-9-]{2,}$";

export const nameRegexp: string =
  '^[a-zA-Zа-яА-Я0-9\\s!@#$%^&*()_+\\-=`~[\\]{}|\\\\:;"\'<>,.?/]{2,32}$';

export const themeOptions: string[] = ['dark', 'light', 'violet'];
