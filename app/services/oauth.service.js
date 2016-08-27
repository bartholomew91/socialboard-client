System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var OAuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            OAuthService = (function () {
                function OAuthService() {
                    //store our OAuth result in an array for later access
                    this._result = [];
                }
                //setter for result array
                OAuthService.prototype.setResult = function (result, platform) {
                    this._result[platform] = result;
                };
                //getter for result array
                OAuthService.prototype.getResult = function (platform) {
                    return this._result[platform];
                };
                //check if authorized for a certain platform
                OAuthService.prototype.isAuthorized = function (platform) {
                    if (this._result[platform] != null) {
                        return (OAuth.create(platform) != false) ? true : false;
                    }
                    //if the result for the platform is not set or doesn't exist, return false
                    return (this._result[platform] != null) ? true : false;
                };
                //get text for navigation buttons based on whether they are connected
                //to a specific platform or not
                OAuthService.prototype.getButtonText = function (platform) {
                    //check if they are authorized
                    if (this.isAuthorized(platform)) {
                        //they're authorized, return the button text
                        return "View " + platform.charAt(0).toUpperCase() + platform.slice(1);
                    }
                    //they're not authorized, return the button text
                    return "Connect to " + platform.charAt(0).toUpperCase() + platform.slice(1);
                };
                //perform the OAuth login for the specified platform
                OAuthService.prototype.login = function (platform, is_cached) {
                    var _this = this;
                    //check if the is_cached variable is set.
                    //if it's not, set it to false otherwise set it to
                    //it's current value
                    is_cached = (is_cached === undefined) ? false : is_cached;
                    //open our OAuth popup for login and set the cached
                    //property so they won't have to re-login.
                    OAuth.popup(platform, { cache: is_cached })
                        .done(function (result) {
                        //success. update our result array
                        _this.setResult(result, platform);
                    })
                        .fail(function (err) {
                        //failed. update our result array with a null value
                        _this.setResult(null, platform);
                    });
                };
                OAuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], OAuthService);
                return OAuthService;
            }());
            exports_1("OAuthService", OAuthService);
        }
    }
});
//# sourceMappingURL=oauth.service.js.map