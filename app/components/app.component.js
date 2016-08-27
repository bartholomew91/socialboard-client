System.register(['angular2/core', 'angular2/router', 'rxjs/Rx', '../services/oauth.service', './social/twitter/twitter.component', './social/facebook/facebook.component', './social/instagram/instagram.component', './main/dashboard.component', './main/rundown.component'], function(exports_1, context_1) {
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
    var core_1, router_1, Rx_1, oauth_service_1, twitter_component_1, facebook_component_1, instagram_component_1, dashboard_component_1, rundown_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (oauth_service_1_1) {
                oauth_service_1 = oauth_service_1_1;
            },
            function (twitter_component_1_1) {
                twitter_component_1 = twitter_component_1_1;
            },
            function (facebook_component_1_1) {
                facebook_component_1 = facebook_component_1_1;
            },
            function (instagram_component_1_1) {
                instagram_component_1 = instagram_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (rundown_component_1_1) {
                rundown_component_1 = rundown_component_1_1;
            }],
        execute: function() {
            //our main app component
            AppComponent = (function () {
                //our constructor. It checks for platform authorization every 1 second
                function AppComponent(_router, _OAuthService) {
                    var _this = this;
                    this._router = _router;
                    this._OAuthService = _OAuthService;
                    Rx_1.Observable.interval(1000).subscribe(function () {
                        _this.checkAuthorized('twitter');
                        _this.checkAuthorized('facebook');
                        _this.checkAuthorized('instagram');
                    });
                }
                //navigate our routes based on the buttons clicked
                AppComponent.prototype.navigate = function (route, is_cached) {
                    //if it's not the dashboard, try to login
                    //if they are already logged in navigate to the route
                    if (route != "dashboard" && route != "rundown") {
                        this.OAuthLogin(route, is_cached);
                    }
                    else {
                        //navigate to the dashboard route
                        this._router.navigate([route.charAt(0).toUpperCase() + route.slice(1)]);
                    }
                };
                //login to the platform with OAuth
                AppComponent.prototype.OAuthLogin = function (platform, is_cached) {
                    //if they aren't authorized, show the OAuth login popup for the platform
                    if (!this._OAuthService.isAuthorized(platform)) {
                        //call the OAuthService login function
                        this._OAuthService.login(platform, is_cached);
                    }
                    else {
                        //they're authorized, navigate to the route
                        this._router.navigate([platform.charAt(0).toUpperCase() + platform.slice(1)]);
                    }
                };
                //check for platform authorization
                AppComponent.prototype.checkAuthorized = function (platform) {
                    //set a variable noting if they are authorized or not (from OAuth cache)
                    var authorized = OAuth.create(platform);
                    //they're authorized, we set the result array in our OAuthService
                    if (authorized) {
                        this._OAuthService.setResult(authorized, platform);
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: '../templates/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            oauth_service_1.OAuthService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/dashboard',
                            name: 'Dashboard',
                            component: dashboard_component_1.DashboardComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/twitter',
                            name: 'Twitter',
                            component: twitter_component_1.TwitterComponent
                        },
                        {
                            path: '/facebook',
                            name: 'Facebook',
                            component: facebook_component_1.FacebookComponent
                        },
                        {
                            path: '/instagram',
                            name: 'Instagram',
                            component: instagram_component_1.InstagramComponent
                        },
                        {
                            path: '/rundown',
                            name: 'Rundown',
                            component: rundown_component_1.RundownComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, oauth_service_1.OAuthService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map