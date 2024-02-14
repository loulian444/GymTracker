import AddExercise from "./workout/AddExercise";

const Home = ({ userData }) => {

  return (
    <>
      {userData.name ? <h1>Hello {userData.name}</h1> : <h1>Hello there</h1>}

      <section>
        <p>Todays Workout:</p>
      </section>

      <AddExercise />
    </>
  );
};

export default Home;
