"use client";

const testimonials = [
  {
    name: "Sarah Johnson J",
    role: "Product Manager",
    feedback:
      "Working with Brown was a fantastic experience. The chat platform is smooth, responsive, and professional!",
  },
  {
    name: "David Williams",
    role: "Startup Founder",
    feedback:
      "The portfolio and custom features exceeded my expectations. Great communication and execution.",
  },
  {
    name: "Victor Erukpe",
    role: "Furniture /DrWood",
    feedback:
      "I loved the attention to detail and clean design. Highly recommend Brown for web development projects.",
  },
  {
    name: "Joel Onyi",
    role: "IJ Stitches",
    feedback:
      "Working with Brown Code was amazing. He really understood the vision of IJ Stitches and delivered a website that perfectly represents my brand. From the design to the responsiveness, everything was done with excellence. I'm grateful for his work and i'll definitely work with him again and also recommend him to others",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials" 
      className="bg-black text-white py-16 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What People Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <p className="text-gray-300 mb-4 italic">“{t.feedback}”</p>
              <h4 className="text-lg font-semibold text-white">{t.name}</h4>
              <span className="text-gray-400 text-sm">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
