import {Component} from 'angular2/core';
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
	mentions: Array<Object>;

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
		var result = this._OAuthService.getResult('twitter');

		result.get('https://api.twitter.com/1.1/statuses/mentions_timeline.json').done(function(response) {
			this.mentions = response;
			console.log(this.mentions);
		});

		//console.log(this.mentions);

		//return this.mentions;

		//this._twitterService.mentions(result, null).then(response => console.log(response));
		/* result.get('https://api.twitter.com/1.1/statuses/mentions_timeline.json')
			.done(function(response) {
				console.log(response);
			}); */
	}

	// get trending twitter topics
	getTrending() {
		var result = this._OAuthService.getResult('twitter');

		result.get('https://api.twitter.com/1.1/trends/place.json?id=1')
			.done(function(response) {
				console.log(response);
			});
	}

	// search twitter
	search(query) {
		query = encodeURIComponent(query);
		var result = this._OAuthService.getResult('twitter');

		result.get('https://api.twitter.com/1.1/search/tweets.json?result_type=recent&count=100&q=' + query)
			.done(function(response) {
				console.log(response);
			})
			.fail(function(err) {
				console.log(err);
			});
	}
}