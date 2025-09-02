import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";


// query function to fetch activities
// mutation function to update activities
// mutation function to delete activities
// mutation function to create activities
export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const location = useLocation()
    const { currentUser } = useAccount()
    const { data: activities, isPending, isFetching } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<IActivity[]>("/activities");
            return response.data;
        },
        // staleTime:1000*60 * 6
        enabled: !id && location.pathname === "/activities" && !!currentUser,
        staleTime: 1000 * 60 * 1,
        select: data => {
            return data.map(activity => {
                return {
                    ...activity,
                    isHost: (currentUser?.id === activity.hostId) as boolean,
                    isGoing: activity.attendees.some(x => x.id === currentUser?.id)
                }
            })
        }
    })
    
    const { data: activity, isLoading: isLoadinActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<IActivity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser, // only run this query if id is defined
        select: data => {
            return {
                ...data,
                isGoing: data.attendees.some(x => x.id === currentUser?.id),
                isHost: (data.hostId === currentUser?.id) as boolean
            }
        }
    })

    const updateActvity = useMutation({
        mutationFn: async (activity: IActivity) => {
            await agent.put<IActivity>(`/activities`, activity);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });  // to appel  activities
        }
    })

    const createActvity = useMutation({
        mutationFn: async (activity: IActivity) => {
            const response = await agent.post<IActivity>(`/activities`, activity);
            return response.data;
        },

        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    })
    const deleteActvity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete<IActivity>(`/activities/${id}`);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    })


    const editAttendance = useMutation({
        mutationFn: async (id: string) => {
            await agent.post(`activities/${id}/attend`)
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['activities', id] })
        }
    })
    return {
        activities,
        isPending,
        updateActvity,
        createActvity,
        deleteActvity,
        activity,
        isLoadinActivity,
        isFetching,
        editAttendance
    };
}