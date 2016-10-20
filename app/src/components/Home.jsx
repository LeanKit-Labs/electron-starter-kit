import React from "react";
import Navigation from "./Navigation";

class Home extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			text: "WUT UP"
		};
	}

	onTextChange( e ) {
		this.setState( { text: e.target.value } );
	}

	render() {
		return (
			<div>
				<Navigation />
				<div className="container-fluid" id="main">
					<h1>Home</h1>
					<span>{this.state.text}</span>
					<form>
						<div className="input-group">
							<input type="text"
								value={ this.state.text }
								onChange={ this.onTextChange.bind( this ) }
								className="form-control"
								placeholder=""
								name="search-term" />
						</div>
					</form>
				</div>
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

export default Home;
