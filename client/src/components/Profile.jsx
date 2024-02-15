import AllWorkouts from "./workout/AllWorkouts";

const Profile = ({ userData }) => {
  return (
    <>
    <section id="profileSec">

      <h1>Profile Page</h1>
      <AllWorkouts userData={userData} />
    </section>
    </>
  );
};

export default Profile;
