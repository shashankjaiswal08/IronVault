import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1709315957145-a4bad1feef28?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "IRONVAULT athlete training with weights",
    number: "01",
    category: "PERFORMANCE",
    title: "Built For Progress",
    description:
      "Push beyond your limits with training designed around measurable progress.",
    className: "col-span-7 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1775993699105-4d18bcac7e54?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "IRONVAULT strength training",
    number: "02",
    category: "DISCIPLINE",
    title: "Show Up. Every Day.",
    description:
      "Progress isn't built in a single session. It's built by showing up consistently.",
    className: "col-span-5",
  },
  {
    src: "https://images.unsplash.com/photo-1776710669928-e49471c63af5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "IRONVAULT trainer coaching an athlete",
    number: "03",
    category: "COACHING",
    title: "Train With Purpose.",
    description: "Train with coaches who know how to turn effort into results.",
    className: "col-span-5",
  },
  {
    src: "https://images.unsplash.com/photo-1709315969349-1a43dea3efdc?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "IRONVAULT gym interior",
    number: "04",
    category: "THE VAULT",
    title: "Built To Push You.",
    description:
      "A focused training environment built for people who take their progress seriously.",
    className: "col-span-4",
  },
  {
    src: "https://images.unsplash.com/photo-1782849206257-c1bf78721837?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "IRONVAULT athlete workout",
    number: "05",
    category: "STRENGTH",
    title: "Earn Your Strength.",
    description: "Every rep is another step toward becoming harder to break.",
    className: "col-span-4",
  },
  {
    src: "https://images.unsplash.com/photo-1653276526709-c424ad920de6?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "IRONVAULT fitness training",
    number: "06",
    category: "RESILIENCE",
    title: "Harder To Break.",
    description:
      "Build the physical and mental resilience to keep moving forward.",
    className: "col-span-4",
  },
];

export default function ImageGrid() {
  return (
    <div className="grid grid-cols-12 gap-2 font-bio-rhyme">
      {images.map((image) => (
        <div
          key={image.number}
          className={`group relative min-h-[240px] overflow-hidden cursor-pointer transition-all duration-300 ease-out ${image.className}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            preload
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end bg-black/0 p-6 opacity-0 transition-all duration-500 group-hover:bg-black/40 group-hover:opacity-100">
            <div className="max-w-sm translate-y-4 border border-white/40 bg-black/70 p-5 text-accent backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0">
              <span className="text-xs tracking-[0.25em]">
                {image.number} / {image.category}
              </span>
              <h3 className="mt-2 text-2xl font-bold">
                {image.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {image.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
