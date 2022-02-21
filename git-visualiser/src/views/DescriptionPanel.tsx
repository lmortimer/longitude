import React, { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";

import Panel from "./Panel";

const DescriptionPanel: FC = () => {
  return (
    <Panel
      initiallyDeployed
      title={
        <>
          <BsInfoCircle className="text-muted" /> Description
        </>
      }
    >
      <p>
        <ul>
          <li>Search requires an exact node match</li> 
        </ul>
      </p>
      <p>
        Created by <a href="https://isthisit.nz">Logan</a> using <a href="https://graphology.github.io/">graphology</a> and <a href="https://github.com/jacomyal/sigma.js">sigma.js</a>.
      </p>
    </Panel>
  );
};

export default DescriptionPanel;
