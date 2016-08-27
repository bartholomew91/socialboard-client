import {Component} from 'angular2/core';
import {Response} from 'angular2/http';
import {OAuthService} from '../../../services/oauth.service';
import {TwitterService} from '../../../services/social/twitter/twitter.service';
import {Router} from 'angular2/router';

declare var OAuth: any;

@Component({
	selector: 'my-dashboard',
	templateUrl: '../../../templates/twitter.component.html',
	providers: [
		OAuthService,
		TwitterService
	]
})

export class TwitterComponent {

	// store our mentions in an array of objects
	tweets: Array<Object>;

	// if the user tries to navigate to the twitter view without being
	// logged in, redirect them to the dashboard.
	constructor(
		private _router: Router,
		private _OAuthService: OAuthService,
		private _twitterService: TwitterService) {
		this._OAuthService.setResult(OAuth.create('twitter'), 'twitter');

		if (!this._OAuthService.isAuthorized('twitter')) {
			this._router.navigate(['Dashboard']);
		}
	}

	// get twitter mentions
	getMentions() {
		// get our oAuth authorization result
		var result = this._OAuthService.getResult('twitter');
		// set our local this variable to another, to acess outside of scope
		var _this = this;

		// get our mentions and set it to our local scope
		this._twitterService.mentions(result).then(function(result) {
			_this.tweets = result;
		});
	}

	// get trending twitter topics
	getTrending() {
		// get our oAuth authorization result
		var result = this._OAuthService.getResult('twitter');
		// set our local this variable to another, to acess outside of scope
		var _this = this;

		// get our trending tweets and set it to our local scope
		this._twitterService.trending(result).then(function(result) {
			_this.tweets = result;
		});
	}

	// search twitter
	search(query) {
		// our encoded search query
		query = encodeURIComponent(query);
		// get our oAuth authorization result
		var result = this._OAuthService.getResult('twitter');
		// set our local this variable to another, to acess outside of scope
		var _this = this;

		this._twitterService.search(result, query).then(function(result) {
			_this.tweets = result;
		});
	}
}