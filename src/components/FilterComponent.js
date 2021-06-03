import React, { useContext, useState } from "react";

import Button from "@material-ui/core/Button";
import { ChartContext } from "../context/ChartContextContainer";
import FormControlComponent from "./FormControlComponent";

const FilterComponent = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const { state, applyFilter } = useContext(ChartContext);

  let { statusArr, typeArr, priorityArr } = state;

  const handleStatusChange = (s) => {
    setFilterStatus(s);
  };

  const handleTypeChange = (t) => {
    setFilterType(t);
  };

  const handlePriorityChange = (p) => {
    setFilterPriority(p);
  };

  const handleFilter = () => {
    applyFilter({
      filterStatus,
      filterType,
      filterPriority,
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <FormControlComponent
        label="Status"
        filterArr={statusArr}
        filter={filterStatus}
        handleChange={handleStatusChange}
      />
      <FormControlComponent
        label="Issue Type"
        filterArr={typeArr}
        filter={filterType}
        handleChange={handleTypeChange}
      />
      <FormControlComponent
        label="Priority"
        filterArr={priorityArr}
        filter={filterPriority}
        handleChange={handlePriorityChange}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleFilter}
        style={{ margin: "18px" }}
      >
        Filter
      </Button>
    </div>
  );
};

export default FilterComponent;
