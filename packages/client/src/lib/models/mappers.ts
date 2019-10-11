/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
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
        serializedName: "access_token",
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

export const Carpool: msRest.CompositeMapper = {
  serializedName: "Carpool",
  type: {
    name: "Composite",
    className: "Carpool",
    modelProperties: {
      id: {
        required: true,
        serializedName: "id",
        type: {
          name: "String"
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
      name: {
        required: true,
        serializedName: "name",
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
      drivers: {
        required: true,
        serializedName: "drivers",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      createdById: {
        required: true,
        serializedName: "createdById",
        type: {
          name: "String"
        }
      },
      updatedById: {
        required: true,
        serializedName: "updatedById",
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

export const DriverDto: msRest.CompositeMapper = {
  serializedName: "DriverDto",
  type: {
    name: "Composite",
    className: "DriverDto",
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

export const Driver: msRest.CompositeMapper = {
  serializedName: "Driver",
  type: {
    name: "Composite",
    className: "Driver",
    modelProperties: {
      id: {
        required: true,
        serializedName: "id",
        type: {
          name: "String"
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
      userId: {
        required: true,
        serializedName: "userId",
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
