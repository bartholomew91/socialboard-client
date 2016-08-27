System.register(['angular2/core', '../../../services/oauth.service', '../../../services/social/twitter/twitter.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, oauth_service_1, twitter_service_1, router_1;
    var TwitterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (oauth_service_1_1) {
                oauth_service_1 = oauth_service_1_1;
            },
            function (twitter_service_1_1) {
                twitter_service_1 = twitter_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            TwitterComponent = (function () {
                // if the user tries to navigate to the twitter view without being
                // logged in, redirect them to the dashboard.
                function TwitterComponent(_router, _OAuthService, _twitterService) {
                    this._router = _router;
                    this._OAuthService = _OAuthService;
                    this._twitterService = _twitterService;
                    this._OAuthService.setResult(OAuth.create('twitter'), 'twitter');
                    if (!this._OAuthService.isAuthorized('twitter')) {
                        this._router.navigate(['Dashboard']);
                    }
                }
                // get twitter mentions
                TwitterComponent.prototype.getMentions = function () {
                    // get our oAuth authorization result
                    var result = this._OAuthService.getResult('twitter');
                    // set our local this variable to another, to acess outside of scope
                    var _this = this;
                    // get our mentions and set it to our local scope
                    this._twitterService.mentions(result).then(function (result) {
                        _this.tweets = result;
                    });
                };
                // get trending twitter topics
                TwitterComponent.prototype.getTrending = function () {
                    // get our oAuth authorization result
                    var result = this._OAuthService.getResult('twitter');
                    // set our local this variable to another, to acess outside of scope
                    var _this = this;
                    // get our trending tweets and set it to our local scope
                    this._twitterService.trending(result).then(function (result) {
                        _this.tweets = result;
                    });
                };
                // search twitter
                TwitterComponent.prototype.search = function (query) {
                    // our encoded search query
                    query = encodeURIComponent(query);
                    // get our oAuth authorization result
                    var result = this._OAuthService.getResult('twitter');
                    // set our local this variable to another, to acess outside of scope
                    var _this = this;
                    this._twitterService.search(result, query).then(function (result) {
                        _this.tweets = result;
                    });
                };
                TwitterComponent = __decorate([
                    core_1.Component({
                        selector: 'my-dashboard',
                        templateUrl: '../../../templates/twitter.component.html',
                        providers: [
                            oauth_service_1.OAuthService,
                            twitter_service_1.TwitterService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, oauth_service_1.OAuthService, twitter_service_1.TwitterService])
                ], TwitterComponent);
                return TwitterComponent;
            }());
            exports_1("TwitterComponent", TwitterComponent);
        }
    }
});
//# sourceMappingURL=twitter.component.js.map