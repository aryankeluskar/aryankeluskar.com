import Link from "next/link";
import Image from "next/image";

const HOMETOWNS = [
  {
    name: "Chandler, AZ",
    image: "/hometowns/chandler.jpg",
    mapUrl: "https://maps.google.com/?q=Chandler,AZ",
  },
  {
    name: "Hyderabad, TS",
    image: "/hometowns/hyderabad.jpg",
    mapUrl: "https://maps.google.com/?q=Hyderabad,Telangana,India",
  },
  {
    name: "Mumbai, MH",
    image: "/hometowns/mumbai.jpg",
    mapUrl: "https://maps.google.com/?q=Mumbai,Maharashtra,India",
  },
];

export function HometownSection() {
  return (
    <section id="hometowns" className="py-12">
      <h2 className="text-xl font-bold font-solway mb-6">My Hometowns</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HOMETOWNS.map((hometown, index) => (
          <Link
            key={hometown.name}
            href={hometown.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-lg aspect-video hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={hometown.image}
              alt={`Sunset in ${hometown.name}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-solway font-bold text-lg group-hover:underline">
                {hometown.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 