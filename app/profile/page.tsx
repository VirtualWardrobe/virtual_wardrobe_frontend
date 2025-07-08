import Profile from "./Profile";
import ProtectedRoute from "../components/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}
