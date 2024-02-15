import AddExercise from "../workout/AddExercise";

const HomePage = ({ userData, currentWeek }) => {
  return (
    <>
      <section id="homePageSec">
        <h1>Hello {userData.name}</h1>

        <p>Current Week: {currentWeek}</p>

        <AddExercise />

        <section>
          <p>Todays Workout:</p>
        </section>
      </section>
    </>
  );
};

export default HomePage;
