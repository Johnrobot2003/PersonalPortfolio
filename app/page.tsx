import HomePage from "./components/HomePage";
import ProjectsPage from "./components/ProjectsPage";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <section id="about" className="min-h-screen flex items-center justify-center">
        <HomePage />
      </section>
      <section id="projects" className="min-h-screen border-t bg-gray-100 dark:bg-gray-900">
        <ProjectsPage />
      </section>
      <section id="certifications" className="min-h-screen border-t  dark:bg-gray-900">
        <Certifications />
      </section>
      <section id="contact" className="min-h-screen border-t  dark:bg-gray-900">
        <Contact />
      </section>
    </div>
  );  

}