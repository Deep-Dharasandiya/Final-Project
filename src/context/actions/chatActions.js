import { dispatch } from "../store/ContextStore";
import { storeBookPost, storeCommanReducer } from "../localStorage/LocalStorage";
import { Local_Srorage, Chats_Actions } from "../../constant/actionType";

export function addChat(data) {
    dispatch.chatReducerDispatch({
        type: Chats_Actions.ADD_CHAT,
        payload: data,
    });
}
export function addNewChat(data) {
    dispatch.chatReducerDispatch({
        type: Chats_Actions.ADD_NEW_CHAT,
        payload: data,
    });
}
export function deleteChat(data) {
    dispatch.chatReducerDispatch({
        type: Chats_Actions.DELETE_CHAT,
        payload: data,
    });
}
export function replaceChat(data) {
    dispatch.chatReducerDispatch({
        type: Chats_Actions.REPLACE_CHAT,
        payload: data,
    });
}
export function clearChats(data) {
    dispatch.chatReducerDispatch({
        type: Chats_Actions.CLEAR_CHATS,
        payload: data,
    });
}