import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux/reduxHooks";

const Progressbar = () => {
  const { totalTodos, totalCompleted } = useAppSelector((state) => state.todos);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (totalTodos > 0) {
      const progressValue = Math.round((totalCompleted / totalTodos) * 100);
      setProgress(progressValue);
    } else {
      setProgress(0);
    }
  }, [totalTodos, totalCompleted, setProgress]);

  return (
    <>
      <div className="progress w-full flex items-center gap-2 mt-4">
        <label htmlFor="progress-bar">Progress:</label>
        <progress
          id="progress-bar"
          max={100}
          color="bg-indigo-500"
          value={progress}
          className="progress-bar-container w-full bg-indigo-500"
        ></progress>
        <span className="text-sm font-medium text-indigo-500">{progress}%</span>
      </div>
    </>
  );
};

export default Progressbar;
