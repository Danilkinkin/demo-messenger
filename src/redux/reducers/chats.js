import { PUSH_MESSAGE, READ_ROOM } from "../actionTypes";
import store from "../store";

const initialState = {
  rooms: {},
  timeline: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PUSH_MESSAGE: {
      let message = action.payload;

      if(! initialState.rooms[message.roomId]){
        initialState.rooms[message.roomId] = {
          roomId: message.roomId,
          messages: [],
          lastMessage: null,
          unread: 0
        };
      }

      initialState.rooms[message.roomId].messages.push({
        channelId: message.channelId,
        body: message.body,
        ts: message.ts,
        autor: message.autor || message.roomId
      })

      if(initialState.timeline[0] != message.roomId){
        let findIndex = initialState.timeline.findIndex(roomId => roomId === message.roomId);

        if(findIndex != -1) initialState.timeline.splice(findIndex, 1);

        initialState.timeline.unshift(message.roomId);
      }

      initialState.rooms[message.roomId].unread += 1;

      initialState.rooms[message.roomId].lastMessage = initialState.rooms[message.roomId].messages[initialState.rooms[message.roomId].messages.length-1]
      
      return {
        ...initialState
      };
    }
    case READ_ROOM: {
      const { roomId } = action.payload;

      if(initialState.timeline[0] != roomId){
        let findIndex = initialState.timeline.findIndex(searchRoomId => searchRoomId === roomId);

        if(findIndex != -1) initialState.timeline.splice(findIndex, 1);

        initialState.timeline.unshift(roomId);
      }

      initialState.rooms[roomId].unread = 0;
      
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
}