import React, { useRef, useEffect, useState } from "react";
import { select } from "d3";

interface playgroundProps {}

const Playground: React.FC<playgroundProps> = ({}) => {
  const [data, setData] = useState<number[]>([25, 30, 45, 60, 20]);
  const d3Container = useRef(null);
  // const pBrowser = d3.select(d3Container.current);

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
      This is a D3 playground
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

{
  /* <svg width="300" height="300">
<rect
  width="100"
  height="100"
  fill="#F44336"
  stroke="#8BC34A"
  stroke-width="10"
></rect>
</svg> */
}
