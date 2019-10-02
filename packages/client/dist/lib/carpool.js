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
exports.CarpoolModels = Models;
var Mappers = __importStar(require("./models/mappers"));
exports.CarpoolMappers = Mappers;
var Parameters = __importStar(require("./models/parameters"));
var carpoolContext_1 = require("./carpoolContext");
exports.CarpoolContext = carpoolContext_1.CarpoolContext;
var Carpool = /** @class */ (function (_super) {
    __extends(Carpool, _super);
    /**
     * Initializes a new instance of the Carpool class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param [options] The parameter options
     */
    function Carpool(credentials, options) {
        return _super.call(this, credentials, options) || this;
    }
    Carpool.prototype.signUp = function (signUpDto, options, callback) {
        return this.sendOperationRequest({
            signUpDto: signUpDto,
            options: options
        }, signUpOperationSpec, callback);
    };
    Carpool.prototype.signIn = function (authDto, options, callback) {
        return this.sendOperationRequest({
            authDto: authDto,
            options: options
        }, signInOperationSpec, callback);
    };
    Carpool.prototype.createEvent = function (createEventDto, options, callback) {
        return this.sendOperationRequest({
            createEventDto: createEventDto,
            options: options
        }, createEventOperationSpec, callback);
    };
    Carpool.prototype.updateEvent = function (updateEventDto, id, options, callback) {
        return this.sendOperationRequest({
            updateEventDto: updateEventDto,
            id: id,
            options: options
        }, updateEventOperationSpec, callback);
    };
    Carpool.prototype.getEvent = function (id, options, callback) {
        return this.sendOperationRequest({
            id: id,
            options: options
        }, getEventOperationSpec, callback);
    };
    Carpool.prototype.deleteEvent = function (id, options, callback) {
        return this.sendOperationRequest({
            id: id,
            options: options
        }, deleteEventOperationSpec, callback);
    };
    Carpool.prototype.createCarpool = function (createCarpoolDto, options, callback) {
        return this.sendOperationRequest({
            createCarpoolDto: createCarpoolDto,
            options: options
        }, createCarpoolOperationSpec, callback);
    };
    Carpool.prototype.getCarpool = function (id, options, callback) {
        return this.sendOperationRequest({
            id: id,
            options: options
        }, getCarpoolOperationSpec, callback);
    };
    Carpool.prototype.updateCarpool = function (updateCarpoolDto, id, options, callback) {
        return this.sendOperationRequest({
            updateCarpoolDto: updateCarpoolDto,
            id: id,
            options: options
        }, updateCarpoolOperationSpec, callback);
    };
    Carpool.prototype.deleteCarpool = function (id, options, callback) {
        return this.sendOperationRequest({
            id: id,
            options: options
        }, deleteCarpoolOperationSpec, callback);
    };
    return Carpool;
}(carpoolContext_1.CarpoolContext));
exports.Carpool = Carpool;
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
        201: {
            bodyMapper: Mappers.UserDto
        },
        default: {}
    },
    serializer: serializer
};
var signInOperationSpec = {
    httpMethod: "POST",
    path: "api/v1/auth/signin",
    requestBody: {
        parameterPath: "authDto",
        mapper: __assign(__assign({}, Mappers.AuthDto), { required: true })
    },
    responses: {
        200: {
            bodyMapper: Mappers.UserDto
        },
        default: {}
    },
    serializer: serializer
};
var createEventOperationSpec = {
    httpMethod: "POST",
    path: "api/v1/event",
    requestBody: {
        parameterPath: "createEventDto",
        mapper: __assign(__assign({}, Mappers.CreateEventDto), { required: true })
    },
    responses: {
        201: {
            bodyMapper: Mappers.Event
        },
        default: {}
    },
    serializer: serializer
};
var updateEventOperationSpec = {
    httpMethod: "PUT",
    path: "api/v1/event/{id}",
    urlParameters: [
        Parameters.id
    ],
    requestBody: {
        parameterPath: "updateEventDto",
        mapper: __assign(__assign({}, Mappers.UpdateEventDto), { required: true })
    },
    responses: {
        200: {
            bodyMapper: Mappers.Event
        },
        404: {},
        default: {}
    },
    serializer: serializer
};
var getEventOperationSpec = {
    httpMethod: "GET",
    path: "api/v1/event/{id}",
    urlParameters: [
        Parameters.id
    ],
    responses: {
        200: {
            bodyMapper: Mappers.Event
        },
        404: {},
        default: {}
    },
    serializer: serializer
};
var deleteEventOperationSpec = {
    httpMethod: "DELETE",
    path: "api/v1/event/{id}",
    urlParameters: [
        Parameters.id
    ],
    responses: {
        200: {
            bodyMapper: Mappers.Event
        },
        404: {},
        default: {}
    },
    serializer: serializer
};
var createCarpoolOperationSpec = {
    httpMethod: "POST",
    path: "api/v1/carpool",
    requestBody: {
        parameterPath: "createCarpoolDto",
        mapper: __assign(__assign({}, Mappers.CreateCarpoolDto), { required: true })
    },
    responses: {
        201: {
            bodyMapper: Mappers.CarpoolModel
        },
        default: {}
    },
    serializer: serializer
};
var getCarpoolOperationSpec = {
    httpMethod: "GET",
    path: "api/v1/carpool/{id}",
    urlParameters: [
        Parameters.id
    ],
    responses: {
        200: {
            bodyMapper: Mappers.CarpoolModel
        },
        404: {},
        default: {}
    },
    serializer: serializer
};
var updateCarpoolOperationSpec = {
    httpMethod: "PUT",
    path: "api/v1/carpool/{id}",
    urlParameters: [
        Parameters.id
    ],
    requestBody: {
        parameterPath: "updateCarpoolDto",
        mapper: __assign(__assign({}, Mappers.UpdateCarpoolDto), { required: true })
    },
    responses: {
        200: {
            bodyMapper: Mappers.CarpoolModel
        },
        404: {},
        default: {}
    },
    serializer: serializer
};
var deleteCarpoolOperationSpec = {
    httpMethod: "DELETE",
    path: "api/v1/carpool/{id}",
    urlParameters: [
        Parameters.id
    ],
    responses: {
        200: {
            bodyMapper: Mappers.CarpoolModel
        },
        404: {},
        default: {}
    },
    serializer: serializer
};
//# sourceMappingURL=carpool.js.map