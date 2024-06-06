import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SelectedState } from "./selectedSlice.types";


const getInitialState = (): SelectedState => {
    return {
        selectedGroupId: "0" ?? null,
        selectedTopicId: "0" ?? null,
        selectedConvId: "0" ?? null,
        isAdmin: false ?? null,
        isPublic: false ?? null,
        appRole: false ?? null
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
            isAdmin: false ?? null,
            isPublic: state.isPublic,
            appRole: state.appRole
        };
    },
    setTopic: (state, action: PayloadAction<string>) => {
        return {
            ...state,
            selectedGroupId: state.selectedGroupId,
            selectedTopicId: action.payload ?? null,
            selectedConvId: "0" ?? null,
            isAdmin: state.isAdmin,
            isPublic: state.isPublic,
            appRole: state.appRole
        };
    },
    setConv: (state, action: PayloadAction<string>) => {
        return {
            ...state,
            selectedGroupId: "0" ?? null,
            selectedTopicId: "0" ?? null,
            selectedConvId: action.payload ?? null,
            isAdmin: state.isAdmin,
            isPublic: state .isPublic,
            appRole: state.appRole
        };
    },
    setAdmin: (state, action: PayloadAction<boolean>) => {
        return {
            ...state,
            selectedGroupId: state.selectedGroupId,
            selectedTopicId: state.selectedTopicId,
            selectedConvId: state.selectedConvId,
            isAdmin: action.payload ?? null,
            isPublic: state .isPublic,
            appRole: state.appRole
        };
    },
    setPublic: (state, action: PayloadAction<boolean>) => {
        return {
            ...state,
            selectedGroupId: state.selectedGroupId,
            selectedTopicId: state.selectedTopicId,
            selectedConvId: state.selectedConvId,
            isAdmin: state.isAdmin,
            isPublic: action.payload ?? null,
            appRole: state.appRole
        };
    },
    setAppRole: (state, action: PayloadAction<boolean>) => {
        return {
            ...state,
            selectedGroupId: state.selectedGroupId,
            selectedTopicId: state.selectedTopicId,
            selectedConvId: state.selectedConvId,
            isAdmin: state.isAdmin,
            isPublic: state.isPublic,
            appRole: action.payload ?? null
        };
    }
  }
});

export const { 
  setGroup,
  setTopic,
  setConv,
  setAdmin,
  setPublic,
  setAppRole
} = selectedSlice.actions;

export const selectedReducer = selectedSlice.reducer;

