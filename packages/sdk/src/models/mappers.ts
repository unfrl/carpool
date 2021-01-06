import * as coreHttp from "@azure/core-http";

export const SignUpDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SignUpDto",
    modelProperties: {
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String"
        }
      },
      password: {
        serializedName: "password",
        required: true,
        type: {
          name: "String"
        }
      },
      displayName: {
        serializedName: "displayName",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SignInDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SignInDto",
    modelProperties: {
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String"
        }
      },
      password: {
        serializedName: "password",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const AuthDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AuthDto",
    modelProperties: {
      accessToken: {
        serializedName: "accessToken",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const GoogleSignInDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "GoogleSignInDto",
    modelProperties: {
      idToken: {
        serializedName: "idToken",
        required: true,
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

export const SocialAuthDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SocialAuthDto",
    modelProperties: {
      accessToken: {
        serializedName: "accessToken",
        required: true,
        type: {
          name: "String"
        }
      },
      nextStep: {
        serializedName: "nextStep",
        required: true,
        type: {
          name: "Number"
        }
      },
      error: {
        serializedName: "error",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const PasswordResetRequestDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PasswordResetRequestDto",
    modelProperties: {
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const PasswordResetDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PasswordResetDto",
    modelProperties: {
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String"
        }
      },
      token: {
        serializedName: "token",
        required: true,
        type: {
          name: "String"
        }
      },
      newPassword: {
        serializedName: "newPassword",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const UserDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UserDto",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String"
        }
      },
      displayName: {
        serializedName: "displayName",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const CarpoolQueryResponseDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CarpoolQueryResponseDto",
    modelProperties: {
      carpool: {
        serializedName: "carpool",
        type: {
          name: "Composite",
          className: "CarpoolDto"
        }
      },
      type: {
        serializedName: "type",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const CarpoolDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CarpoolDto",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        required: true,
        type: {
          name: "String"
        }
      },
      urlId: {
        serializedName: "urlId",
        required: true,
        type: {
          name: "String"
        }
      },
      destination: {
        serializedName: "destination",
        required: true,
        type: {
          name: "String"
        }
      },
      dateTime: {
        serializedName: "dateTime",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      created: {
        serializedName: "created",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      updated: {
        serializedName: "updated",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      user: {
        serializedName: "user",
        type: {
          name: "Composite",
          className: "UserDto"
        }
      },
      metadata: {
        serializedName: "metadata",
        type: {
          name: "Composite",
          className: "CarpoolMetadataDto"
        }
      }
    }
  }
};

export const CarpoolMetadataDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CarpoolMetadataDto",
    modelProperties: {
      seatsRemaining: {
        serializedName: "seatsRemaining",
        required: true,
        type: {
          name: "Number"
        }
      },
      driverCount: {
        serializedName: "driverCount",
        required: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const UpsertCarpoolDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpsertCarpoolDto",
    modelProperties: {
      carpoolName: {
        serializedName: "carpoolName",
        required: true,
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
        serializedName: "destination",
        required: true,
        type: {
          name: "String"
        }
      },
      dateTime: {
        serializedName: "dateTime",
        required: true,
        type: {
          name: "DateTime"
        }
      }
    }
  }
};

export const UpsertDriverDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpsertDriverDto",
    modelProperties: {
      car: {
        serializedName: "car",
        type: {
          name: "Composite",
          className: "Car"
        }
      }
    }
  }
};

export const Car: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Car",
    modelProperties: {
      capacity: {
        serializedName: "capacity",
        required: true,
        type: {
          name: "Number"
        }
      },
      color: {
        serializedName: "color",
        required: true,
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DriverDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DriverDto",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      car: {
        serializedName: "car",
        type: {
          name: "Composite",
          className: "Car"
        }
      },
      carpoolId: {
        serializedName: "carpoolId",
        required: true,
        type: {
          name: "String"
        }
      },
      user: {
        serializedName: "user",
        type: {
          name: "Composite",
          className: "UserDto"
        }
      },
      seatsRemaining: {
        serializedName: "seatsRemaining",
        required: true,
        type: {
          name: "Number"
        }
      },
      passengerUserIds: {
        serializedName: "passengerUserIds",
        required: true,
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
        serializedName: "passengers",
        required: true,
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

export const PassengerDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PassengerDto",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      phoneNumber: {
        serializedName: "phoneNumber",
        required: true,
        type: {
          name: "String"
        }
      },
      address: {
        serializedName: "address",
        required: true,
        type: {
          name: "String"
        }
      },
      user: {
        serializedName: "user",
        type: {
          name: "Composite",
          className: "UserDto"
        }
      },
      driverId: {
        serializedName: "driverId",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const UpsertPassengerDto: coreHttp.CompositeMapper = {
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
        serializedName: "address",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const VerificationDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "VerificationDto",
    modelProperties: {
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String"
        }
      },
      token: {
        serializedName: "token",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};
