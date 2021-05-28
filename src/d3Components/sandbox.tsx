import React, { useRef, useEffect } from "react";
// import styled from "styled-components";
import * as d3 from "d3";

const SandBox = () => {
  const d3Container = useRef(null);

  return <div ref={d3Container}></div>;
};

export default SandBox;
