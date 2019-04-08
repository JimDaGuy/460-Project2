import React, { Component } from "react";
import homeStyles from "./Home.module.scss";
import BarChart from "../Components/BarChart";
import LineChart from "../Components/LineChart";
import AreaChart from "../Components/AreaChart";
import ScatterplotChart from "../Components/ScatterplotChart";
import PieChart from "../Components/PieChart";
import DonutChart from "../Components/DonutChart";
import StackedBarChart from "../Components/StackedBarChart";
import StackedAreaChart from "../Components/StackedAreaChart";
import ForceDirectedChart from "../Components/ForceDirectedChart";
import ChordChart from "../Components/ChordChart";
import ClusterChart from "../Components/ClusterChart";
import PackedCirclesChart from "../Components/PackedCirclesChart";
import PartitionChart from "../Components/PartitionChart";
import TreeChart from "../Components/TreeChart";
import MapChart from "../Components/MapChart";
import TreemapChart from "../Components/TreemapChart";
import ChoroplethChart from "../Components/ChoroplethChart";
import CandlestickChart from "../Components/CandlestickChart";

import barImage from "../images/bar.png";
import lineImage from "../images/line.png";
import areaImage from "../images/area.png";
import scatterImage from "../images/scatter.png";
import pieImage from "../images/pie.png";
import donutImage from "../images/donut.png";
import stackedBarImage from "../images/stackedbar.png";
import stackedAreaImage from "../images/stackedarea.png";
import forceDirectedImage from "../images/forcedirected.png";
import chordImage from "../images/chord.png";
import clusterImage from "../images/cluster.png";
import packedImage from "../images/packed.png";
import partitionImage from "../images/partition.png";
import treeImage from "../images/tree.png";
import mapImage from "../images/map.png";
import treeMapImage from "../images/treemap.png";
import choroplethImage from "../images/choropleth.png";
import candlestickImage from "../images/candlestick.png";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: 0
    };

    this.setChart = this.setChart.bind(this);
  }

  componentDidMount() {}

  setChart(num) {
    this.setState({
      chart: num
    });
  }

  render() {
    const { chart } = this.state;

    return (
      <div className={homeStyles.container}>
        <div className={homeStyles.header}>
          <span
            className={homeStyles.headerSpan}
            onClick={() => this.setChart(0)}
          >
            D3 Visualization Catalog
          </span>
        </div>
        {chart === 0 ? (
          <div className={homeStyles.mainContent}>
            <div className={homeStyles.linksBox}>
              <h1>Charts</h1>
              <h2 className={homeStyles.h2}>Bar Chart</h2>
              <h2 className={homeStyles.h2}>Line Chart</h2>
              <h2 className={homeStyles.h2}>Area Chart</h2>
              <h2 className={homeStyles.h2}>Scatterplot Chart</h2>
              <img
                className={homeStyles.image}
                src={barImage}
                alt="Bar Chart"
                onClick={() => this.setChart(1)}
              />
              <img
                className={homeStyles.image}
                src={lineImage}
                alt="Line Chart"
                onClick={() => this.setChart(2)}
              />
              <img
                className={homeStyles.image}
                src={areaImage}
                alt="Area Chart"
                onClick={() => this.setChart(3)}
              />
              <img
                className={homeStyles.image}
                src={scatterImage}
                alt="Scatterplot Chart"
                onClick={() => this.setChart(4)}
              />
              <h2 className={homeStyles.h2}>Bar Chart</h2>
              <h2 className={homeStyles.h2}>Donut Chart</h2>
              <h2 className={homeStyles.h2}>Stacked Bar Chart</h2>
              <h2 className={homeStyles.h2}>Stacked Area Chart</h2>
              <img
                className={homeStyles.image}
                src={pieImage}
                alt="Pie Chart"
                onClick={() => this.setChart(5)}
              />
              <img
                className={homeStyles.image}
                src={donutImage}
                alt="Donut Chart"
                onClick={() => this.setChart(6)}
              />
              <img
                className={homeStyles.image}
                src={stackedBarImage}
                alt="Stacked Bar Chart"
                onClick={() => this.setChart(7)}
              />
              <img
                className={homeStyles.image}
                src={stackedAreaImage}
                alt="Stacked Area Chart"
                onClick={() => this.setChart(8)}
              />
              <h2 className={homeStyles.h2}>Force Directed</h2>
              <h2 className={homeStyles.h2}>Chord Chart</h2>
              <h2 className={homeStyles.h2}>Cluster</h2>
              <h2 className={homeStyles.h2}>Packed Circles</h2>
              <img
                className={homeStyles.image}
                src={forceDirectedImage}
                alt="Force Directed Graph"
                onClick={() => this.setChart(9)}
              />
              <img
                className={homeStyles.image}
                src={chordImage}
                alt="Chord Chart"
                onClick={() => this.setChart(10)}
              />
              <img
                className={homeStyles.image}
                src={clusterImage}
                alt="Cluster Chart"
                onClick={() => this.setChart(11)}
              />
              <img
                className={homeStyles.image}
                src={packedImage}
                alt="Packed Circles Chart"
                onClick={() => this.setChart(12)}
              />
              <h2 className={homeStyles.h2}>Partition</h2>
              <h2 className={homeStyles.h2}>Tree</h2>
              <h2 className={homeStyles.h2}>Treemap</h2>
              <h2 className={homeStyles.h2}>Map</h2>
              <img
                className={homeStyles.image}
                src={partitionImage}
                alt="Partition Chart"
                onClick={() => this.setChart(13)}
              />
              <img
                className={homeStyles.image}
                src={treeImage}
                alt="Tree Chart"
                onClick={() => this.setChart(14)}
              />
              <img
                className={homeStyles.image}
                src={treeMapImage}
                alt="Treemap Chart"
                onClick={() => this.setChart(15)}
              />
              <img
                className={homeStyles.image}
                src={mapImage}
                alt="Map Chart"
                onClick={() => this.setChart(16)}
              />
              <h2 className={homeStyles.h2}>Choropleth</h2>
              <h2 className={homeStyles.h2}>Candlestick</h2>
              <h2 className={homeStyles.h2}> </h2>
              <h2 className={homeStyles.h2}> </h2>
              <img
                className={homeStyles.image}
                src={choroplethImage}
                alt="Choropleth Chart"
                onClick={() => this.setChart(17)}
              />
              <img
                className={homeStyles.image}
                src={candlestickImage}
                alt="Candlestick Chart"
                onClick={() => this.setChart(18)}
              />
            </div>
          </div>
        ) : (
          <div className={homeStyles.chartContent}>
            <button onClick={() => this.setChart(0)}>Home</button>
            {chart === 1 ? <BarChart /> : null}
            {chart === 2 ? <LineChart /> : null}
            {chart === 3 ? <AreaChart /> : null}
            {chart === 4 ? <ScatterplotChart /> : null}
            {chart === 5 ? <PieChart /> : null}
            {chart === 6 ? <DonutChart /> : null}
            {chart === 7 ? <StackedBarChart /> : null}
            {chart === 8 ? <StackedAreaChart /> : null}
            {chart === 9 ? <ForceDirectedChart /> : null}
            {chart === 10 ? <ChordChart /> : null}
            {chart === 11 ? <ClusterChart /> : null}
            {chart === 12 ? <PackedCirclesChart /> : null}
            {chart === 13 ? <PartitionChart /> : null}
            {chart === 14 ? <TreeChart /> : null}
            {chart === 15 ? <TreemapChart /> : null}
            {chart === 16 ? <MapChart /> : null}
            {chart === 17 ? <ChoroplethChart /> : null}
            {chart === 18 ? <CandlestickChart /> : null}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
