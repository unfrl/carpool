import React, { FunctionComponent, useState } from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import geocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { TextField, Paper, MenuItem, makeStyles } from "@material-ui/core";
import { debounce } from "lodash";

import { mapboxConfig } from "@carpool/core";

const geocodingClient = geocoding(mapboxConfig);

const useStyles = makeStyles(theme => ({
    container: {
        position: "relative",
    },
    suggestion: {
        display: "block",
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none",
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 2,
        left: 0,
        right: 0,
    },
}));

const renderInputComponent = (inputProps: any) => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth={true}
            variant="outlined"
            margin="normal"
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
};

const renderSuggestion = (
    suggestion: PlaceSuggestion,
    { query, isHighlighted }: Autosuggest.RenderSuggestionParams
) => {
    const matches = match(suggestion.placeName, query);
    const parts = parse(suggestion.placeName, matches);

    return (
        <MenuItem key={suggestion.id} selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => (
                    <span
                        key={`${part.text}-${index}`}
                        style={{ fontWeight: part.highlight ? 500 : 400 }}
                    >
                        {part.text}
                    </span>
                ))}
            </div>
        </MenuItem>
    );
};

const getSuggestions = async (value: string): Promise<PlaceSuggestion[]> => {
    try {
        const response = await geocodingClient
            .forwardGeocode({ query: value, mode: "mapbox.places", countries: ["US"] }) // TODO: restricting to just the US for now
            .send();

        const suggestions: PlaceSuggestion[] = (response.body.features || []).map(
            (feature: any) => ({
                id: feature.id,
                placeName: feature.place_name,
                placeType: feature.place_type,
                center: feature.center,
                context: feature.context,
            })
        );

        return suggestions;
    } catch (error) {
        console.error("Failed to get suggestions", error);
        return [];
    }
};

const getSuggestionValue = (suggestion: PlaceSuggestion) => {
    return suggestion.placeName;
};

export interface PlaceContext {
    id: string;
    text: string;
}

export interface PlaceSuggestion {
    id: string;
    placeName: string;
    placeType: string[];
    center: number[];
    context: PlaceContext[];
}

export interface IAddressSearchProps {
    value: string;
    onChange: (newValue: string) => void;
    required?: boolean;
}

export const AddressSearch: FunctionComponent<IAddressSearchProps> = props => {
    const classes = useStyles();
    const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);

    const handleSuggestionsFetchRequested = async ({ value }: any) => {
        const suggestions = await getSuggestions(value);

        setSuggestions(suggestions);
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = (_event: React.ChangeEvent<{}>, { newValue }: Autosuggest.ChangeEvent) => {
        props.onChange(newValue);
    };

    // TODO: may want to input value/setvalue into this component's state and have the selected suggested be what triggers the `onChange` for parent component
    // This would allow us to populate the suggestions with more info that's provided by mapbox response
    // The only caveat being that they _have_ to select a place suggestion
    const handleSuggestionSelected = (
        _event: React.FormEvent,
        data: Autosuggest.SuggestionSelectedEventData<PlaceSuggestion>
    ) => {
        console.log("selected suggestion", data.suggestion);
    };

    return (
        <Autosuggest
            renderInputComponent={renderInputComponent}
            suggestions={suggestions}
            onSuggestionsFetchRequested={debounce(handleSuggestionsFetchRequested, 100)}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={handleSuggestionSelected}
            inputProps={{
                classes: classes,
                id: "address-search",
                label: "Destination",
                placeholder: "Search for a destination",
                value: props.value,
                onChange: handleChange,
                required: props.required,
            }}
            theme={{
                container: classes.container,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
                <Paper {...options.containerProps} square>
                    {options.children}
                </Paper>
            )}
        />
    );
};
