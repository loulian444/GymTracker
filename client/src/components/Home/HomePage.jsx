import AddExercise from "../workout/AddExercise";

const HomePage = ({ userData }) => {
  return (
    <>
      <section id="homePageSec">
        <h1>Hello {userData.name}</h1>

        <AddExercise />

        <section>
          <p>Todays Workout:</p>
        </section>
      </section>
    </>
  );
};

export default HomePage;
