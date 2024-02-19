import AddExercise from "../workout/AddExercise";
import TodaysWorkout from "../workout/TodaysWorkout";

const HomePage = ({ userData, currentWeek }) => {
  return (
    <>
      <section id="homePageSec" className="flex">
        <section id="homeIntro">
          <h1>Hello {userData.name}</h1>

          <p>Current Week: {currentWeek}</p>
        </section>

        <AddExercise />

        <TodaysWorkout userData={userData} />
      </section>
    </>
  );
};

export default HomePage;
