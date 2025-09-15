import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";

export const useProfile = (id?: string) => {

    const queryClient = useQueryClient();

    const { data: profile, isLoading: loadingProfile } = useQuery<IProfile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<IProfile>(`/Profiles/${id}`);
            return response.data;
        },
        enabled: !!id
    })

    const { data: photos, isLoading: loadingPhotos } = useQuery<IPhoto[]>({
        queryKey: ['photos', id],
        queryFn: async () => {
            const response = await agent.get<IPhoto[]>(`/Profiles/${id}/photos`);
            return response.data;
        },
        enabled: !!id
    })

    const uploadPhoto = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('File', file)
            const response = await agent.post<IPhoto>(`/Profiles/add-photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            return response.data
        },
        onSuccess: (photo: IPhoto) => {
            queryClient.invalidateQueries({ queryKey: ['photos', id] })
            queryClient.setQueryData(['user'],
                (data: IUser) => {
                    console.log({data});
                    if (!data) return;
                    return {
                        ...data,
                        imageUrl: (data.imageUrl ==="") ? photo.url : data.imageUrl
                    }
                }
            )
            queryClient.setQueryData(
                ['profile', id],
                (data: IProfile) => {
                    if (!data) return;
                    return {
                        ...data,
                        imageUrl: (data.imageUrl ==="") ? photo.url : data.imageUrl
                    }
                }
            )
        }
    })


    const selectMainPhoto = useMutation({
        mutationFn: async (photo: IPhoto) => {
            await agent.put(`/Profiles/${photo.id}/setMain`);
        },
        onSuccess: (_, photo: IPhoto) => {
            // queryClient.invalidateQueries({ queryKey: ['photos', id] })
            queryClient.setQueryData( ['user'],
                (userData: IUser) => {
                    if (!userData) return;
                    return {
                        ...userData,
                        imageUrl: photo?.url
                    }
                }
            );
            queryClient.setQueryData( ['profile', id],
                (profileData: IProfile) => {
                    if (!profileData) return;
                    return {
                        ...profileData,
                        imageUrl: photo?.url
                    }
                }
            )
        }
    })

    const deleteProfilePhoto = useMutation({
        mutationFn: async (photoId: string) => {
            await agent.delete(`/Profiles/${photoId}/photo`);
        },
        onSuccess: (_,photoId) => {
            queryClient.setQueryData(['photos', id],
                (photosData: IPhoto[] | undefined) => {
                    if (!photosData) return;
                    return photosData.filter(photo => photo.id !== photoId)
                }
            )
        }
    })

    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<IUser>(['user'])?.id
    }, [id, queryClient])

    return { profile, loadingProfile, photos, loadingPhotos, isCurrentUser, uploadPhoto, selectMainPhoto, deleteProfilePhoto }
}