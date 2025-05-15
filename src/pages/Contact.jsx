import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const Contact = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center  mt-4 p-4 min-h-[80vh]">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-blue-900">Contact Us</h2>
        <hr className="w-40 mx-auto border-t-2 border-gray-300 my-4" />
      </div>

      {/* Contact Info Box */}
      <div className="w-full max-w-[40rem] bg-gray-50 rounded-2xl border-2 border-green-600 shadow-lg p-5">
        {/* Header */}
        <div className="bg-gray-200 w-full rounded-xl p-4">
          <p className="text-center text-xl md:text-2xl text-red-500 font-semibold">
            For any query, please write to us @
          </p>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-5 mt-6 px-4 md:px-6">
          {/* Address */}
          <div className="flex gap-4">
            <FaLocationDot className="text-green-600 text-2xl self-start mt-1" />
            <p className="text-lg text-green-600 font-semibold">
              <strong className="text-xl">Address:</strong> Academic Block, C-DAC, B-30, Sector-62, Institutional Area, Noida - 201307, Uttar Pradesh, India
            </p>
          </div>

          {/* Email */}
          <div className="flex gap-4">
            <MdEmail className="text-green-600 text-2xl self-start mt-1" />
            <p className="text-lg text-green-600 font-semibold">
              <strong className="text-xl">Email:</strong> cybergyan-noida@cdac.in
            </p>
          </div>

          {/* Contact */}
          <div className="flex gap-4">
            <FaPhone className="text-green-600 text-2xl self-start mt-1" />
            <p className="text-lg text-green-600 font-semibold">
              <strong className="text-xl">Contact:</strong> +91-120-2210800
            </p>
          </div>
        </div>
      </div>

      {/* Spacing between sections */}
      <div className="my-8"></div>

      {/* Office Hours Section */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-blue-900">Office Hours</h2>
        <hr className="w-40 mx-auto border-t-2 border-gray-300 my-4" />
      </div>

      {/* Office Hours Box */}
      <div className="w-full max-w-[40rem] bg-gray-50 rounded-2xl border-2 border-green-600 shadow-lg p-5">
        {/* Header */}
        <div className="bg-gray-200 w-full rounded-xl p-4">
          <p className="text-center text-xl md:text-2xl text-red-500 font-semibold">
            Our Availability
          </p>
        </div>

        {/* Office Hours Details */}
        <div className="flex flex-col gap-3 mt-4 px-4 md:px-6 text-lg text-center text-green-600  font-semibold">
          <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
          <p><strong>Saturday & Sunday:</strong> CLOSED</p>
        </div>
      </div>
    </div>
  );
};
