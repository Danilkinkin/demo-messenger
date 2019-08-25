import { SEND_MESSAGE } from "../actionTypes";

const initialState = {
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE: {
      const { message } = action.payload;
      console.log(message)
      return {
        ...initialState,
        message: state.message
      };
    }
    default:
      return state;
  }
}