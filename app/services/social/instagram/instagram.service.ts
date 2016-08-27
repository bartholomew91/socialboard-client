import {Injectable} from 'angular2/core';

@Injectable()
export class InstagramService {

	private _posts = [];

	// function to search twitter
	search(OAuthResult, query) {
		console.log(OAuthResult);
		if (OAuthResult != null) {
			return this._get(OAuthResult, 'https://api.instagram.com/v1/tags/' + query + '/media/recent?access_token=' + OAuthResult.access_token);
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
			result = response.data;
			console.log(result);
		}).error(function(error) {
			console.error(error);
		});

		return result;
	}
}