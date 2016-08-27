//all the imports needed for our app
import {Component, OnInit} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from 'angular2/router';
import {Observable} from 'rxjs/Rx';
import {OAuthService} from '../services/oauth.service';
import {TwitterComponent} from './social/twitter/twitter.component';
import {FacebookComponent} from './social/facebook/facebook.component';
import {InstagramComponent} from './social/instagram/instagram.component';
import {DashboardComponent} from './main/dashboard.component';
import {RundownComponent} from './main/rundown.component';

declare var OAuth: any;

//our main app component
@Component({
	selector: 'my-app',
	templateUrl: '../templates/app.component.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [
		ROUTER_PROVIDERS,
		OAuthService
	]
})

//setup our routes
@RouteConfig([
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: DashboardComponent,
		useAsDefault: true
	},
	{
		path: '/twitter',
		name: 'Twitter',
		component: TwitterComponent
	},
	{
		path: '/facebook',
		name: 'Facebook',
		component: FacebookComponent
	},
	{
		path: '/instagram',
		name: 'Instagram',
		component: InstagramComponent
	},
	{
		path: '/rundown',
		name: 'Rundown',
		component: RundownComponent
	}
])

export class AppComponent {

	//our constructor. It checks for platform authorization every 1 second
	constructor(
		private _router: Router,
		private _OAuthService: OAuthService) {
		Observable.interval(1000).subscribe(() => {
			this.checkAuthorized('twitter');
			this.checkAuthorized('facebook');
			this.checkAuthorized('instagram');
		});
	}

	//navigate our routes based on the buttons clicked
	navigate(route, is_cached) {
		//if it's not the dashboard, try to login
		//if they are already logged in navigate to the route
		if (route != "dashboard" && route != "rundown") {
			this.OAuthLogin(route, is_cached);
		} else {
			//navigate to the dashboard route
			this._router.navigate([route.charAt(0).toUpperCase() + route.slice(1)]);
		}
	}

	//login to the platform with OAuth
	OAuthLogin(platform, is_cached) {
		//if they aren't authorized, show the OAuth login popup for the platform
		if (!this._OAuthService.isAuthorized(platform)) {
			//call the OAuthService login function
			this._OAuthService.login(platform, is_cached);
		} else {
			//they're authorized, navigate to the route
			this._router.navigate([platform.charAt(0).toUpperCase() + platform.slice(1)]);
		}
	}

	//check for platform authorization
	checkAuthorized(platform) {
		//set a variable noting if they are authorized or not (from OAuth cache)
		var authorized = OAuth.create(platform);

		//they're authorized, we set the result array in our OAuthService
		if (authorized) {
			this._OAuthService.setResult(authorized, platform);
		}
	}
}