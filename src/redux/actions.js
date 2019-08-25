import { TOGGLE_MENU, TOGGLE_CHANNEL, SEND_MESSAGE } from './actionTypes'

//app
export const toggleMenu = isMobile => ({
  type: TOGGLE_MENU,
  payload: { isMobile }
})

export const toggleChannel = selectedChannel => ({
  type: TOGGLE_CHANNEL,
  payload: { selectedChannel }
})

//chat
export const sendMessage = message => ({
  type: SEND_MESSAGE,
  payload: { message }
})