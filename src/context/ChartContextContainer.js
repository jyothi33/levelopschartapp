import React, { createContext, useReducer } from "react";
import data from "../data.json";

export const ChartContext = createContext();

export const ChartProvider = (props) => {
  let sArr = [];
  let tArr = [];
  let pArr = [];
  data.records.map((ticket) => sArr.push(ticket.status));
  data.records.map((ticket) => tArr.push(ticket.issue_type));
  data.records.map((ticket) => pArr.push(ticket.priority));

  let initialState = {
    initdata: data.records,
    filteredData: data.records,
    assignees: [],
    tickets: [],
    statusArr: [...new Set(sArr)],
    typeArr: [...new Set(tArr)],
    priorityArr: [...new Set(pArr)],
    status: "",
    issuetype: "",
    priority: "",
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "INIT":
        let total = action.payload;
        return {
          ...state,
          assignees: Object.keys(total),
          tickets: Object.values(total),
        };

      case "FILTER":
        let status = action.status;
        let issuetype = action.issuetype;
        let priority = action.priority;

        let filterStatus = state.initdata.filter((ticket) =>
          status ? ticket.status === status : "true"
        );

        let filterIssue = filterStatus.filter((ticket) =>
          issuetype ? ticket.issue_type === issuetype : "true"
        );

        let filterPriority = filterIssue.filter((ticket) =>
          priority ? ticket.priority === priority : "true"
        );

        return {
          ...state,
          filteredData: filterPriority,
        };

      default:
        return state;
    }
  };

  const initChart = ({ result }) => {
    dispatch({
      type: "INIT",
      payload: result,
    });
  };

  const applyFilter = ({ filterStatus, filterType, filterPriority }) => {
    dispatch({
      type: "FILTER",
      status: filterStatus,
      issuetype: filterType,
      priority: filterPriority,
    });
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  let providerValue = {
    state,
    initChart,
    applyFilter,
  };

  return (
    <ChartContext.Provider value={providerValue}>
      {props.children}
    </ChartContext.Provider>
  );
};
