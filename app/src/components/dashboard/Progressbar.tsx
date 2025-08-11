import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux/reduxHooks";

const Progressbar = () => {
  const {totalTodos,totalCompleted} = useAppSelector((state) => state.todos);
  const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (totalTodos > 0) {
        const progressValue = Math.round((totalCompleted / totalTodos) * 100);
        setProgress(progressValue);
        } else {
        setProgress(0);
        }
    }, [totalTodos, totalCompleted,setProgress ]);

//    const progressBarWidth = Math.round((totalCompleted / totalTodos * 100));
//   // Ensure progress bar width is between 0 and 100
//   const clampedWidth = Math.max(0, Math.min(100, progressBarWidth));
  const progressBarStyles = {
    width:progress + '%',
  }
    console.log(progress, totalCompleted, totalTodos);
  return (
    <>
      <div className="progress w-full flex items-center gap-2 mt-4">
        <p className="text-sm">Progress</p>
        <div className={`progress-bar rounded-full w-full h-full bg-gray-200`}>
          <div
            className={`bar h-full rounded-full bg-indigo-600`}
            style={progressBarStyles}
          ></div>
        </div>
        <span className="text-sm font-medium text-green-500">
          {progress}%
        </span>
      </div>
    </>
  );
};

export default Progressbar;
