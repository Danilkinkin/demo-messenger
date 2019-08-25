import { TOGGLE_MENU, TOGGLE_CHANNEL } from "../actionTypes";
import { CHANNELS } from "../../channels";

const initialState = {
  isMobile: false,
  selectedChannel: CHANNELS.ALL
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU: {
      const { isMobile } = action.payload;
      
      return {
        ...initialState,
        isMobile: !state.isMobile
      };
    }
    case TOGGLE_CHANNEL: {
      const { selectedChannel } = action.payload;

      return {
        ...initialState,
        selectedChannel: selectedChannel
      };
    }
    default:
      return state;
  }
}