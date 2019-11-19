"use strict";
/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var msRest = __importStar(require("@azure/ms-rest-js"));
var Models = __importStar(require("./models"));
exports.CarpoolAPIModels = Models;
var Mappers = __importStar(require("./models/mappers"));
exports.CarpoolAPIMappers = Mappers;
var Parameters = __importStar(require("./models/parameters"));
var carpoolAPIContext_1 = require("./carpoolAPIContext");
exports.CarpoolAPIContext = carpoolAPIContext_1.CarpoolAPIContext;
var CarpoolAPI = /** @class */ (function (_super) {
    __extends(CarpoolAPI, _super);
    /**
     * Initializes a new instance of the CarpoolAPI class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param [options] The parameter options
     */
    function CarpoolAPI(credentials, options) {
        return _super.call(this, credentials, options) || this;
    }
    CarpoolAPI.prototype.signUp = function (signUpDto, options, callback) {
        return this.sendOperationRequest({
            signUpDto: signUpDto,
            options: options
        }, signUpOperationSpec, callback);
    };
    CarpoolAPI.prototype.signIn = function (signInDto, options, callback) {
        return this.sendOperationRequest({
            signInDto: signInDto,
            options: options
        }, signInOperationSpec, callback);
    };
    CarpoolAPI.prototype.signInWithGoogle = function (googleSignInDto, options, callback) {
        return this.sendOperationRequest({
            googleSignInDto: googleSignInDto,
            options: options
        }, signInWithGoogleOperationSpec, callback);
    };
    CarpoolAPI.prototype.requestPasswordReset = function (passwordResetRequestDto, options, callback) {
        return this.sendOperationRequest({
            passwordResetRequestDto: passwordResetRequestDto,
            options: options
        }, requestPasswordResetOperationSpec, callback);
    };
    CarpoolAPI.prototype.resetPassword = function (passwordResetDto, options, callback) {
        return this.sendOperationRequest({
            passwordResetDto: passwordResetDto,
            options: options
        }, resetPasswordOperationSpec, callback);
    };
    CarpoolAPI.prototype.getMyProfile = function (options, callback) {
        return this.sendOperationRequest({
            options: options
        }, getMyProfileOperationSpec, callback);
    };
    CarpoolAPI.prototype.getMyCarpools = function (options, callback) {
        return this.sendOperationRequest({
            options: options
        }, getMyCarpoolsOperationSpec, callback);
    };
    CarpoolAPI.prototype.getUserCarpools = function (displayName, options, callback) {
        return this.sendOperationRequest({
            displayName: displayName,
            options: options
        }, getUserCarpoolsOperationSpec, callback);
    };
    CarpoolAPI.prototype.createCarpool = function (upsertCarpoolDto, options, callback) {
        return this.sendOperationRequest({
            upsertCarpoolDto: upsertCarpoolDto,
            options: options
        }, createCarpoolOperationSpec, callback);
    };
    CarpoolAPI.prototype.getCarpool = function (id, options, callback) {
        return this.sendOperationRequest({
            id: id,
            options: options
        }, getCarpoolOperationSpec, callback);
    };
    CarpoolAPI.prototype.updateCarpool = function (upsertCarpoolDto, id, options, callback) {
        return this.sendOperationRequest({
            upsertCarpoolDto: upsertCarpoolDto,
            id: id,
            options: options
        }, updateCarpoolOperationSpec, callback);
    };
    CarpoolAPI.prototype.deleteCarpool = function (id, options, callback) {
        return this.sendOperationRequest({
            id: id,
            options: options
        }, deleteCarpoolOperationSpec, callback);
    };
    CarpoolAPI.prototype.createDriver = function (upsertDriverDto, id, options, callback) {
        return this.sendOperationRequest({
            upsertDriverDto: upsertDriverDto,
            id: id,
            options: options
        }, createDriverOperationSpec, callback);
    };
    CarpoolAPI.prototype.getDrivers = function (id, options, callback) {
        return this.sendOperationRequest({
            id: id,
            options: options
        }, getDriversOperationSpec, callback);
    };
    CarpoolAPI.prototype.createPassenger = function (upsertPassengerDto, id, options, callback) {
        return this.sendOperationRequest({
            upsertPassengerDto: upsertPassengerDto,
            id: id,
            options: options
        }, createPassengerOperationSpec, callback);
    };
    CarpoolAPI.prototype.deletePassenger = function (id, options, callback) {
        return this.sendOperationRequest({
            id: id,
            options: options
        }, deletePassengerOperationSpec, callback);
    };
    CarpoolAPI.prototype.getPassengers = function (id, options, callback) {
        return this.sendOperationRequest({
            id: id,
            options: options
        }, getPassengersOperationSpec, callback);
    };
    CarpoolAPI.prototype.verifyUser = function (verificationDto, options, callback) {
        return this.sendOperationRequest({
            verificationDto: verificationDto,
            options: options
        }, verifyUserOperationSpec, callback);
    };
    return CarpoolAPI;
}(carpoolAPIContext_1.CarpoolAPIContext));
exports.CarpoolAPI = CarpoolAPI;
// Operation Specifications
var serializer = new msRest.Serializer(Mappers);
var signUpOperationSpec = {
    httpMethod: "POST",
    path: "api/v1/auth/signup",
    requestBody: {
        parameterPath: "signUpDto",
        mapper: __assign(__assign({}, Mappers.SignUpDto), { required: true })
    },
    responses: {
        200: {},
        default: {}
    },
    serializer: serializer
};
var signInOperationSpec = {
    httpMethod: "POST",
    path: "api/v1/auth/signin",
    requestBody: {
        parameterPath: "signInDto",
        mapper: __assign(__assign({}, Mappers.SignInDto), { required: true })
    },
    responses: {
        200: {
            bodyMapper: Mappers.AuthDto
        },
        default: {}
    },
    serializer: serializer
};
var signInWithGoogleOperationSpec = {
    httpMethod: "POST",
    path: "api/v1/auth/signinwithgoogle",
    requestBody: {
        parameterPath: "googleSignInDto",
        mapper: __assign(__assign({}, Mappers.GoogleSignInDto), { required: true })
    },
    responses: {
        200: {
            bodyMapper: Mappers.SocialAuthDto
        },
        default: {}
    },
    serializer: serializer
};
var requestPasswordResetOperationSpec = {
    httpMethod: "POST",
    path: "api/v1/auth/requestpasswordreset",
    requestBody: {
        parameterPath: "passwordResetRequestDto",
        mapper: __assign(__assign({}, Mappers.PasswordResetRequestDto), { required: true })
    },
    responses: {
        200: {},
        default: {}
    },
    serializer: serializer
};
var resetPasswordOperationSpec = {
    httpMethod: "PUT",
    path: "api/v1/auth/resetpassword",
    requestBody: {
        parameterPath: "passwordResetDto",
        mapper: __assign(__assign({}, Mappers.PasswordResetDto), { required: true })
    },
    responses: {
        200: {
            bodyMapper: Mappers.AuthDto
        },
        default: {}
    },
    serializer: serializer
};
var getMyProfileOperationSpec = {
    httpMethod: "GET",
    path: "api/v1/users/me",
    responses: {
        200: {
            bodyMapper: Mappers.UserDto
        },
        default: {}
    },
    serializer: serializer
};
var getMyCarpoolsOperationSpec = {
    httpMethod: "GET",
    path: "api/v1/users/me/carpools",
    responses: {
        200: {
            bodyMapper: {
                serializedName: "parsedResponse",
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "CarpoolDto"
                        }
                    }
                }
            }
        },
        default: {}
    },
    serializer: serializer
};
var getUserCarpoolsOperationSpec = {
    httpMethod: "GET",
    path: "api/v1/users/{displayName}/carpools",
    urlParameters: [
        Parameters.displayName
    ],
    responses: {
        200: {
            bodyMapper: {
                serializedName: "parsedResponse",
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "CarpoolDto"
                        }
                    }
                }
            }
        },
        default: {}
    },
    serializer: serializer
};
var createCarpoolOperationSpec = {
    httpMethod: "POST",
    path: "api/v1/carpools",
    requestBody: {
        parameterPath: "upsertCarpoolDto",
        mapper: __assign(__assign({}, Mappers.UpsertCarpoolDto), { required: true })
    },
    responses: {
        201: {
            bodyMapper: Mappers.CarpoolDto
        },
        default: {}
    },
    serializer: serializer
};
var getCarpoolOperationSpec = {
    httpMethod: "GET",
    path: "api/v1/carpools/{id}",
    urlParameters: [
        Parameters.id
    ],
    responses: {
        200: {
            bodyMapper: Mappers.CarpoolDto
        },
        default: {}
    },
    serializer: serializer
};
var updateCarpoolOperationSpec = {
    httpMethod: "PUT",
    path: "api/v1/carpools/{id}",
    urlParameters: [
        Parameters.id
    ],
    requestBody: {
        parameterPath: "upsertCarpoolDto",
        mapper: __assign(__assign({}, Mappers.UpsertCarpoolDto), { required: true })
    },
    responses: {
        200: {
            bodyMapper: Mappers.CarpoolDto
        },
        default: {}
    },
    serializer: serializer
};
var deleteCarpoolOperationSpec = {
    httpMethod: "DELETE",
    path: "api/v1/carpools/{id}",
    urlParameters: [
        Parameters.id
    ],
    responses: {
        204: {},
        default: {}
    },
    serializer: serializer
};
var createDriverOperationSpec = {
    httpMethod: "POST",
    path: "api/v1/carpools/{id}/drivers",
    urlParameters: [
        Parameters.id
    ],
    requestBody: {
        parameterPath: "upsertDriverDto",
        mapper: __assign(__assign({}, Mappers.UpsertDriverDto), { required: true })
    },
    responses: {
        201: {
            bodyMapper: Mappers.DriverDto
        },
        default: {}
    },
    serializer: serializer
};
var getDriversOperationSpec = {
    httpMethod: "GET",
    path: "api/v1/carpools/{id}/drivers",
    urlParameters: [
        Parameters.id
    ],
    responses: {
        200: {
            bodyMapper: {
                serializedName: "parsedResponse",
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "DriverDto"
                        }
                    }
                }
            }
        },
        default: {}
    },
    serializer: serializer
};
var createPassengerOperationSpec = {
    httpMethod: "POST",
    path: "api/v1/drivers/{id}/passengers",
    urlParameters: [
        Parameters.id
    ],
    requestBody: {
        parameterPath: "upsertPassengerDto",
        mapper: __assign(__assign({}, Mappers.UpsertPassengerDto), { required: true })
    },
    responses: {
        201: {
            bodyMapper: Mappers.PassengerDto
        },
        default: {}
    },
    serializer: serializer
};
var deletePassengerOperationSpec = {
    httpMethod: "DELETE",
    path: "api/v1/drivers/{id}/passengers",
    urlParameters: [
        Parameters.id
    ],
    responses: {
        204: {},
        default: {}
    },
    serializer: serializer
};
var getPassengersOperationSpec = {
    httpMethod: "GET",
    path: "api/v1/drivers/{id}/passengers",
    urlParameters: [
        Parameters.id
    ],
    responses: {
        200: {
            bodyMapper: {
                serializedName: "parsedResponse",
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
        },
        default: {}
    },
    serializer: serializer
};
var verifyUserOperationSpec = {
    httpMethod: "PUT",
    path: "api/v1/verification",
    requestBody: {
        parameterPath: "verificationDto",
        mapper: __assign(__assign({}, Mappers.VerificationDto), { required: true })
    },
    responses: {
        200: {
            bodyMapper: Mappers.AuthDto
        },
        default: {}
    },
    serializer: serializer
};
//# sourceMappingURL=carpoolAPI.js.map