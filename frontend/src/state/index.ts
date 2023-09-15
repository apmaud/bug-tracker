import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  projects: [],
  tickets: [],
  page: "/",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { // functions that modify the global state
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setPage: (state, action) => {
      state.page = action.payload.page
    },
    setProjects: (state, action) => {
        state.projects = action.payload.projects;
      },
    setProject: (state, action) => {
        const updatedProjects = state.projects.map((project) => {
            if (project._id === action.payload.project._id) return action.payload.project;
            return project;
        });
        state.projects = updatedProjects;
    },
    setTickets: (state, action) => {
      state.tickets = action.payload.tickets;
    },
    setTicket: (state, action) => {
        const updatedTickets = state.tickets.map((ticket) => {
            if (ticket._id === action.payload.ticket._id) return action.payload.ticket;
            return ticket;
            });
        state.tickets = updatedTickets;
    },
  },
});

export const { setLogin, setLogout, setProjects, setProject, setTickets, setTicket } = authSlice.actions;
export default authSlice.reducer;