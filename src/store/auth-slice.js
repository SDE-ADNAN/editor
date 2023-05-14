import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const initialPhone = localStorage.getItem('phone');

const initialState = { token: initialToken, isLoggedIn: !!initialToken, phone:initialPhone };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login(state, action){
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            state.isLoggedIn = true;
            state.phone = action.payload.phone
            localStorage.setItem('phone', action.payload.phone);
        },
        logout(state){
            localStorage.removeItem('token');
            localStorage.removeItem('phone');
            state.token = '';
            state.isLoggedIn = false;
        }
    } 
});

export const authActions = authSlice.actions;

export default authSlice.reducer;