import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Avatar, Box } from '@mui/material';

type Props = {
    position: [number, number]
    venue: string
}


export default function MapComponent({ position, venue }: Props) {

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <strong>{venue}</strong>

                        <Box display='flex' justifyContent={'center'} p={1} gap={3}>
                        <a
                            href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Avatar src="/images/categoryImages/google-maps.svg" alt="Google Maps" sx={{ width: 24, height: 24 }} />
                        </a>

                        <a
                            href={`https://waze.com/ul?ll=${position[0]},${position[1]}&navigate=yes`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Avatar src="/images/categoryImages/waze.png" alt="Waze" sx={{ width: 24, height: 24 }} />
                        </a>
                        </Box>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    )
}
