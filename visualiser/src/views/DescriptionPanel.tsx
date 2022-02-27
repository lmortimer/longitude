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

    </Panel>
  );
};

export default DescriptionPanel;
