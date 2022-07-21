import React, { Component } from "react";

export default class FooterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div >

        <footer className="navbar navbar-dark bg-dark footer">
          <span style={{color: "white", margin: "0 auto"}}>
            All Rights Reserved 2021 @Stuart Kasekende
          </span>
        </footer>

      </div>
    );
  }
}
