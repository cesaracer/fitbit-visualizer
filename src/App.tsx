import { useState } from "react";
import "./App.css";
import { useHome } from "./hooks/home/useHome";

function App() {
  const { actions, state } = useHome();
  const { activities } = state;

  console.log(activities);

  return <></>;
}

export default App;
