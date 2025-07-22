import React from "react";
import { Layout } from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">Master Your Productivity with Novestra</h1>
      <p className="text-lg text-gray-400 mb-8">
        Take control of your day and achieve more with Novestra Todo App. Effortlessly organize your tasks, set priorities, and track your progress—all in one place. 
        Whether you’re managing work projects or personal goals, our intuitive interface helps you stay focused, motivated, and productive every step of the way.
      </p>
      <img src="./hero.svg" alt="hero-section-image" className=" w-80 mt-12"/>
    </Layout>
  );
};

export default Home;
