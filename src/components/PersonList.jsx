import React from "react";
import "./PersonList.css";
function PersonList({ people }) {
  return (
    <div className="person-list">
      <h3 className="texto">People List</h3>
      <div className="grid-container">
        {people.map((person, index) => (
          <div className="card" key={index}>
            <p>
              {person.firstName} {person.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonList;
