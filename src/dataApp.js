import { CHANNELS } from "./channels";

export default class dataApp {
	constructor() {
		this.rooms = {};
  		this.roomsTimeline = [];
  		this.selectRoomId = null;
  		this.selectChannelId = CHANNELS.ALL;
	}
}