import { useAuth } from "../../../hooks/useAuth";

const ProfilePage = () => {
  const { user, loading, error } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!user)
    return <div style={{ color: "red" }}>Unauthorized - Please login.</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
