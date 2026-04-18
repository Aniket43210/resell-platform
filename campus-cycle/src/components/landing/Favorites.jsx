import { useRef } from "react";
import booksNotesImg from "../../assets/books_notes.jpg";
import techGadgetsImg from "../../assets/tech-gadgets.jpg";
import furnitureImg from "../../assets/furniture.jpg";
import clothingImg from "../../assets/clothing.jpg";
import kitchenGearImg from "../../assets/kitchen-gear.jpg";
import sportsOutdoorsImg from "../../assets/sports-outdoors.jpg";

const items = [
  { label: "Books & Notes",     bg: booksNotesImg },
  { label: "Tech & Gadgets",    bg: techGadgetsImg },
  { label: "Furniture",         bg: furnitureImg },
  { label: "Clothing",          bg: clothingImg },
  { label: "Kitchen Gear",      bg: kitchenGearImg },
  { label: "Sports & Outdoors", bg: sportsOutdoorsImg },
];

const doubled = [...items, ...items];

export function Favorites() {
  const trackRef = useRef(null);

  return (
    <section className='py-24 px-8 overflow-hidden'>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12'>
        <h2 className='text-4xl md:text-6xl font-medium m-0'>
          Campus Favorites
        </h2>
        <p className='text-xl text-gray-700 m-0'>
          Affordable essentials reused inside your campus community.
        </p>
      </div>

      <div className='overflow-hidden w-full'>
        <div
          ref={trackRef}
          className='flex gap-6 w-max animate-[marquee_25s_linear_infinite]'
          onMouseEnter={() => trackRef.current && (trackRef.current.style.animationPlayState = "paused")}
          onMouseLeave={() => trackRef.current && (trackRef.current.style.animationPlayState = "running")}
        >
          {doubled.map((item, i) => (
            <div
              key={i}
              className='h-72 w-64 shrink-0 rounded-xl flex items-end p-6 text-white text-2xl font-semibold cursor-default select-none'
              style={{ backgroundImage: `url(${item.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Favorites;