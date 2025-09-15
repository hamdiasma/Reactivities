import { useParams } from "react-router"
import { useProfile } from "../../../lib/hooks/useProfile"
import { useMediaQuery, ImageList, ImageListItem, Typography, useTheme, Box, Button, Divider } from "@mui/material"
import { useState } from "react"
import PhotoUpload from "../../Shared/Components/PhotoUpload"
import StarButton from "../../Shared/Components/StarButton"
import DeleteButton from "../../Shared/Components/DeleteButton"

export default function ProfilePhotos() {
    const { id } = useParams()
    const { photos, loadingPhotos, isCurrentUser, uploadPhoto, profile, selectMainPhoto, deleteProfilePhoto } = useProfile(id)
    const [editMode, setEditMode] = useState(false)

    const theme = useTheme()
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"))
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"))
    const isLg = useMediaQuery(theme.breakpoints.up("lg"))

    let cols = 2
    if (isLg) cols = 6
    else if (isMd) cols = 4
    else if (isSm) cols = 3
    else cols = 2

    const handleUploadPhoto = (file: Blob) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => setEditMode(false)
        })
    }

    if (loadingPhotos) return <Typography>Loading photos...</Typography>
    if (!photos) return <Typography>No photos found for this user</Typography>

    return (
        <Box>

            <Box display={'flex'} justifyContent={'space-between'} mb={2}>
                <Typography variant="h5" gutterBottom>
                    Photos
                </Typography>
                {isCurrentUser && (
                    <Button
                        disabled={uploadPhoto.isPending}
                        color={editMode ? "error" : "primary"}
                        onClick={() => setEditMode(!editMode)} variant={editMode ? "outlined" : "contained"}>
                        {editMode ? 'Cancel' : 'Add Photo'}
                    </Button>)}
            </Box>
            <Divider sx={{ my: 2 }} />
            {editMode ? (
                <Box>
                    <PhotoUpload
                        handleUploadPhoto={handleUploadPhoto}
                        loading={uploadPhoto.isPending}
                    />
                </Box>
            ) :
                (
                    <>
                        {photos.length === 0 ? (<Typography>No photos available. Please add some photos.</Typography>)
                            : (
                                <ImageList sx={{ height: 450 }} cols={cols} rowHeight={164}>
                                    {photos.map((item) => {
                                        const imageUrlFormatted = item.url.replace('/upload/', '/upload/w_164,h_164,c_fit,f_auto,dpr_2/')
                                        return <ImageListItem key={item.url} sx={{ position: 'relative' }}>
                                            <img
                                                srcSet={imageUrlFormatted}
                                                src={imageUrlFormatted}
                                                alt={item.id + '_photo'}
                                                loading="lazy"
                                                object-fit="cotain"
                                                style={{ border: '1px solid #ccc', borderRadius: 8 }}
                                            />
                                            {isCurrentUser && (<div>
                                                <Box sx={{ position: 'absolute', top: 1, left: 1, backgroundColor: 'transparent' }}
                                                    onClick={() => selectMainPhoto.mutate(item)}
                                                >
                                                    <StarButton selected={item.url === profile?.imageUrl} />
                                                </Box>
                                                {(profile?.imageUrl !== item.url) && (
                                                    <Box sx={{ position: 'absolute', top: 2, right: 1, backgroundColor: 'transparent' }}
                                                        onClick={() => deleteProfilePhoto.mutate(item.id)}
                                                    >
                                                        <DeleteButton />
                                                    </Box>
                                                )}
                                            </div>)}
                                        </ImageListItem>
                                    })}
                                </ImageList>
                            )
                        }
                    </>
                )
            }
        </Box>


    )
}
