"use strict";
/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpDto = {
    serializedName: "SignUpDto",
    type: {
        name: "Composite",
        className: "SignUpDto",
        modelProperties: {
            email: {
                required: true,
                serializedName: "email",
                type: {
                    name: "String"
                }
            },
            password: {
                required: true,
                serializedName: "password",
                type: {
                    name: "String"
                }
            },
            displayName: {
                required: true,
                serializedName: "displayName",
                type: {
                    name: "String"
                }
            }
        }
    }
};
exports.SignInDto = {
    serializedName: "SignInDto",
    type: {
        name: "Composite",
        className: "SignInDto",
        modelProperties: {
            email: {
                required: true,
                serializedName: "email",
                type: {
                    name: "String"
                }
            },
            password: {
                required: true,
                serializedName: "password",
                type: {
                    name: "String"
                }
            }
        }
    }
};
exports.AuthDto = {
    serializedName: "AuthDto",
    type: {
        name: "Composite",
        className: "AuthDto",
        modelProperties: {
            accessToken: {
                required: true,
                serializedName: "accessToken",
                type: {
                    name: "String"
                }
            }
        }
    }
};
exports.GoogleSignInDto = {
    serializedName: "GoogleSignInDto",
    type: {
        name: "Composite",
        className: "GoogleSignInDto",
        modelProperties: {
            idToken: {
                required: true,
                serializedName: "idToken",
                type: {
                    name: "String"
                }
            }
        }
    }
};
exports.PasswordResetRequestDto = {
    serializedName: "PasswordResetRequestDto",
    type: {
        name: "Composite",
        className: "PasswordResetRequestDto",
        modelProperties: {
            email: {
                required: true,
                serializedName: "email",
                type: {
                    name: "String"
                }
            }
        }
    }
};
exports.PasswordResetDto = {
    serializedName: "PasswordResetDto",
    type: {
        name: "Composite",
        className: "PasswordResetDto",
        modelProperties: {
            email: {
                required: true,
                serializedName: "email",
                type: {
                    name: "String"
                }
            },
            token: {
                required: true,
                serializedName: "token",
                type: {
                    name: "String"
                }
            },
            newPassword: {
                required: true,
                serializedName: "newPassword",
                type: {
                    name: "String"
                }
            }
        }
    }
};
exports.UserDto = {
    serializedName: "UserDto",
    type: {
        name: "Composite",
        className: "UserDto",
        modelProperties: {
            id: {
                required: true,
                serializedName: "id",
                type: {
                    name: "String"
                }
            },
            email: {
                required: true,
                serializedName: "email",
                type: {
                    name: "String"
                }
            },
            displayName: {
                required: true,
                serializedName: "displayName",
                type: {
                    name: "String"
                }
            }
        }
    }
};
exports.CarpoolDto = {
    serializedName: "CarpoolDto",
    type: {
        name: "Composite",
        className: "CarpoolDto",
        modelProperties: {
            id: {
                required: true,
                serializedName: "id",
                type: {
                    name: "String"
                }
            },
            name: {
                required: true,
                serializedName: "name",
                type: {
                    name: "String"
                }
            },
            urlId: {
                required: true,
                serializedName: "urlId",
                type: {
                    name: "String"
                }
            },
            destination: {
                required: true,
                serializedName: "destination",
                type: {
                    name: "String"
                }
            },
            dateTime: {
                required: true,
                serializedName: "dateTime",
                type: {
                    name: "Object"
                }
            },
            created: {
                required: true,
                serializedName: "created",
                type: {
                    name: "Object"
                }
            },
            updated: {
                required: true,
                serializedName: "updated",
                type: {
                    name: "Object"
                }
            },
            user: {
                required: true,
                serializedName: "user",
                type: {
                    name: "Composite",
                    className: "UserDto"
                }
            }
        }
    }
};
exports.UpsertCarpoolDto = {
    serializedName: "UpsertCarpoolDto",
    type: {
        name: "Composite",
        className: "UpsertCarpoolDto",
        modelProperties: {
            carpoolName: {
                required: true,
                serializedName: "carpoolName",
                type: {
                    name: "String"
                }
            },
            destination: {
                required: true,
                serializedName: "destination",
                type: {
                    name: "String"
                }
            },
            dateTime: {
                required: true,
                serializedName: "dateTime",
                type: {
                    name: "Object"
                }
            }
        }
    }
};
exports.Car = {
    serializedName: "Car",
    type: {
        name: "Composite",
        className: "Car",
        modelProperties: {
            capacity: {
                required: true,
                serializedName: "capacity",
                type: {
                    name: "Number"
                }
            },
            color: {
                required: true,
                serializedName: "color",
                type: {
                    name: "String"
                }
            },
            type: {
                required: true,
                serializedName: "type",
                type: {
                    name: "String"
                }
            }
        }
    }
};
exports.UpsertDriverDto = {
    serializedName: "UpsertDriverDto",
    type: {
        name: "Composite",
        className: "UpsertDriverDto",
        modelProperties: {
            car: {
                required: true,
                serializedName: "car",
                type: {
                    name: "Composite",
                    className: "Car"
                }
            }
        }
    }
};
exports.DriverDto = {
    serializedName: "DriverDto",
    type: {
        name: "Composite",
        className: "DriverDto",
        modelProperties: {
            id: {
                required: true,
                serializedName: "id",
                type: {
                    name: "String"
                }
            },
            car: {
                required: true,
                serializedName: "car",
                type: {
                    name: "Composite",
                    className: "Car"
                }
            },
            carpoolId: {
                required: true,
                serializedName: "carpoolId",
                type: {
                    name: "String"
                }
            },
            user: {
                required: true,
                serializedName: "user",
                type: {
                    name: "Composite",
                    className: "UserDto"
                }
            },
            seatsRemaining: {
                required: true,
                serializedName: "seatsRemaining",
                type: {
                    name: "Number"
                }
            },
            passengerUserIds: {
                required: true,
                serializedName: "passengerUserIds",
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "String"
                        }
                    }
                }
            }
        }
    }
};
exports.UpsertPassengerDto = {
    serializedName: "UpsertPassengerDto",
    type: {
        name: "Composite",
        className: "UpsertPassengerDto",
        modelProperties: {
            phoneNumber: {
                serializedName: "phoneNumber",
                type: {
                    name: "String"
                }
            },
            address: {
                required: true,
                serializedName: "address",
                type: {
                    name: "String"
                }
            }
        }
    }
};
exports.PassengerDto = {
    serializedName: "PassengerDto",
    type: {
        name: "Composite",
        className: "PassengerDto",
        modelProperties: {
            id: {
                required: true,
                serializedName: "id",
                type: {
                    name: "String"
                }
            },
            phoneNumber: {
                required: true,
                serializedName: "phoneNumber",
                type: {
                    name: "String"
                }
            },
            address: {
                required: true,
                serializedName: "address",
                type: {
                    name: "String"
                }
            },
            user: {
                required: true,
                serializedName: "user",
                type: {
                    name: "Composite",
                    className: "UserDto"
                }
            },
            driverId: {
                required: true,
                serializedName: "driverId",
                type: {
                    name: "String"
                }
            }
        }
    }
};
exports.VerificationDto = {
    serializedName: "VerificationDto",
    type: {
        name: "Composite",
        className: "VerificationDto",
        modelProperties: {
            email: {
                required: true,
                serializedName: "email",
                type: {
                    name: "String"
                }
            },
            token: {
                required: true,
                serializedName: "token",
                type: {
                    name: "String"
                }
            }
        }
    }
};
//# sourceMappingURL=mappers.js.map