import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllWorkouts = () => {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem(`userData`);
    const userData = JSON.parse(data);

    fetchUserWorkouts(userData.id);
  }, []);

  const fetchUserWorkouts = async (userId) => {
    try {
      const response = await fetch(`/api/weeks?user=${userId}`);

      const result = await response.json();

      setWeeks(result);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <h1>All Workouts</h1>
      {weeks.length > 0 ? (
        <>
          {weeks.map((week) => (
            <section key={week.week}>
              <p>Week {week.week}</p>
              {week.days.map((day) => (
                <section key={day.id}>
                  {console.log(day)}
                  <p onClick={() => navigate(`/workout-day/${day.id}`)}>
                    Day: {day.date.split(`T`)[0]}
                  </p>
                </section>
              ))}
            </section>
          ))}
        </>
      ) : null}
    </>
  );
};

export default AllWorkouts;
