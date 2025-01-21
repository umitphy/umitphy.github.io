import React from "react";

interface Project {
  name: string;
  icon: string;
}

const projects: Project[] = [
  { name: "⚛️ Basit bir React Uygulaması", icon: "⚛️" },
  { name: "📐 Fizik Simülasyon Projesi", icon: "📐" },
  { name: "🎵 Müzik Analiz Yazılımı", icon: "🎵" },
];

const Projects: React.FC = () => {
  return (
    <section id="projects">
      <h2>Projelerim</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            {project.icon} {project.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
