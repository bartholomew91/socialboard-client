import {Injectable} from 'angular2/core';

declare var OAuth: any;

@Injectable()
export class OAuthService {

	//store our OAuth result in an array for later access
	private _result = [];

	//setter for result array
	setResult(result, platform) {
		this._result[platform] = result;
	}

	//getter for result array
	getResult(platform) {
		return this._result[platform];
	}

	//check if authorized for a certain platform
	isAuthorized(platform) {
		if (this._result[platform] != null) {
			return (OAuth.create(platform) != false) ? true : false
		}
		//if the result for the platform is not set or doesn't exist, return false
		return (this._result[platform] != null) ? true : false;
	}

	//get text for navigation buttons based on whether they are connected
	//to a specific platform or not
	getButtonText(platform) {
		//check if they are authorized
		if (this.isAuthorized(platform)) {
			//they're authorized, return the button text
			return "View " + platform.charAt(0).toUpperCase() + platform.slice(1);
		}

		//they're not authorized, return the button text
		return "Connect to " + platform.charAt(0).toUpperCase() + platform.slice(1);
	}

	//perform the OAuth login for the specified platform
	login(platform, is_cached) {
		//check if the is_cached variable is set.
		//if it's not, set it to false otherwise set it to
		//it's current value
		is_cached = (is_cached === undefined) ? false : is_cached;

		//open our OAuth popup for login and set the cached
		//property so they won't have to re-login.
		OAuth.popup(platform, { cache: is_cached })
			.done((result) => {
				//success. update our result array
				this.setResult(result, platform);
			})
			.fail((err) => {
				//failed. update our result array with a null value
				this.setResult(null, platform);
			});
	}
}