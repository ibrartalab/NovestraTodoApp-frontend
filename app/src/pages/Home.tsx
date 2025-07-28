import Button from "../components/Button";
import { Layout } from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="hero-wrapper mt-20 px-24 flex justify-between items-center">
        <div className="hero-left w-1/2">
          <h1 className="text-4xl font-bold mb-4">
            Master Your Productivity with <span className="text-indigo-600 italic">Novestra Todo</span>
          </h1>
          <p className="text-lg">
            Take control of your day and achieve more with Novestra Todo App.
            Effortlessly organize your tasks, set priorities, and track your
            progress all in one place. Whether you’re managing work projects or
            personal goals, our intuitive interface helps you stay focused,
            motivated, and productive every step of the way.
          </p>
          <Button
            title="Organize Your Tasks Now"
            disabled={false}
            onClick={() => console.log("Get Started Clicked")}
            styleClass="mt-4 p-4 max-w rounded-md bg-indigo-600 text-white hover:bg-indigo-400"
            type="button"
            />
        </div>
        <div className="hero-right w-1/2 flex justify-end">
          <img
            src="./hero.svg"
            alt="hero-section-image"
            className=" w-full"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
