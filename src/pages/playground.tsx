import React, { useRef, useEffect, useState } from "react";
import { select } from "d3";
import Navbar from "../components/Navbar";
// import ScatterPlot from "../d3Components/scatterplot/scatterplot";

interface playgroundProps {}

const Playground: React.FC<playgroundProps> = ({}) => {
  const [data, setData] = useState<number[]>([25, 30, 45, 60, 20]);
  const d3Container = useRef(null);

  useEffect(() => {
    const svg = select(d3Container.current);
    svg
      .selectAll("circle")
      .data(data)
      .join(
        (enter) => enter.append("circle"),
        (update) => update.attr("classed", "updated"),
        (exit) => exit.remove()
      )
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
  }, [data]);

  return (
    <div>
      <Navbar />
      This is a D3 playground
      {/* <ScatterPlot /> */}
      <svg ref={d3Container}></svg>
      <button onClick={() => setData(data.map((value) => value + 10))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter Data
      </button>
    </div>
  );
};

export default Playground;
