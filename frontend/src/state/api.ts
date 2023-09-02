import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from "./types";

// uses reduxjs toolkit query, createApi to make endpoints to call the backend, grab data from the backend
// passing in baseUrl the environmental variable url added earlier, gonna be called everytime api called
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["Projects", "Tickets", "Users", ""], // where the information is being saved, ex: once you get kpis will be saved in tagtypes of kpis
    endpoints: (build) => ({
        // using endpoint getKpis, making call using the vitebaseurl + /kpi/kpis/
        // sets up a function that grabs our kpis (key performance indicators)
        // and saving it into the Kpis tag
        getProjects: build.query<Array<void>, void>({
            query: () => "project/projects/",
            providesTags: ["Projects"]
        }),
        getTickets: build.query<Array<void>, void>({
            query: () => "product/products/",
            providesTags: ["Tickets"]
        }),
        getUsers: build.query<Array<void>, void>({
            query: () => "user/users/",
            providesTags: ["Users"]
        }),
    }),
});

export const { useGetProjectsQuery, useGetTicketsQuery, useGetUsersQuery } = api;