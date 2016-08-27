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
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments)).next());
        });
    };
    var core_1;
    var TwitterService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TwitterService = (function () {
                function TwitterService() {
                    this._tweets = [];
                }
                // function to return twitter mentions
                TwitterService.prototype.mentions = function (OAuthResult) {
                    if (OAuthResult != null) {
                        return this._get(OAuthResult, 'https://api.twitter.com/1.1/statuses/mentions_timeline.json');
                    }
                    else {
                        return null;
                    }
                };
                // function to return trending twitter topics
                TwitterService.prototype.trending = function (OAuthResult) {
                    if (OAuthResult != null) {
                        return this._get(OAuthResult, 'https://api.twitter.com/1.1/trends/place.json?id=1');
                    }
                    else {
                        return null;
                    }
                };
                // function to search twitter
                TwitterService.prototype.search = function (OAuthResult, query) {
                    if (OAuthResult != null) {
                        return this._get(OAuthResult, 'https://api.twitter.com/1.1/search/tweets.json?result_type=recent&count=100&q=' + query);
                    }
                    else {
                        return null;
                    }
                };
                // async/await function to make requests to the twitter api
                // this allows us to make sure our data is set AFTER the
                // http request has been sent.
                TwitterService.prototype._get = function (OAuthResult, apiUrl) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var result = null;
                        yield OAuthResult.get(apiUrl).done(function (response) {
                            console.log(response);
                            result = response.statuses;
                        }).error(function (error) {
                            console.error(error);
                        });
                        return result;
                    });
                };
                TwitterService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TwitterService);
                return TwitterService;
            }());
            exports_1("TwitterService", TwitterService);
        }
    }
});
//# sourceMappingURL=twitter.service.js.map