import {Injectable} from 'angular2/core';

@Injectable()
export class TwitterService {

	private _tweets = [];

	mentions(OAuthResult, response) {
		if (OAuthResult != null) {
			alert('oauth');
			this._get(OAuthResult, 'https://api.twitter.com/1.1/statuses/mentions_timeline.json', this.mentions);
		} else {
			alert('response');
			return Promise.resolve(response);
		}
	}

	private _get(OAuthResult, apiUrl, fn) {
		OAuthResult.get(apiUrl)
			.done((response) => {
				fn(null, response);
			});
	}
}