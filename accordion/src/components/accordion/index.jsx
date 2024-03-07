//single selection
//multiple selection

import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (currentId) => {
    setSelected(currentId === selected ? null : currentId);
  };

  const handleMultiSelection = (currentId) => {
    let copyMultiple = [...multiple];
    const indexOfCurrentId = copyMultiple.indexOf(currentId);

    if (indexOfCurrentId === -1) {
      copyMultiple.push(currentId);
      console.log(indexOfCurrentId, copyMultiple);
    } else {
      copyMultiple.splice(indexOfCurrentId, 1);
    }
    setMultiple(copyMultiple);
  };

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multiple Selection
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map(({ id, question, answer }) => (
            <div key={id} className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(id)
                    : () => handleSingleSelection(id)
                }
                className="title"
              >
                <h3>{question}</h3>
                <span>+</span>
              </div>
              {selected === id || multiple.indexOf(id) !== -1 ? (
                <div className="content">{answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
