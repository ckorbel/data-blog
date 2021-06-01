import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import data from "./data.json";

const dimensions: any = {
  width: 800,
  height: 800,
  margin: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  },
};

dimensions.containerWidth =
  dimensions.width - dimensions.margin.left - dimensions.margin.right;

dimensions.containerHeight =
  dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

const ScatterPlot = () => {
  const d3Container = useRef(null);

  const xAccessor = (data: any) => data.currently.humidity;
  const yAccessor = (data: any) => data.currently.apparentTemperature;

  useEffect(() => {
    const svg = d3.select(d3Container.current);

    svg
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    const container = svg
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.margin.left}), ${dimensions.margin.top}`
      );

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, data.currently.humidity))
      .rangeRound([0, dimensions.containerWidth])
      .clamp(true);

    //nice() function rounds to nearest whole number
    // scaleLinear good for continous data sets
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, data.currently.apparentTemperature))
      .range([dimensions.containerHeight, 0])
      .nice()
      .clamp(true);

    container
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (data) => xScale(xAccessor(data)))
      .attr("cy", (data) => yScale(yAccessor(data)))
      .attr("r", 5)
      .attr("fill", "red")
      .attr("data-temp", yAccessor);

    // Axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat((d) => d * 100 + "%");
    const xAxisGroup = container
      .append("g")
      .call(xAxis)
      .style("transform", `translateY(${dimensions.containerHeight}px)`)
      .classed("axis", true);

    xAxisGroup
      .append("text")
      .attr("x", dimensions.containerWidth / 2)
      .append("y", dimensions.margin.bottom - 10)
      .attr("fill", "black")
      .text("Humidity");

    const yAxis = d3.axisLeft(yScale);

    const yAxisGroup = container
      .append("g")
      .call(yAxis)
      .style("transform", `translateX(${dimensions.containerWidth})px`);

    yAxisGroup
      .append("text")
      .attr("x", -dimensions.containerHeight / 2)
      .attr("y", -dimensions.margin.left + 15)
      .attr("fill", "black")
      .text("Temperature &deg; F")
      .style("transform", "rotate(270deg)")
      .style("text-anchor", "middle");

    return () => undefined;
  }, []);
  console.log({ data });
  return <div ref={d3Container}></div>;
};

export default ScatterPlot;
