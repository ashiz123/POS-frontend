import { useEffect, useState } from "react";
import apiInstance from "../../services/api";

const ProfilePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiInstance
      .get("/auth/authUser")
      .then((res) => {
        console.log("Profile Data:", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error("Auth Failed:", err.response?.data);
        setError("Unauthorized - No valid cookie found!");
      });
  }, []);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!data) return <div>Loading profile...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
