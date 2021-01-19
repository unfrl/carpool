import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter
} from "@azure/core-http";
import {
  SignUpDto as SignUpDtoMapper,
  SignInDto as SignInDtoMapper,
  GoogleSignInDto as GoogleSignInDtoMapper,
  PasswordResetRequestDto as PasswordResetRequestDtoMapper,
  PasswordResetDto as PasswordResetDtoMapper,
  UpsertCarpoolDto as UpsertCarpoolDtoMapper,
  UpsertDriverDto as UpsertDriverDtoMapper,
  UpsertPassengerDto as UpsertPassengerDtoMapper,
  VerificationDto as VerificationDtoMapper
} from "../models/mappers";

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const body: OperationParameter = {
  parameterPath: "body",
  mapper: SignUpDtoMapper
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const body1: OperationParameter = {
  parameterPath: "body",
  mapper: SignInDtoMapper
};

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const body2: OperationParameter = {
  parameterPath: "body",
  mapper: GoogleSignInDtoMapper
};

export const body3: OperationParameter = {
  parameterPath: "body",
  mapper: PasswordResetRequestDtoMapper
};

export const body4: OperationParameter = {
  parameterPath: "body",
  mapper: PasswordResetDtoMapper
};

export const accept1: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const typeParam: OperationQueryParameter = {
  parameterPath: "typeParam",
  mapper: {
    serializedName: "type",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const displayName: OperationURLParameter = {
  parameterPath: "displayName",
  mapper: {
    serializedName: "displayName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body5: OperationParameter = {
  parameterPath: "body",
  mapper: UpsertCarpoolDtoMapper
};

export const id: OperationURLParameter = {
  parameterPath: "id",
  mapper: {
    serializedName: "id",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const includeMetadata: OperationQueryParameter = {
  parameterPath: "includeMetadata",
  mapper: {
    serializedName: "includeMetadata",
    required: true,
    type: {
      name: "Boolean"
    }
  }
};

export const body6: OperationParameter = {
  parameterPath: "body",
  mapper: UpsertDriverDtoMapper
};

export const driverId: OperationURLParameter = {
  parameterPath: "driverId",
  mapper: {
    serializedName: "driverId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body7: OperationParameter = {
  parameterPath: "body",
  mapper: UpsertPassengerDtoMapper
};

export const body8: OperationParameter = {
  parameterPath: "body",
  mapper: VerificationDtoMapper
};
