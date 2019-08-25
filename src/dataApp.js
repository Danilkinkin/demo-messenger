import { CHANNELS } from "./channels";

/*
export default class dataApp {
	constructor(rooms = {}, roomsTimeline = [], selectRoomId = null, selectChannelId = CHANNELS.ALL, unreadMessages = 10) {
		this.rooms = rooms;
  		this.roomsTimeline = roomsTimeline;
  		this.selectRoomId = selectRoomId;
  		this.selectChannelId = selectChannelId;
  		this.unreadMessages = unreadMessages;
	}
}*/
export default {
	rooms: {},
	roomsTimeline: [], 
	selectRoomId: null, 
	selectChannelId: CHANNELS.ALL, 
	unreadMessages: 0
}