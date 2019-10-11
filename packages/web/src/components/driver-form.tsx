import React, { FunctionComponent, useState } from "react";
import {
    TextField,
    Button,
    makeStyles,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
} from "@material-ui/core";

import { CreateDriverDto } from "@carpool/core";

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
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="car-type">Type</InputLabel>
                <Select
                    value={state.carType}
                    onChange={e => setState({ ...state, carType: `${e.target.value}` })}
                    inputProps={{
                        name: "carType",
                        id: "car-type",
                    }}
                    variant="outlined"
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
                onChange={e => setState({ ...state, capacity: Number.parseInt(e.target.value) })}
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
            <div className={classes.actions}>
                <Button variant="contained" color="primary" type="submit" disabled={!canSave}>
                    Finish
                </Button>
                <Button className={classes.cancel} onClick={props.onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
