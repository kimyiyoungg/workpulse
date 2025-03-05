import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

// 사용자가 로그인 하면 보게 되는 화면
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // 로그인 했는지 확인하는 코드
  const user = auth.currentUser;
  if (!user) {
    // return <Navigate to="/startHome" />;
    return <Navigate to="/login" />;
  }

  return children;
}
