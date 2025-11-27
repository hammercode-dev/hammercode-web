import UserPaymentEventSuccess from "@/features/events/pages/UserPaymentEventSuccess";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

const UserPaymentEventSuccessPage = () => {
  return (
    <ProtectedRoute requiredRole="user">
      <UserPaymentEventSuccess />
    </ProtectedRoute>
  );
};

export default UserPaymentEventSuccessPage;
