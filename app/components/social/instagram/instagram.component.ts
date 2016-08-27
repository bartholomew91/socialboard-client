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

	// store our posts in an array of objects
	posts: Array<Object>;

	constructor(
		private _router: Router,
		private _OAuthService: OAuthService,
		private _instagramService: InstagramService) {
		this._OAuthService.setResult(OAuth.create('instagram'), 'instagram');

		if (!this._OAuthService.isAuthorized('instagram')) {
			this._router.navigate(['Dashboard']);
		}
	}

	search(query) {
		// our encoded search query
		query = encodeURIComponent(query);
		// get our oAuth authorization result
		var result = this._OAuthService.getResult('instagram');
		// set our local this variable to another, to acess outside of scope
		var _this = this;

		this._instagramService.search(result, query).then(function(result) {
			_this.posts = result;
		});
	}
}