import React, { useEffect, useState } from "react";

import PersonList from "./PersonList";
import { useAuth } from "../auth/AuthProvider";
import { getPeople } from "../api/api";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  const [people, setPeople] = useState([]);

  const auth = useAuth();
  const navigate = useNavigate();

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
      setPeople(response.data);
    } catch (error) {
      console.log("Error fetching people:", error);
      navigate("/unauthorized");
    }
  };
  return (
    <div>
      <PersonList people={people} />
    </div>
  );
}

export default Dashboard;
