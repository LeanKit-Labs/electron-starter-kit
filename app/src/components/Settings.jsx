import React from "react";
import Navigation from "./Navigation";

class Settings extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			text: "WUT UP"
		};
	}

	render() {
		return (
			<div>
				<Navigation />
				<div className="container-fluid" id="main">
					<h1>Settings</h1>
				</div>
			</div>
		);
	}
}

// Settings.propTypes = {
// 	rating: React.PropTypes.string,
// 	text: React.PropTypes.string,
// 	onRatingChange: React.PropTypes.func,
// 	onSearchTextChange: React.PropTypes.func,
// 	onSearch: React.PropTypes.func
// };

export default Settings;
