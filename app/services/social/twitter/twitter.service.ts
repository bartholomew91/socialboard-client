import {Injectable} from 'angular2/core';

@Injectable()
export class TwitterService {

	private _tweets = [];

	// function to return twitter mentions
	mentions(OAuthResult) {
		if (OAuthResult != null) {
			return this._get(OAuthResult, 'https://api.twitter.com/1.1/statuses/mentions_timeline.json', this.mentions);
		} else {
			return null;
		}
	}

	// async/away function to make requests to the twitter api
	// this allows us to make sure our data is set AFTER the
	// http request has been sent.
	private async _get(OAuthResult, apiUrl, fn) {
		
		var result = null;
		
		await OAuthResult.get(apiUrl).done(function(response) {
			result = response;
		});

		return result;
	}
}