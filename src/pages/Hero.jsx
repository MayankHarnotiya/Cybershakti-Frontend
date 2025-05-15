import {
  FaUsers,
  FaFileAlt,
  FaCheckCircle,
  FaUserCheck,
  FaCertificate,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { useRef } from "react";

export const Hero = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 340; // Scroll amount matching card width + spacing
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#fde8d1] min-h-[90vh] w-full flex flex-col lg:flex-row items-center justify-between px-10 py-16">
        {/* Left Section */}
        <div className="max-w-xl">
          <h3 className="text-lg font-semibold text-[#1b1f3a]">Cyber Security</h3>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f7931e] leading-tight mt-2">
            CyberShakti: Empowering Indian Women Government Officials in Cybersecurity
          </h1>

          {/* Social Icons */}
          <div className="mt-10">
            <p className="text-[#1b1f3a] font-semibold mb-2">Follow Us</p>
            <div className="flex space-x-4 text-3xl mt-2">
              <div className="bg-[#1b1f3a] text-white p-4 rounded-full"><FaTwitter /></div>
              <div className="bg-[#1b1f3a] text-white p-4 rounded-full"><FaLinkedin /></div>
              <div className="bg-[#1b1f3a] text-white p-4 rounded-full"><FaYoutube /></div>
              <div className="bg-[#1b1f3a] text-white p-4 rounded-full"><FaInstagram /></div>
              <div className="bg-[#1b1f3a] text-white p-4 rounded-full"><FaFacebook /></div>
            </div>
          </div>
        </div>

        {/* Right Section (Image Card) */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl h-[500px] w-full mr-10 mb-40 p-2">
          <div className="w-full h-[480px] rounded-xl overflow-hidden">
            <img
              src="./1.png"
              alt="Mandated Courses Placeholder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#174ea6] text-white -mt-50 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-y-6 text-center">
          <div className="flex flex-col items-center w-1/2 sm:w-auto"><FaUsers className="text-5xl mb-1" /><p className="text-3xl font-bold">9873815</p><p className="text-md">Total Karmayogis Onboarded</p></div>
          <div className="flex flex-col items-center w-1/2 sm:w-auto"><FaFileAlt className="text-5xl mb-1" /><p className="text-3xl font-bold">2409</p><p className="text-md">Total Courses</p></div>
          <div className="flex flex-col items-center w-1/2 sm:w-auto"><FaCheckCircle className="text-5xl mb-1" /><p className="text-3xl font-bold">31035799</p><p className="text-md">Total Completions</p></div>
          <div className="flex flex-col items-center w-1/2 sm:w-auto"><FaUserCheck className="text-5xl mb-1" /><p className="text-3xl font-bold">925175</p><p className="text-md">Monthly Active Users</p></div>
          <div className="flex flex-col items-center w-1/2 sm:w-auto"><FaCertificate className="text-5xl mb-1" /><p className="text-3xl font-bold">58120</p><p className="text-md">Certificates Issued Yesterday</p></div>
        </div>
      </section>

      {/* Showcased Courses Section */}
      <section className="bg-[#fff1e0] py-10 px-6 lg:px-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1b1f3a]">Showcased Trainings</h2>
          <a href="#" className="text-blue-700 font-medium hover:underline">Show all &rarr;</a>
        </div>

        {/* Scrollable Course Card Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-8 top-1/2 cursor-pointer transform -translate-y-1/2 z-10 bg-black text-white rounded-full p-2 shadow-md"
          >
            &#8592;
          </button>

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-scroll pb-4 scroll-smooth no-scrollbar"
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Your original cards — unchanged */}
            {/* Example card (repeat as needed): */}
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md w-72 flex-shrink-0 relative">
                <img src="/images/project_mgmt.png" alt="Course" className="w-full h-40 object-cover rounded-t-xl" />
                <div className="p-4">
                  <span className="text-sm text-white bg-orange-400 px-2 py-1 rounded-full">Course</span>
                  <h3 className="font-semibold text-lg mt-2">Cyber Threats</h3>
                  <p className="text-sm text-gray-600 mt-1">By CDAC NOIDA</p>
                </div>
                <div className="absolute top-2 right-2 bg-black text-white text-sm px-2 py-1 rounded">1h 30m</div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-8 top-1/2 cursor-pointer transform -translate-y-1/2 z-10 bg-black text-white rounded-full p-2 shadow-md"
          >
            &#8594;
          </button>
        </div>
      </section>

      {/* Optional: Hide native scrollbar if visible */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};
