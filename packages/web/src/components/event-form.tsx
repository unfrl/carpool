import React, { FunctionComponent, useState } from "react";
import { TextInputField, Pane, Button } from "evergreen-ui";

export interface IEventFormState {
    name: string;
    date: Date;
}

export const EventForm: FunctionComponent = () => {
    const [state, setState] = useState<IEventFormState>({
        name: "",
        date: new Date(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
            <TextInputField
                label="Name"
                required={true}
                value={state.name}
                onChange={e => setState({ ...state, name: e.target.value })}
            />
            <TextInputField
                label="Date"
                required={true}
                type="datetime"
                value={state.date}
                onChange={e => setState({ ...state, date: new Date(e.target.value) })}
            />
            <Pane
                marginTop={16}
                display="flex"
                flexDirection="row-reverse"
                justifyContent="center"
                alignItems="center"
            >
                <Button appearance="primary" type="submit">
                    Create
                </Button>
                <Button appearance="minimal" marginRight={8}>
                    Cancel
                </Button>
            </Pane>
        </form>
    );
};
