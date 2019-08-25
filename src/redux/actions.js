import { TOGGLE_MENU, TOGGLE_CHANNEL, SEND_MESSAGE, TOGGLE_ROOM, READ_ROOM } from './actionTypes'

//app
export const toggleMenu = isMobile => ({
  type: TOGGLE_MENU,
  payload: { isMobile }
})

export const toggleChannel = channelId => ({
  type: TOGGLE_CHANNEL,
  payload: { channelId }
})

//chat
export const sendMessage = message => ({
  type: SEND_MESSAGE,
  payload: { message }
})

export const toggleRoom = roomId => ({
  type: TOGGLE_ROOM,
  payload: { roomId }
})

//chats
export const readRoom = roomId => ({
  type: READ_ROOM,
  payload: { roomId }
})