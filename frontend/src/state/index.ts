import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  role: null,
  projects: [],
  tickets: [],
  users: [],
  viewProject: null,
  viewComments: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { // functions that modify the global state
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
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
    setViewProject: (state, action) => {
      state.viewProject = action.payload.viewProject;
    },
    setTickets: (state, action) => {
      state.tickets = action.payload.tickets;
    },
    setViewComments: (state, action) => {
      state.viewComments = action.payload.viewComments
    },
    setTicket: (state, action) => {
        const updatedTickets = state.tickets.map((ticket) => {
            if (ticket._id === action.payload.ticket._id) return action.payload.ticket;
            return ticket;
            });
        state.tickets = updatedTickets;
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
  },
});

export const { setLogin, setLogout, setProjects, setProject, setTickets, setTicket, setUsers, setViewProject, setViewComments } = authSlice.actions;
export default authSlice.reducer;