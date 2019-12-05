/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";

export const displayName: msRest.OperationURLParameter = {
  parameterPath: "displayName",
  mapper: {
    required: true,
    serializedName: "displayName",
    type: {
      name: "String"
    }
  }
};
export const id: msRest.OperationURLParameter = {
  parameterPath: "id",
  mapper: {
    required: true,
    serializedName: "id",
    type: {
      name: "String"
    }
  }
};
export const includeMetadata: msRest.OperationQueryParameter = {
  parameterPath: "includeMetadata",
  mapper: {
    required: true,
    serializedName: "includeMetadata",
    type: {
      name: "Boolean"
    }
  }
};
export const type: msRest.OperationQueryParameter = {
  parameterPath: "type",
  mapper: {
    required: true,
    serializedName: "type",
    type: {
      name: "String"
    }
  }
};
