import { SEND_MESSAGE, TOGGLE_CHANNEL, TOGGLE_ROOM } from "../actionTypes";
import { CHANNELS } from "../../channels";

const initialState = {
  roomId: null,
  channelId: CHANNELS.ALL
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE: {
      let message = {
        autor: "Me",
        roomId: initialState.roomId,
        channelId: initialState.channelId,
        body: action.payload.message,
        ts: new Date()
      }

      return {
        ...initialState,
        message
      };
    }
    case TOGGLE_CHANNEL: {
      const { channelId } = action.payload;

      initialState.channelId = channelId;

      return {
        ...initialState
      };
    }
    case TOGGLE_ROOM: {
      const { roomId } = action.payload;

      initialState.roomId = roomId;

      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}