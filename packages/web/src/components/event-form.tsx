import React, { FunctionComponent, useState } from "react";
import { TextInputField, Pane, Button } from "evergreen-ui";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./event-form.css";

export interface IEventFormState {
    name: string;
    date: Date | null;
}

export const EventForm: FunctionComponent = () => {
    const [state, setState] = useState<IEventFormState>({
        name: "",
        date: null,
    });

    const canSave = Boolean(state.name && state.date);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
            <TextInputField
                label="Name"
                value={state.name}
                onChange={e => setState({ ...state, name: e.target.value })}
            />
            <DatePicker
                selected={state.date}
                onChange={date => setState({ ...state, date: date })}
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                customInput={<TextInputField label="Date" marginBottom={0} />}
            />
            <Pane
                marginTop={16}
                display="flex"
                flexDirection="row-reverse"
                justifyContent="center"
                alignItems="center"
            >
                <Button appearance="primary" type="submit" disabled={!canSave}>
                    Create
                </Button>
                <Button appearance="minimal" marginRight={8}>
                    Cancel
                </Button>
            </Pane>
        </form>
    );
};
