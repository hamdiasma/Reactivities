import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IActivity } from "../types";
import agent from "../api/agent";


// query function to fetch activities
// mutation function to update activities
// mutation function to delete activities
// mutation function to create activities
export const useActivities = () => {

    const queryClient = useQueryClient();

    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<IActivity[]>("/activities");
            return response.data;
        },
    })

     const  updateActvity =  useMutation({
        mutationFn: async (activity: IActivity) =>{
            await agent.put<IActivity>(`/activities`, activity);
        },
        onSuccess:async () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
     })
     
     const createActvity =  useMutation({
        mutationFn: async (activity: IActivity) =>{
            await agent.post<IActivity>(`/activities`, activity);
        },
        onSuccess:async () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
     })
     const deleteActvity =  useMutation({
        mutationFn: async (id:string) =>{
            await agent.delete<IActivity>(`/activities/${id}`);
        },
        onSuccess:async () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
     })
    return { activities, isPending, updateActvity, createActvity , deleteActvity };
}