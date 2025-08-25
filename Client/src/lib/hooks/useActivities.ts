import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IActivity } from "../types";
import agent from "../api/agent";
import { useLocation } from "react-router";


// query function to fetch activities
// mutation function to update activities
// mutation function to delete activities
// mutation function to create activities
export const useActivities = (id?:string) => {
    const queryClient = useQueryClient();
    const location  = useLocation()
    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<IActivity[]>("/activities");
            return response.data;
        },
        // staleTime:1000*60 * 6
       enabled : !id && location.pathname ==="/activities",
       staleTime:1000*60 *1
    })

     const { data: activity, isLoading:isLoadinActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<IActivity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id, // only run this query if id is defined
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
          const response =  await agent.post<IActivity>(`/activities`, activity);
          return response.data;
        },

        onSuccess: async () => {
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
    return { activities, isPending, updateActvity, createActvity , deleteActvity,activity, isLoadinActivity };
}