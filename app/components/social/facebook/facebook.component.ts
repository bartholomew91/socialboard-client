/**
* Facebook component
**/
import {Component} from 'angular2/core';
import {OAuthService} from '../../../services/oauth.service';
//import {FacebookService} from '../../services/social/facebook/facebook.service';
import {Router} from 'angular2/router';

declare var OAuth: any;

@Component({
	selector: 'my-dashboard',
	templateUrl: '../../templates/facebook.component.html',
	providers: [
		OAuthService,
		//FacebookService
	]
})

export class FacebookComponent {
	constructor(
		private _router: Router,
		private _OAuthService: OAuthService
		/*private _facebookService: FacebookService*/) {
		this._OAuthService.setResult(OAuth.create('facebook'), 'facebook');

		if (!this._OAuthService.isAuthorized('facebook')) {
			this._router.navigate(['Dashboard']);
		}
	}
}