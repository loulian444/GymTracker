import AddExercise from "./workout/AddExercise";

const HomePage = ({ userData }) => {
  return (
    <>
      <h1>Hello {userData.name}</h1>

      <AddExercise />

      <section>
        <p>Todays Workout:</p>
      </section>
    </>
  );
};

export default HomePage;
