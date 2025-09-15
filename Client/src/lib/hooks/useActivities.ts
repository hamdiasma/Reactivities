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
                 const host = activity.attendees.find(x => x.id === activity.hostId)
                return {
                    ...activity,
                    isHost: (currentUser?.id === activity.hostId) as boolean,
                    isGoing: activity.attendees.some(x => x.id === currentUser?.id),
                    hostImageUrl: host?.imageUrl

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
             const host = data.attendees.find(x => x.id === data.hostId)

            return {
                ...data,
                isGoing: data.attendees.some(x => x.id === currentUser?.id),
                isHost: (data.hostId === currentUser?.id) as boolean,
                hostImageUrl: host?.imageUrl
            }
        }
    })

    const updateActvity = useMutation({
        mutationFn: async (activity: IActivity) => {
            await agent.put<IActivity>(`/activities/${activity.id}`, activity);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['activities'] });  // to appel  activities
        }
    })

    const createActvity = useMutation({
        mutationFn: async (activity: Partial<IActivity>) => {
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
        // add optimistic updating used cache
        onMutate: async (activityId: string) => {
            const queryKey = ['activities', activityId]
            await queryClient.cancelQueries({ queryKey: queryKey })
            const preavActiviy = queryClient.getQueryData<IActivity>(queryKey)

            queryClient.setQueryData<IActivity>(queryKey, (oldActvity)=> {
                if (!oldActvity || !currentUser) {
                    return oldActvity
                }

                const isHost = oldActvity.hostId === currentUser.id
                const isAttendng = oldActvity.attendees.some(x => x.id === currentUser.id)
                return {
                    ...oldActvity,
                    isCancelled: isHost ? !oldActvity.isCancelled : oldActvity.isCancelled,
                    attendees: isAttendng
                        ? isHost
                            ? oldActvity.attendees
                            : oldActvity.attendees.filter(x => x.id != currentUser.id)
                        : [...oldActvity.attendees, {
                            id: currentUser.id,
                            displayName: currentUser.displayName,
                            imageUrl: currentUser.imageUrl,
                        }]
                }
            })
        return {preavActiviy}
        },
        onError:(error, activityId, context)=>{
            const queryKey = ['activities', activityId]
            if(context?.preavActiviy){
                queryClient.setQueryData(queryKey, context.preavActiviy)
            }
           
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