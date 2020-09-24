import React, { Component } from "react";
import places from "places.js";
import connect from "./connector";

class Places extends Component {
  createRef = (c) => (this.element = c);

  componentDidMount() {
    const { refine, defaultRefinement, value } = this.props;

    const autocomplete = places({
      container: this.element,
      useDeviceLocation: true,
    });
    autocomplete.setVal(value);

    autocomplete.on("change", (event) => {
      this.props.handleChange && this.props.handleChange(event);
      refine(event.suggestion.latlng);
    });

    autocomplete.on("clear", () => {
      refine(defaultRefinement);
    });
  }

  render() {
    return (
      <div style={{ marginBottom: 20 }}>
        <input
          ref={this.createRef}
          type="search"
          id="address-input"
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

export default connect(Places);
