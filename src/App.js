import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

function App() {
  const initialAttributesState = ATTRIBUTE_LIST.reduce((state, attribute) => {
    state[attribute] = 0;
    return state;
  }, {});

  const [attributes, setAttributes] = useState(initialAttributesState);

  const incrementAttribute = (attribute) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: prevAttributes[attribute] + 1,
    }));
  };

  const decrementAttribute = (attribute) => {
    if (attributes[attribute] > 0) {
      setAttributes((prevAttributes) => ({
        ...prevAttributes,
        [attribute]: prevAttributes[attribute] - 1,
      }));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div
          style={{
            margin: "10px",
            border: "2px solid white",
            borderRadius: "5px",
          }}
        >
          <h2>Character Attributes</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {ATTRIBUTE_LIST.map((attribute) => (
              <li key={attribute}>
                {attribute}:
                <button onClick={() => decrementAttribute(attribute)}>-</button>
                <span>{attributes[attribute]}</span>
                <button onClick={() => incrementAttribute(attribute)}>+</button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
