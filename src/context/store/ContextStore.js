import React from 'react'
import commonReducer, { commonReducerInitialState} from '../reducers/commonReducer';
import bookPostReducer, { bookPostReducerInitialState} from '../reducers/bookPostReducer';
import userBookReducer, { userBookReducerInitialState} from '../reducers/userBookReducer';
import buyerBookReducer, { buyerBookReducerInitialState} from '../reducers/buyerBookReducer';

export const rootContext = React.createContext();
export let dispatch={};
export let state={};
export default function ContextStore({children}) {
    const [commonReducerState, commonReducerDispatch] = React.useReducer(commonReducer, commonReducerInitialState);
    const [bookPostReducerState, bookPostReducerDispatch] = React.useReducer(bookPostReducer, bookPostReducerInitialState);
    const [userBookReducerState, userBookReducerDispatch] = React.useReducer(userBookReducer, userBookReducerInitialState);
    const [buyerBookReducerState, buyerBookReducerDispatch] = React.useReducer(buyerBookReducer, buyerBookReducerInitialState);
    dispatch={
        commonReducerDispatch,
        bookPostReducerDispatch,
        userBookReducerDispatch,
        buyerBookReducerDispatch
    }
    state={
        commonReducerState,
        bookPostReducerState,
        userBookReducerState,
        buyerBookReducerState
    }
   const store={
       commonReducerState,commonReducerDispatch,
       bookPostReducerState, bookPostReducerDispatch,
       userBookReducerState,userBookReducerDispatch,
       buyerBookReducerState, buyerBookReducerDispatch,
   }
    return <rootContext.Provider value={store} >
       {children}
    </rootContext.Provider>
}
