import AsyncStorage from '@react-native-async-storage/async-storage';
import { state } from '../store/ContextStore';
import { aleartOff, aleartOn, loadingOff, setcommonReducerState, toastOff } from '../actions/commonActions';
import { setBookPost } from '../actions/bookPostActions';
import {  addUserBook } from '../actions/userBookAction';
export async function storeCommanReducer(){
    try {
        await AsyncStorage.setItem('COMMON_REDUCER', JSON.stringify(state.commonReducerState));
        return true;
    } catch (e) {
        alert('Failed to save the data to the storage')
        return false;
    }
}
export async function getCommanReducer() {
    try {
        const temp = await AsyncStorage.getItem('COMMON_REDUCER')
        console.log(JSON.parse(temp));
        if (temp) {
            setcommonReducerState(JSON.parse(temp));
            loadingOff();
            toastOff();
        }
        return true;
    } catch (e) {
        alert('Failed to get the data to the storage')
        return false; s
    }
}
export async function storeBookPost() {
    try {
        await AsyncStorage.setItem('BOOK_POST', JSON.stringify(state.bookPostReducerState.bookPostData));
        return true;
    } catch (e) {
        alert('Failed to save the data to the storage')
        return false;
    }
}

export async function getBookPost() {
    try {
        const temp = await AsyncStorage.getItem('BOOK_POST')
        if (temp) {
            setBookPost(JSON.parse(temp));
            toastOff();
        }
        return true;
    } catch (e) {
        alert('Failed to get the data to the storage')
        return false; s
    }
}
export async function storeUserBook() {
    try {
        await AsyncStorage.setItem('USER_BOOK', JSON.stringify(state.userBookReducerState.userBookData));
        return true;
    } catch (e) {
        alert('Failed to save the data to the storage')
        return false;
    }
}

export async function getUserBook() {
    try {
        const temp = await AsyncStorage.getItem('USER_BOOK')
        if (temp) {
            addUserBook(JSON.parse(temp));
            toastOff();
        }
        return true;
    } catch (e) {
        alert('Failed to get the data to the storage')
        return false; s
    }
}