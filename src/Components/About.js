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
          <ul className={AboutStyles.ul}>
            <li>
              Referenced for some visualiztion descriptions and generel info:{" "}
              <a href="https://datavizproject.com/">Data Vis Project</a>
            </li>
            <li>
              Referenced for some visualiztion descriptions and generel info:{" "}
              <a href="https://datavizcatalogue.com/">Data Vis Catalogue</a>
            </li>
            <li>
              Referenced for some visualiztion descriptions and generel info:{" "}
              <a href="https://www.r-graph-gallery.com/">R Graph gallery</a>
            </li>
            <li>
              Referenced code for chord chart:{" "}
              <a href="https://blockbuilder.org/mbostock/4062006">Source</a>
            </li>
            <li>
              Referenced code for cluster chart:{" "}
              <a href="https://d3indepth.com/layouts/">Source</a>
            </li>
            <li>
              Referenced code for tree chart:{" "}
              <a href="https://codepen.io/netkuy/pen/qZGdoj?editors=1010">
                Source
              </a>
            </li>
            <li>
              Referenced code for treemap chart:{" "}
              <a href="https://bl.ocks.org/denjn5/bb835c4fb8923ee65a13008832d2efed">
                Source
              </a>
            </li>
            <li>
              Referenced code for map chart:{" "}
              <a href="https://github.com/veltman/d3-stateplane">Source</a>
            </li>
            <li>
              Referenced code for map chart:{" "}
              <a href="http://bl.ocks.org/phil-pedruco/7745589">Source</a>
            </li>
            <li>
              Referenced code for choropleth chart:{" "}
              <a href="http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922">
                Source
              </a>
            </li>
          </ul>
        </p>
      </div>
    );
  }
}

export default About;
