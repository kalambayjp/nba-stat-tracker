import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.value);

  console.log(user.firstName);
  // if (!user.authorized) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>
      <h1>Profile Page</h1>
      <p>Hello {user.firstName}!</p>
    </>
  );
};

export default Profile;
