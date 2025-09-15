import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone'
import Cropper, { type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface Props {
    handleUploadPhoto: (file: Blob) => void;
    loading: boolean;
}

export default function PhotoUpload({ handleUploadPhoto, loading }: Props) {
    const [files, setFiles] = useState<(File & { preview: string })[]>([])
    const cropperRef = useRef<ReactCropperElement>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [])

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const onCrop = useCallback(() => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                handleUploadPhoto(blob as Blob)
            })
        }
    }, [ handleUploadPhoto])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Grid container spacing={3} >
            <Grid size={4}>
                <Typography variant="overline" gutterBottom color="secondary">
                    Step 1 - Add photo
                </Typography>

                <Box {...getRootProps()}
                    sx={{
                        height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        border: '2px dashed #20a0e4ff',
                        p: 4, textAlign: 'center', bgcolor: isDragActive ? '#abe1feff' : '#d3effe', cursor: 'pointer'
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUpload fontSize="large" color="primary" />
                    <Typography>Drop image here</Typography>
                </Box>
            </Grid>
            <Grid size={4}>
                <Typography variant="overline" gutterBottom color="secondary">
                    Step 2 - Resize photo
                </Typography>
                {files[0]?.preview &&
                    <Cropper
                        src={files[0].preview}
                        style={{ height: 300, width: "90%" }}
                        // Cropper.js options
                        background={false}
                        initialAspectRatio={1}
                        guides={false}
                        aspectRatio={1}
                        ref={cropperRef}
                        viewMode={1}
                        dragMode="move"
                        preview={'.img-preview'}
                        // scalable={true}
                        // cropBoxResizable={true}
                        // cropBoxMovable={true}
                        // responsive={true}
                        // checkOrientation={false} //
                    />}
            </Grid>
            <Grid size={4}>

                {files[0]?.preview && <>
                    <Typography variant="overline" gutterBottom color="secondary">
                        Step 1 - Preview & Upload
                    </Typography>

                    <div
                        className="img-preview"
                        style={{ height: 300, width:300, overflow: 'hidden' }}
                    >
                    </div>
                        
                   <Button onClick={onCrop} disabled={loading}
                   variant="contained" sx={{mt:2}} fullWidth color="secondary">
                    {loading ? 'Uploading...' : 'Upload'}
                   </Button>    
                </>}
            </Grid>
        </Grid>
    )
}
