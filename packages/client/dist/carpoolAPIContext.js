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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var msRest = __importStar(require("@azure/ms-rest-js"));
var packageName = "";
var packageVersion = "0.0.6";
var CarpoolAPIContext = /** @class */ (function (_super) {
    __extends(CarpoolAPIContext, _super);
    /**
     * Initializes a new instance of the CarpoolAPIContext class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param [options] The parameter options
     */
    function CarpoolAPIContext(credentials, options) {
        var _this = this;
        if (credentials == undefined) {
            throw new Error("'credentials' cannot be null.");
        }
        if (!options) {
            options = {};
        }
        if (!options.userAgent) {
            var defaultUserAgent = msRest.getDefaultUserAgentValue();
            options.userAgent = packageName + "/" + packageVersion + " " + defaultUserAgent;
        }
        _this = _super.call(this, credentials, options) || this;
        _this.baseUri = options.baseUri || _this.baseUri || "http://localhost";
        _this.requestContentType = "application/json; charset=utf-8";
        _this.credentials = credentials;
        return _this;
    }
    return CarpoolAPIContext;
}(msRest.ServiceClient));
exports.CarpoolAPIContext = CarpoolAPIContext;
//# sourceMappingURL=carpoolAPIContext.js.map