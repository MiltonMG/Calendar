import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvents = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del jefe',
    notes: 'Comprar el regalo',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Test User'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvents],
        activeEvent: null
    },
    reducers: {
        onSetActiveState: (state, {payload}) => {
            state.activeEvent = payload;
        }
    }
});

export const { onSetActiveState } = calendarSlice.actions;