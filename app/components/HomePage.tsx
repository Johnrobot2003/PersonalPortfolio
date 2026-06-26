import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex padding-4 gap-8 items-center justify-center flex-col md:flex-row">
        <div>
          <h2 className="text-4xl font-bold text-center mt-10">John Rohan Carson Acebo</h2>
          <h5 className="text-xl font-bold text-center mt-2">Full Stack Developer</h5>
          <div className="flex padding-4 gap-6 justify-center mt-4">
            <a href="https://www.facebook.com/johnrohan.acebo" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-4xl hover:scale-125 transition-transform" />
            </a>
            <a href="https://www.instagram.com/century_tuna03/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-4xl hover:scale-125 transition-transform" />
            </a>
            <a href="https://github.com/Johnrobot2003" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-4xl hover:scale-125 transition-transform" />
            </a>
          </div>
        </div>
        <img src="me.jpg" alt="" className="rounded-full hover:scale-105 transition-transform size-60"/>
      </div>
      
      <p className="text-center mt-4 text-lg text-gray-600">
        Hi, I'm John Rohan! I'm a full stack developer specializing in building exceptional digital experiences. With a passion for coding and a knack for problem-solving, I create efficient and scalable web applications that delight users.
        proficient in TypeScript, React, Node.js, .Net Core, I thrive on turning complex challenges into elegant solutions. Whether it's crafting responsive user interfaces or designing robust backend systems, I'm dedicated to delivering high-quality code and seamless user experiences. Let's build something amazing together!
      </p>

      <div>
        
        <h2 className="text-xl font-bold text-center mt-10 mb-6">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="outline" className="text-base py-2 px-4">
            TypeScript
          </Badge>
          <Badge variant="outline" className="text-base py-2 px-4">
            React
          </Badge>
          <Badge variant="outline" className="text-base py-2 px-4">
            Node.js
          </Badge>
          <Badge variant="outline" className="text-base py-2 px-4">
            .Net Core
          </Badge>
          <Badge variant="outline" className="text-base py-2 px-4">
            MERN Stack
          </Badge>
          <Badge variant="outline" className="text-base py-2 px-4">
            Next.js
          </Badge>
          <Badge variant="outline" className="text-base py-2 px-4">
            Prisma ORM
          </Badge>
          <Badge variant="outline" className="text-base py-2 px-4">
            Tailwind CSS
          </Badge>
          <Badge variant="outline" className="text-base py-2 px-4">
            GitHub
          </Badge>
          <Badge variant="outline" className="text-base py-2 px-4">
            Azure DevOps
          </Badge>
          <Badge variant="outline" className="text-base py-2 px-4">
            CI/CD Pipelines
          </Badge>
        </div>
      </div>
    </div>
  );
}