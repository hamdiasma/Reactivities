import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import { Box, debounce, List, ListItemButton, TextField, Typography, CircularProgress } from "@mui/material";
import { useEffect, useMemo, useState, useCallback } from "react";
import type { ILocationIQSuggsetion } from "../../../lib/types";
import axios from "axios";

type Props<T extends FieldValues> = { label: string } & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });

    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<ILocationIQSuggsetion[]>([]);
    const [inputValue, setInputValue] = useState(field.value?.venue ?? field.value ?? "");

    // Update inputValue when field.value changes (for controlled input)
    useEffect(() => {
        if (field.value && typeof field.value === "object") {
            setInputValue(field.value.venue ?? "");
        } else {
            setInputValue(field.value ?? "");
        }
    }, [field.value]);

    const locationUrl = useMemo(
        () =>
            `https://api.locationiq.com/v1/autocomplete?key=${import.meta.env.VITE_IQ_API_Access_Token}&limit=5&dedupe=1`,
        []
    );

    // Debounced fetch function for suggestions
    const fetchSuggestion = useMemo(
        () =>
            debounce(async (query: string) => {
                if (!query || query.length < 3) {
                    setSuggestions([]);
                    return;
                }
                setLoading(true);
                try {
                    const res = await axios.get<ILocationIQSuggsetion[]>(`${locationUrl}&q=${encodeURIComponent(query)}`);
                    setSuggestions(res.data);
                } catch (error) {
                    console.error("Failed to fetch suggestions:", error);
                } finally {
                    setLoading(false);
                }
            }, 1000),
        [locationUrl]
    );

    // Clean up debounce on unmount
    useEffect(() => {
        return () => {
            fetchSuggestion.clear?.();
        };
    }, [fetchSuggestion]);

    // Handle input change
    const handleChange = useCallback(
        (value: string) => {
            setInputValue(value);
            field.onChange(value);
            fetchSuggestion(value);
        },
        [field, fetchSuggestion]
    );

    // Handle suggestion selection
    const handleSelect = useCallback(
        (location: ILocationIQSuggsetion) => {
            console.log({location, fieldState});
            
        const city = location.address?.city || location.address?.town || location.address?.village || location.address?.county;
        const venue = location.display_name;
        const latitude = location.lat;
        const langitude = location.lon;

        setInputValue(venue)
        field.onChange({
            city, venue, langitude, latitude
        })
            setSuggestions([]);
        },
        [field, fieldState]
    );

    return (
        <Box>
            <TextField
                {...props}
                onChange={e => handleChange(e.target.value)}
                value={inputValue}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputLabelProps={{ shrink: true }}
            />
            {loading && (
                <Box display="flex" alignItems="center" mt={1}>
                    <CircularProgress size={20} />
                    <Typography ml={1}>Chargement...</Typography>
                </Box>
            )}
            {suggestions.length > 0 && (
                <List sx={{ border: 1, borderColor: "divider", borderRadius: 1, mt: 1, maxHeight: 200, overflow: "auto", bgcolor: "background.paper" }}>
                    {suggestions.map(suggestion => (
                        <ListItemButton
                            divider
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion)}
                        >
                            {suggestion.display_name}
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    );
}