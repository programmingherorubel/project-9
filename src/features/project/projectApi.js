import apiSlice from "../api/apiSlice";
import { initialFilter } from "../filter/filterSlice";

const projectApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProjects: builder.query({
            query: () => "/projects",
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = await queryFulfilled;
                const projectNames = result.data.map(project => project.projectName);
                dispatch(initialFilter(projectNames))

            }
        }),


    })
})

export const { useGetProjectsQuery } = projectApi;
