import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

const CONTAINER_STYLE = {
  margin: "10px",
  padding: "10px",
  border: "2px solid white",
  borderRadius: "5px",
};

function App() {
  const initialAttributesState = ATTRIBUTE_LIST.reduce((state, attribute) => {
    state[attribute] = 10;
    return state;
  }, {});
  const [selectedClass, setSelectedClass] = useState(null);

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

  const isClassRequirementsMet = (className) => {
    const classRequirements = CLASS_LIST[className];
    return ATTRIBUTE_LIST.every(
      (attribute) => attributes[attribute] >= classRequirements[attribute]
    );
  };

  const displayClassRequirements = (className) => {
    setSelectedClass(className);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section" style={{ display: "flex" }}>
        <div style={CONTAINER_STYLE}>
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
        <div style={CONTAINER_STYLE}>
          <h2>Character Classes</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {Object.keys(CLASS_LIST).map((className) => (
              <li
                key={className}
                style={{
                  color: isClassRequirementsMet(className) && "green",
                }}
                onClick={() => displayClassRequirements(className)}
              >
                {className}
              </li>
            ))}
          </ul>

          {selectedClass && (
            <div>
              <h3>{selectedClass} Requirements</h3>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {Object.keys(CLASS_LIST[selectedClass]).map((attribute, i) => (
                  <li key={attribute}>
                    <span>
                      {attribute}: {CLASS_LIST[selectedClass][attribute]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
