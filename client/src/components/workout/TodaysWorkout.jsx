import { useEffect, useState } from "react";

const TodaysWorkout = ({ userData }) => {
  const [todaysDate, setTodaysDate] = useState(``);
  console.log(todaysDate);

  useEffect(() => {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    setTodaysDate(`${year}-${month}-${date}`);
  }, []);

  return (
    <>
      <section>
        <h1>Todays Workout:</h1>
      </section>
    </>
  );
};

export default TodaysWorkout;
