import Dexie from 'dexie';
import { CHANNELS } from "./channels";

export default {
	rooms: {},
	roomsTimeline: [], 
	selectRoomId: null, 
	selectChannelId: CHANNELS.ALL, 
	unreadMessages: 0
}
/*
var db = new Dexie("FriendDatabase");
db.version(1).stores({
	rooms: "++id,roomId,unread",
	messages: "++id"
});*/
 
/*db.transaction('rw', db.friends, async() => {
 
    // Make sure we have something in DB:
    if ((await db.friends.where('name').equals('Josephine').count()) === 0) {
        let id = await db.friends.add({name: "Josephine", age: 21});
        alert (`Addded friend with id ${id}`);
    }
 
    // Query:
    let youngFriends = await db.friends.where("age").below(25).toArray();
 
    // Show result:
    alert ("My young friends: " + JSON.stringify(youngFriends));
 
}).catch(e => {
    alert(e.stack || e);
});*/