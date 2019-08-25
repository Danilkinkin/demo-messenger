import { combineReducers } from "redux";
import app from "./app";
import chat from "./chat";
import chats from "./chats";

export default combineReducers({ app, chat, chats });