import "./App.css";
import Form from "./components/Form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <h1>React NodeMailer</h1>
        <Form />
      </div>
    </LocalizationProvider>
  );
}

export default App;
