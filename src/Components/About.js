import React, { Component } from "react";
import AboutStyles from "./About.module.scss";

class About extends Component {
  render() {
    return (
      <div className={AboutStyles.container}>
        <h1 className={AboutStyles.h1}>About This Site</h1>
        <hr />
        <h2 className={AboutStyles.h2}>What is this?</h2>
        <p className={AboutStyles.p}>
          Made by James DiGrazia as part of data vis class at rit etc etc What
          is the site, what the reader should get out of it, how to use it, and
          how it was developed. Any outside materials you use or reference
          heavily should be credited (i.e., the book, the D3 project website,
          etc.).
        </p>
        <h2 className={AboutStyles.h2}>Sources</h2>
        <p className={AboutStyles.p}>
          What is the site, what the reader should get out of it, how to use it,
          and how it was developed. Any outside materials you use or reference
          heavily should be credited (i.e., the book, the D3 project website,
          etc.).
        </p>
      </div>
    );
  }
}

export default About;
