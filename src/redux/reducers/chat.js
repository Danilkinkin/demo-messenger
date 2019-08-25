import { SEND_MESSAGE, TOGGLE_CHANNEL, TOGGLE_ROOM } from "../actionTypes";
import { CHANNELS } from "../../channels";
import dataApp from "../../dataApp.js";

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
        channelId: initialState.channelId == CHANNELS.ALL?  dataApp.rooms[initialState.roomId].lastMessage.channelId : initialState.channelId,
        body: action.payload.message,
        ts: new Date()
      }

      dataApp.rooms[initialState.roomId].messages.push(message);
      dataApp.rooms[initialState.roomId].lastMessage = dataApp.rooms[initialState.roomId].messages[dataApp.rooms[initialState.roomId].messages.length-1]

      return {
        ...initialState,
        message
      };
    }
    case TOGGLE_CHANNEL: {
      const { channelId } = action.payload;

      initialState.channelId = channelId;

      dataApp.selectChannelId = channelId;

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