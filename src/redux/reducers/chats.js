import { PUSH_MESSAGE } from "../actionTypes";

const initialState = {
  rooms: {},
  timeline: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PUSH_MESSAGE: {
      let message = action.payload;

      //console.log(message)

      if(! initialState.rooms[message.roomId]){
        initialState.rooms[message.roomId] = {
          roomId: message.roomId,
          messages: [],
          lastMessage: null,
          unread: 1
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
    default:
      return state;
  }
}