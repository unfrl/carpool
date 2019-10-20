import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import {
    TextField,
    makeStyles,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
} from "@material-ui/core";

import { CreateDriverDto } from "@carpool/core";
import { FormActions } from ".";

const carTypes = ["Sedan", "Truck", "SUV", "Van"];

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2, 0),
    },
    heading: {
        marginBottom: theme.spacing(2),
    },
    actions: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
    },
    cancel: {
        marginRight: theme.spacing(1),
    },
    formControl: {
        marginBottom: theme.spacing(1),
    },
}));

export interface IDriverFormProps {
    onSave: (createDriverDto: CreateDriverDto) => Promise<void>;
    onCancel: () => void;
}

export interface IDriverFormState {
    capacity: number;
    color: string;
    carType: string;
}

export const DriverForm: FunctionComponent<IDriverFormProps> = props => {
    const classes = useStyles();
    const [state, setState] = useState<IDriverFormState>({
        capacity: 0,
        color: "",
        carType: "",
    });

    const canSave = Boolean(state.capacity > 0 && state.color && state.carType);

    const inputLabel = useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (canSave) {
            await props.onSave({
                car: {
                    capacity: state.capacity,
                    color: state.color,
                    type: state.carType.toLowerCase() as any,
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <Typography className={classes.heading} align="center" variant="subtitle1">
                Thanks for offering to drive! <br />
                We just need a few details about your car.
            </Typography>
            <FormControl variant="outlined" className={classes.formControl} required={true}>
                <InputLabel htmlFor="car-type" ref={inputLabel}>
                    Type
                </InputLabel>
                <Select
                    value={state.carType}
                    onChange={e => setState({ ...state, carType: `${e.target.value}` })}
                    inputProps={{
                        name: "carType",
                        id: "car-type",
                    }}
                    labelWidth={labelWidth}
                >
                    {carTypes.map(type => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Capacity"
                type="number"
                value={state.capacity}
                onChange={e => {
                    const number = Number.parseInt(e.target.value);
                    if (!Number.isNaN(number)) {
                        setState({ ...state, capacity: number });
                    }
                }}
                inputProps={{ min: 0, max: 15 }}
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Color"
                value={state.color}
                onChange={e => setState({ ...state, color: e.target.value })}
                margin="normal"
                variant="outlined"
            />
            <FormActions canSave={canSave} onCancel={props.onCancel} />
        </form>
    );
};
