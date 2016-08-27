import {Injectable} from 'angular2/core';

@Injectable()
export class TwitterService {

	private _tweets = [];

	// function to return twitter mentions
	mentions(OAuthResult) {
		if (OAuthResult != null) {
			return this._get(OAuthResult, 'https://api.twitter.com/1.1/statuses/mentions_timeline.json');
		} else {
			return null;
		}
	}

	// function to return trending twitter topics
	trending(OAuthResult) {
		if (OAuthResult != null) {
			return this._get(OAuthResult, 'https://api.twitter.com/1.1/trends/place.json?id=1');
		} else {
			return null;
		}
	}

	// function to search twitter
	search(OAuthResult, query) {
		if (OAuthResult != null) {
			return this._get(OAuthResult, 'https://api.twitter.com/1.1/search/tweets.json?result_type=recent&count=100&q=' + query);
		} else {
			return null;
		}
	}

	// async/await function to make requests to the twitter api
	// this allows us to make sure our data is set AFTER the
	// http request has been sent.
	private async _get(OAuthResult, apiUrl) {
		
		var result = null;
		
		await OAuthResult.get(apiUrl).done(function(response) {
			console.log(response);
			result = response.statuses;
		}).error(function(error) {
			console.error(error);
		});

		return result;
	}
}