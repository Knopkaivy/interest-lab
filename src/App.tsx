import {Routes, Route} from "react-router-dom";
import Header from "./components/Header.tsx";
import Home from "./pages/Home.tsx";
import CompoundInterest from "./pages/CompoundInterest.tsx";
import LoanCalculator from "./pages/LoanCalculator.tsx";
import "./App.css";

export default function App(){
  return(
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/compound" element={<CompoundInterest/>} />
      <Route path="/loan" element={<LoanCalculator/>} />
    </Routes>
    </>
  )
}