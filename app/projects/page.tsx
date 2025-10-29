import Footer from "@/components/layout/Footer";
import ProjectsStack from "@/components/layout/projects/ProjectsStack";
import React from "react";

const page = () => {
  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8"></div>
          <h1 className="text-4xl font-bold mb-4">Welcome to My Projects</h1>
          <p className="text-lg mb-8">Here you can find a collection of my projects and works.</p>
        </div>
      </section>
      <ProjectsStack />
      <Footer />
    </>
  );
};

export default page;
