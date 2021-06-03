import "./App.css";
import BarChart from "./components/BarChart";
import FilterComponent from "./components/FilterComponent";
import { ChartProvider } from "./context/ChartContextContainer";

function App() {
  return (
    <div className="App">
      <ChartProvider>
        <FilterComponent />
        <BarChart />
      </ChartProvider>
    </div>
  );
}

export default App;
