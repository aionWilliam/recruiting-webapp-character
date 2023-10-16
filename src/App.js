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
    state[attribute] = 0;
    return state;
  }, {});

  const initialSkillsState = () => {
    const initialState = {};
    SKILL_LIST.forEach((skill) => {
      initialState[skill.name] = 0;
    });
    return initialState;
  };

  const calculateSkillPointsTotal = (newIntelligence = -1) => {
    if (newIntelligence >= 0) {
      return 10 + newIntelligence * 4;
    }
    return 10 + attributes["Intelligence"] * 4;
  };

  const [selectedClass, setSelectedClass] = useState(null);
  const [attributes, setAttributes] = useState(initialAttributesState);
  const [skills, setSkills] = useState(initialSkillsState);

  const [skillPointsUsed, setSkillPointsUsed] = useState(0);
  const [skillPointsTotal, setSkillPointsTotal] = useState(
    calculateSkillPointsTotal()
  );

  const incrementAttribute = (attribute) => {
    if (attribute === "Intelligence") {
      setSkillPointsTotal(calculateSkillPointsTotal(attributes[attribute] + 1));
    }

    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: prevAttributes[attribute] + 1,
    }));
  };

  const decrementAttribute = (attribute) => {
    const skillsPointsAvailable = skillPointsTotal - skillPointsUsed;

    if (attributes[attribute] > 0 && skillsPointsAvailable >= 4) {
      if (attribute === "Intelligence") {
        setSkillPointsTotal(
          calculateSkillPointsTotal(attributes[attribute] - 1)
        );
      }

      setAttributes((prevAttributes) => ({
        ...prevAttributes,
        [attribute]: prevAttributes[attribute] - 1,
      }));
    }
  };

  const incrementSkill = (skill) => {
    if (skillPointsUsed < skillPointsTotal) {
      setSkillPointsUsed((prevValue) => prevValue + 1);
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: prevSkills[skill] + 1,
      }));
    }
  };

  const decrementSkill = (skill) => {
    if (skills[skill] > 0) {
      setSkillPointsUsed((prevValue) => prevValue - 1);

      setSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: prevSkills[skill] - 1,
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

  const calculateModifier = (value) => {
    const modifier = Math.floor((value - 10) / 2);
    return modifier;
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
                <span>{`${attribute} Modifier: ${calculateModifier(
                  attributes[attribute]
                )}`}</span>
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

        <div style={CONTAINER_STYLE}>
          <h2>Skills</h2>
          <h3>
            {"Skill points used: "}
            {skillPointsUsed}
            {"/"}
            {skillPointsTotal}
          </h3>
          <table>
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Added </th>
                <th>Modifier </th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {SKILL_LIST.map(function (skill) {
                return (
                  <tr key={skill.name}>
                    <td>{skill.name}</td>
                    <td>
                      <button onClick={() => decrementSkill(skill.name)}>
                        -
                      </button>
                      {skills[skill.name]}
                      <button onClick={() => incrementSkill(skill.name)}>
                        +
                      </button>
                    </td>
                    <td>
                      {skill.attributeModifier}
                      {": "}
                      {calculateModifier(attributes[skill.attributeModifier])}
                    </td>
                    <td>
                      {skills[skill.name] +
                        calculateModifier(attributes[skill.attributeModifier])}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
