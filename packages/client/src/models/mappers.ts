/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as msRest from "@azure/ms-rest-js";


export const SignUpDto: msRest.CompositeMapper = {
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

export const SignInDto: msRest.CompositeMapper = {
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

export const AuthDto: msRest.CompositeMapper = {
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

export const GoogleSignInDto: msRest.CompositeMapper = {
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
      },
      displayName: {
        serializedName: "displayName",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SocialAuthDto: msRest.CompositeMapper = {
  serializedName: "SocialAuthDto",
  type: {
    name: "Composite",
    className: "SocialAuthDto",
    modelProperties: {
      accessToken: {
        required: true,
        serializedName: "accessToken",
        type: {
          name: "String"
        }
      },
      nextStep: {
        required: true,
        serializedName: "nextStep",
        type: {
          name: "Number"
        }
      },
      error: {
        required: true,
        serializedName: "error",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const PasswordResetRequestDto: msRest.CompositeMapper = {
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

export const PasswordResetDto: msRest.CompositeMapper = {
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

export const UserDto: msRest.CompositeMapper = {
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

export const CarpoolDto: msRest.CompositeMapper = {
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
      description: {
        required: true,
        serializedName: "description",
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

export const CarpoolQueryResponseDto: msRest.CompositeMapper = {
  serializedName: "CarpoolQueryResponseDto",
  type: {
    name: "Composite",
    className: "CarpoolQueryResponseDto",
    modelProperties: {
      carpool: {
        required: true,
        serializedName: "carpool",
        type: {
          name: "Composite",
          className: "CarpoolDto"
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

export const UpsertCarpoolDto: msRest.CompositeMapper = {
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
      description: {
        serializedName: "description",
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

export const Car: msRest.CompositeMapper = {
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

export const UpsertDriverDto: msRest.CompositeMapper = {
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

export const PassengerDto: msRest.CompositeMapper = {
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

export const DriverDto: msRest.CompositeMapper = {
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
      },
      passengers: {
        required: true,
        serializedName: "passengers",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "PassengerDto"
            }
          }
        }
      }
    }
  }
};

export const UpsertPassengerDto: msRest.CompositeMapper = {
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

export const VerificationDto: msRest.CompositeMapper = {
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
