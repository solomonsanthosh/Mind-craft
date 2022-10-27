import { USER } from '../constants';
const initialState = {
user:null
};
const userReducer = (state = initialState, action) => {
console.log(state);
switch(action.type) {
case USER:
return {
...state,
user:action.payload
};
default:
return state;
}
}
export default userReducer;