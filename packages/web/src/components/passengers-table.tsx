import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { observer } from "mobx-react";

import { PassengerDto } from "@carpool/core";
import { ActionLink } from "./action-link";

export interface IPassengersTableProps {
    passengers: PassengerDto[];
}

export const PassengersTable: React.FC<IPassengersTableProps> = observer(props => {
    const { passengers } = props;

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {passengers.map(passenger => (
                        <TableRow key={passenger.id}>
                            <TableCell component="th" scope="row">
                                {passenger.user.displayName}
                            </TableCell>
                            <TableCell>
                                <ActionLink type="phone" link={passenger.phoneNumber}>
                                    {passenger.phoneNumber}
                                </ActionLink>
                            </TableCell>
                            <TableCell>
                                <ActionLink type="address" link={passenger.address}>
                                    {passenger.address}
                                </ActionLink>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default PassengersTable;
