'use client';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const projects = [
  {
    image: "AFG.png",
    badges: ["M.E.R.N Stack"],
    title: "Gym Management System For Aquaventure Fitness Gym",
    description:
      "Component-based APIs, accessible dashboards for staff/members, and faster check-ins — lessons from building a real-world gym management system.",
    href: "https://aquaventure-beige.vercel.app/",
    buttonText: "View Website",
  },
  {
    image: "quickynotes.png",
    badges: ["Next.js", "Prisma ORM"],
    title: "QuicklyNotes - A Note-Taking App with AI chat bot",
    description:
      "A note-taking app with an AI chatbot that provides instant answers to your questions, making it easier to organize and access your notes.",
    href: "https://crud-app-using-nextjs.vercel.app/",
    buttonText: "View Website",
  },
  {
    image: "MSWDLinks.jpeg",
    badges: [".NET core MVC", "SQL Server"],
    title: "MSWDLinks - Patient Management System For National Childrens Hospital",
    description:
      "A patient management system designed for the National Children's Hospital, streamlining patient data management and improving healthcare services for OPD patients, Admitting Patients, and Inpatients.",
    href: null,
    buttonText: null,
    message: "I cannot share the website and source code for this project as it is currently being used by the hospital and contains sensitive patient information.",
  },
   {
    image: "ALPHA.png",
    badges: ["React", "Django"],
    title: "A.L.P.H.A General assembly attendance form",
    description:
      "An attendance form for the A.L.P.H.A General Assembly, built with React, Tailwind CSS, and Django to efficiently manage and track attendance for the event.",
    href: "https://alpha-gen-assembly.vercel.app/",
    buttonText: "View Website",
  },
   {
    image: "Cortex-Path.png",
    badges: ["Next.js","Groq AI", "Prisma ORM"],
    title: "Cortex Path - Top 4 Finalist in 2026 Codekada online hackathon",
    description:
      "An AI-powered codebase assistant that helps developers understand and navigate their codebase easily, built with Next.js, Groq AI, and Prisma ORM. It was a top 4 finalist in the 2026 Codekada online hackathon.",
    href: "https://github.com/JasDevPH/cortex-path", 
    buttonText: "View Source Code",
  },
  {
    image: "InventoryManagement.png",
    badges: ["Windows Forms", "SQL Server"],
    title: "Inventory Management System for Puffsite vape shop",
    description:
      "An inventory management system designed for Puffsite vape shop, built with Windows Forms and SQL Server to efficiently manage and track inventory levels, sales, and customer data.",
    href: "https://github.com/HarlikaQuin/SalesAndInventory", 
    buttonText: "View Source Code",
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8" id="projects">
      <h2 className="text-4xl font-bold  mt-10 mb-8">Notable Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.title} className="flex flex-col overflow-hidden pt-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-video object-cover"
            />
            <CardHeader className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                {project.badges.map((badge) => (
                  <Badge key={badge} variant="secondary">{badge}</Badge>
                ))}
              </div>
              <CardTitle className="text-base leading-snug">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              {project.href ? (
                <Button className="w-full" onClick={() => window.open(project.href!)}>
                  {project.buttonText}
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground italic bg-muted rounded-md px-3 py-2 w-full">
                  {project.message}
                </p>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}