import React, { useEffect, useState } from "react";

import PersonList from "./PersonList";
import { useAuth } from "../auth/AuthProvider";
import { getPeople } from "../api/api";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  console.log(auth.isAuthenticated);
  if (!auth.isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const token = auth.getAccessToken();
      const response = await getPeople(token);
      if (!response) {
        setError(true);
      }
      setPeople(response.data);
      setError(false);
    } catch (error) {
      console.log("Error fetching people:", error);
      setError(true);
    }
  };
  return (
    <div className={error && "box"}>
      <PersonList people={people} />
      {error && (
        <div className="caja">
          <h3>Token invalido</h3>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
