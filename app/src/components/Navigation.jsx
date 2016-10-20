import React from "react";
import { Link } from "react-router";

class Navigation extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div id="side-nav">
				<ul>
					<li><Link to="/" className="nav"><i className="fa fa-home" /></Link></li>
					<li><Link to="/settings" className="nav"><i className="fa fa-cog" /></Link></li>
				</ul>
				<img className="logo" src="./images/lk-logo.svg" />
			</div>
		);
	}
}

// Home.propTypes = {
// 	rating: React.PropTypes.string,
// 	text: React.PropTypes.string,
// 	onRatingChange: React.PropTypes.func,
// 	onSearchTextChange: React.PropTypes.func,
// 	onSearch: React.PropTypes.func
// };

export default Navigation;
