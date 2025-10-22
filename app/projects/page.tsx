import ProjectsStack from "@/components/layout/projects/ProjectsStack";
import { Link2 } from "lucide-react";
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
      <div className="spacer" style={{ height: "100vh" }}></div>
    </>
  );
};

export default page;
