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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: 18
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
          <span>D3 Visualization Catalog</span>
        </div>
        {chart === 0 ? (
          <div className={homeStyles.mainContent}>
            <div className={homeStyles.linksBox}>
              <button onClick={() => this.setChart(1)}>1. Bar Chart</button>
              <button onClick={() => this.setChart(2)}>2 Line Chart</button>
              <button onClick={() => this.setChart(3)}>3. Area Chart</button>
              <button onClick={() => this.setChart(4)}>4. Scatterplot</button>
              <button onClick={() => this.setChart(5)}>5. Pie Chart</button>
              <button onClick={() => this.setChart(6)}>6. Donut Chart</button>
              <button onClick={() => this.setChart(7)}>
                7. Stacked Bar Chart
              </button>
              <button onClick={() => this.setChart(8)}>
                8. Stacked Area Chart
              </button>
              <button onClick={() => this.setChart(9)}>
                9. Force Directed Graph
              </button>
              <button onClick={() => this.setChart(10)}>10. Chord</button>
              <button onClick={() => this.setChart(11)}>11. Cluster</button>
              <button onClick={() => this.setChart(12)}>
                12. Packed Circles
              </button>
              <button onClick={() => this.setChart(13)}>13. Partition</button>
              <button onClick={() => this.setChart(14)}>14. Tree</button>
              <button onClick={() => this.setChart(15)}>15. Treemap</button>
              <button onClick={() => this.setChart(16)}>
                16. Map with points
              </button>
              <button onClick={() => this.setChart(17)}>17. Choropleth</button>
              <button onClick={() => this.setChart(18)}>18. Candlestick</button>
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
