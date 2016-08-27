import {Component} from 'angular2/core';
import {OAuthService} from '../../../services/oauth.service';
import {InstagramService} from '../../../services/social/instagram/instagram.service';
import {Router} from 'angular2/router';

declare var OAuth: any;

@Component({
	selector: 'my-dashboard',
	templateUrl: '../../../templates/instagram.component.html',
	providers: [
		OAuthService,
		InstagramService
	]
})

export class InstagramComponent {
	constructor(
		private _router: Router,
		private _OAuthService: OAuthService,
		private _instagramService: InstagramService) {
		this._OAuthService.setResult(OAuth.create('instagram'), 'instagram');

		if (!this._OAuthService.isAuthorized('instagram')) {
			this._router.navigate(['Dashboard']);
		}
	}
}