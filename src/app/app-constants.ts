export const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
export const userNameRegExp = /^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:[.\-_][a-zA-Z\d])*)+$/;
export const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
export const identityCardRegExp = /^([0-9]{9})(X|V)$|^([0-9]{11})/gis;

export const apiURL = 'localhost:3000';

export const TOKENs = 'tokens';
export const USER_INFO = 'userInfo';
