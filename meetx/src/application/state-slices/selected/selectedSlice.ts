import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SelectedState } from "./selectedSlice.types";


const getInitialState = (): SelectedState => {
    return {
        selectedGroupId: "0" ?? null,
        selectedTopicId: "0" ?? null,
        selectedConvId: "0" ?? null,
        isAdmin: false ?? null
    };
}

export const selectedSlice = createSlice({
  name: "selected",
  initialState: getInitialState(),
  reducers: {
    setGroup: (state, action: PayloadAction<string>) => {
        return {
            ...state,
            selectedGroupId: action.payload ?? null,
            selectedTopicId: "0" ?? null,
            selectedConvId: "0" ?? null,
            isAdmin: false ?? null
        };
    },
    setTopic: (state, action: PayloadAction<string>) => {
        return {
            ...state,
            selectedGroupId: state.selectedGroupId,
            selectedTopicId: action.payload ?? null,
            selectedConvId: "0" ?? null,
            isAdmin: state.isAdmin
        };
    },
    setConv: (state, action: PayloadAction<string>) => {
        return {
            ...state,
            selectedGroupId: state.selectedGroupId,
            selectedTopicId: "0" ?? null,
            selectedConvId: action.payload ?? null,
            isAdmin: state.isAdmin
        };
    },
    setAdmin: (state, action: PayloadAction<boolean>) => {
        return {
            ...state,
            selectedGroupId: state.selectedGroupId,
            selectedTopicId: state.selectedTopicId,
            selectedConvId: state.selectedConvId,
            isAdmin: action.payload ?? null
        };
    }
  }
});

export const { 
  setGroup,
  setTopic,
  setConv,
  setAdmin
} = selectedSlice.actions;

export const selectedReducer = selectedSlice.reducer;

