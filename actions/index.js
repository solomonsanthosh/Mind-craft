import { USER } from '../constants';
export function setUser(user) {
return {
type: USER,
payload: user
}
}