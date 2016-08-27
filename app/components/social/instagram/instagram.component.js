System.register(['angular2/core', '../../../services/oauth.service', '../../../services/social/instagram/instagram.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, oauth_service_1, instagram_service_1, router_1;
    var InstagramComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (oauth_service_1_1) {
                oauth_service_1 = oauth_service_1_1;
            },
            function (instagram_service_1_1) {
                instagram_service_1 = instagram_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            InstagramComponent = (function () {
                function InstagramComponent(_router, _OAuthService, _instagramService) {
                    this._router = _router;
                    this._OAuthService = _OAuthService;
                    this._instagramService = _instagramService;
                    this._OAuthService.setResult(OAuth.create('instagram'), 'instagram');
                    if (!this._OAuthService.isAuthorized('instagram')) {
                        this._router.navigate(['Dashboard']);
                    }
                }
                InstagramComponent.prototype.search = function (query) {
                    // our encoded search query
                    query = encodeURIComponent(query);
                    // get our oAuth authorization result
                    var result = this._OAuthService.getResult('instagram');
                    // set our local this variable to another, to acess outside of scope
                    var _this = this;
                    this._instagramService.search(result, query).then(function (result) {
                        _this.posts = result;
                    });
                };
                InstagramComponent = __decorate([
                    core_1.Component({
                        selector: 'my-dashboard',
                        templateUrl: '../../../templates/instagram.component.html',
                        providers: [
                            oauth_service_1.OAuthService,
                            instagram_service_1.InstagramService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, oauth_service_1.OAuthService, instagram_service_1.InstagramService])
                ], InstagramComponent);
                return InstagramComponent;
            }());
            exports_1("InstagramComponent", InstagramComponent);
        }
    }
});
//# sourceMappingURL=instagram.component.js.map