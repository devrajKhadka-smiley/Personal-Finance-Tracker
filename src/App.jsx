// index.js or App.js
import 'boxicons/css/boxicons.min.css';
import "./App.css";
import { TransactionProvider} from "./Context/TransactionContext";

// -------------------page routing------------
import NavBar from "./Components/Navbar";
// -------------------page routing------------

function App() {
  return (
    <>
    <TransactionProvider>
        <NavBar></NavBar>
    </TransactionProvider>
      
    </>
  );
}

export default App;
