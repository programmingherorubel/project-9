import apiSlice from "../api/apiSlice";

const tasksApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query({
            query: () => "/tasks"
        }),
        getTask: builder.query({
            query: id => `/tasks/${id}`,
            keepUnusedDataFor: 0,
        }),
        addTask: builder.mutation({
            query: data => ({
                url: "/tasks",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: createdTask } = await queryFulfilled;

                    // pessimistic cash update.
                    dispatch(
                        apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                            draft.push(createdTask);
                        })
                    );
                } catch (error) { }
            },
        }),
        editTask: builder.mutation({
            query: data => ({
                url: `/tasks/${data.id}`,
                method: "PUT",
                body: data,
            }),
            // pasimistic cache update

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedTask } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                            return draft.map((task) =>
                                task.id == arg.id ? updatedTask : task
                            );
                        })
                    );
                } catch (error) { }
            },

        }),
        updateStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: { status }
            }),

            // optimistic update
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update.

                const result = dispatch(
                    apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                        const draftTask = draft.find((task) => task.id == arg.id);
                        draftTask.status = arg.status;
                    })
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    result.undo();
                }
            },

        }),

        deleteTask: builder.mutation({
            query: (id) => ({
                url: `tasks/${id}`,
                method: "DELETE",
            }),
            // optimistic cache update
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update.

                const result = dispatch(
                    apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                        return draft.filter((task) => task.id != arg);
                    })
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    result.undo();
                }
            },
        }),

    })
});

export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useAddTaskMutation,
    useEditTaskMutation,
    useUpdateStatusMutation,
    useDeleteTaskMutation,
} = tasksApi;
