"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const certifications = [
  {
    title: "2023 - Java Fundamentals",
    image: "java_fundamentals.png",
  },
  {
    title: "2023 - Systems Administration Course Completion",
    image: "systemsAd.png",
  },
  {
    title: "2025 - Web Developer Bootcamp By Colt Steele",
    image: "webDevBootcamp2025.png",
  }
]

export default function Certifications() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleViewCertificate = (imageUrl: string, title: string) => {
    setSelectedImage(imageUrl);
    setSelectedTitle(title);
    setShowModal(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 bg-gray-50" id="certifications">
        <h2 className="text-3xl font-bold mb-6">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">{cert.title}</CardTitle>
              </CardHeader>
              <div className="px-4 pb-2">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-48 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleViewCertificate(cert.image, cert.title)}
                />
              </div>
              <CardFooter className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleViewCertificate(cert.image, cert.title)}
                >
                  View Certificate
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-white rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-xl">{selectedTitle}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <img
                src={selectedImage}
                alt={selectedTitle}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            <div className="flex justify-end p-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}