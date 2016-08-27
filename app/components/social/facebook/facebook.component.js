System.register(['angular2/core', '../../../services/oauth.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, oauth_service_1, router_1;
    var FacebookComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (oauth_service_1_1) {
                oauth_service_1 = oauth_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            FacebookComponent = (function () {
                function FacebookComponent(_router, _OAuthService) {
                    this._router = _router;
                    this._OAuthService = _OAuthService;
                    this._OAuthService.setResult(OAuth.create('facebook'), 'facebook');
                    if (!this._OAuthService.isAuthorized('facebook')) {
                        this._router.navigate(['Dashboard']);
                    }
                }
                FacebookComponent = __decorate([
                    core_1.Component({
                        selector: 'my-dashboard',
                        templateUrl: '../../templates/facebook.component.html',
                        providers: [
                            oauth_service_1.OAuthService,
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, oauth_service_1.OAuthService])
                ], FacebookComponent);
                return FacebookComponent;
            }());
            exports_1("FacebookComponent", FacebookComponent);
        }
    }
});
//# sourceMappingURL=facebook.component.js.map