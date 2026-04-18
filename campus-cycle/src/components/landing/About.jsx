// export default function About(){
//     return (
//     <section id='about' className='py-24 px-8 grid md:grid-cols-2 gap-10'>
//         <h2 className='text-6xl font-medium'>Fresh Value from One Batch to the Next</h2>
//         <p className='text-2xl text-gray-700'>Every semester, usable items are discarded while juniors buy the same products brand new. CampusCycle creates a circular student economy.</p>
//     </section>
//     )
// }

import about1 from '../../assets/about1.jpg';
import about2 from '../../assets/about2.jpg';

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 bg-[#efeee8]"
    >
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Layout */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-medium leading-tight text-black">
              Built for Every New Semester
            </h2>

            {/* Image Placeholder */}
            <div className="h-72 bg-gray-200 rounded-3xl flex items-center justify-center text-gray-500 text-2xl">
              <img src={about1} alt="About CampusCycle" className="w-full h-full object-cover rounded-3xl" />
            </div>
          </div>

          {/* Right */}
          <div className="bg-white rounded-3xl p-8 flex items-center">
            <p className="text-2xl md:text-3xl leading-relaxed text-gray-700">
              Every term, students leave behind desks, chairs, books,
              appliances, and essentials that are still valuable. Meanwhile,
              incoming students spend heavily buying the same things brand new.
              CampusCycle connects both groups through one trusted campus
              marketplace.
            </p>
          </div>
        </div>

        {/* Bottom Layout */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left */}
          <div className="bg-white rounded-3xl p-8 space-y-6">
            <h3 className="text-4xl font-semibold text-black">
              Why CampusCycle Works
            </h3>

            <p className="text-xl text-gray-700 leading-relaxed">
              Seniors recover value from items they no longer need. Juniors get
              affordable products instantly. Universities reduce waste and create
              a smarter reuse culture across every batch.
            </p>
          </div>

          {/* Right */}
          <div className="h-80 bg-gray-200 rounded-3xl flex items-center justify-center text-gray-500 text-2xl">
            <img src={about2} alt="About CampusCycle" className="w-full h-full object-cover rounded-3xl" />
          </div>
        </div>

      </div>
    </section>
  );
}