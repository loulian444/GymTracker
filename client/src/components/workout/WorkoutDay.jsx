import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WorkoutDay = () => {
  const { dayId } = useParams();
  const [day, setDay] = useState({});
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem(`token`);

    fetchDay(dayId, token);
  }, []);

  const fetchDay = async (id, token) => {
    try {
      const response = await fetch(`/api/days/${id}`, {
        method: `GET`,
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      setDay(result);
      setExercises(result.exercises);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {day.date ? (
        <section id="workoutDaySec">
          <h1>Workout Day: {day.date.split(`T`)[0]}</h1>
          {exercises.map((exercise) => (
            <section className="exerciseSec" key={exercise.id}>
              <b>{exercise.name}</b>
              {exercise.sets.map((set) => (
                <section className="flex setSec" key={set.id}>
                  <p>Set: {set.set}</p>
                  <p>Weight: {set.weight}</p>
                  <p>Reps: {set.reps}</p>
                </section>
              ))}
            </section>
          ))}
        </section>
      ) : null}
    </>
  );
};

export default WorkoutDay;
