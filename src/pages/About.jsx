export const About = () => {
    return (
        <div className="px-4 md:px-12 lg:px-20">
            {/* Main Title */}
            <h1 className="text-5xl font-semibold text-blue-900 text-center mt-8 mb-4">About Us</h1>
            <hr className="w-24 mx-auto border-t-2 border-gray-300 mb-8" />

            {/* Content Container */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                {/* Left Section (Image) */}
                <div className="w-full md:w-[55%] flex justify-center">
                    <img
                        src="https://gyaanarth.com/wp-content/uploads/2022/07/Centre-For-Development-Of-Advanced-Computing-CDAC-Noida.cover_.jpg"
                        alt="CDAC Noida"
                        className="w-full max-w-[750px] h-auto rounded-lg shadow-lg border-4 border-gray-200 object-cover"
                    />
                </div>

                {/* Right Section (Text) */}
                <div className="w-full md:w-[45%] flex flex-col justify-center">
                    {/* Section Title */}
                    <h2 className="text-4xl font-semibold text-blue-900 text-left">About CDAC</h2>
                    <hr className="w-full border-t-2 border-gray-300 my-2" />

                    {/* Description */}
                    <p className="text-lg text-gray-800 leading-relaxed text-justify mt-2">
                        Center for Development of Advanced Computing (<strong>C-DAC</strong>) is the premier R&D organization of the
                        <strong> Ministry of Electronics and Information Technology (MeitY)</strong> for carrying out R&D in 
                        <strong> IT, Electronics, and associated areas</strong>.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed text-justify mt-4">
                        Different areas of C-DAC had originated at different times, many of which came out as a result of the identification of opportunities.
                        The <strong>C-DAC Noida</strong>, formerly known as <strong>ER&DCI, Noida</strong>, is a constituent unit of C-DAC.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed text-justify mt-4">
                        Since its inception in <strong>1994</strong>, the center has been working in <strong>application-oriented design and development</strong> for various customer requirements. 
                        It has acquired <strong>competency, expertise, and extensive experience</strong> in the following areas:
                    </p>

                    {/* Key Areas */}
                    <ul className="text-lg text-gray-800 leading-relaxed mt-4 list-disc pl-6">
                        <li><strong>Strategic Electronics & Embedded Systems</strong></li>
                        <li><strong>Cyber Security</strong></li>
                        <li><strong>Health Informatics</strong></li>
                        <li><strong>e-Governance</strong></li>
                        <li><strong>Multilingual Computing</strong></li>
                    </ul>

                    {/* Learn More Link */}
                    <p className="mt-4">
                        <a href="https://www.cdac.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                            Learn more about C-DAC →
                        </a>
                    </p>
                </div>
            </div>

            {/* Additional Section Placeholder */}
            <div className="mt-16">
                <h2 className="text-3xl font-semibold text-blue-900 mb-4">About Cyber Gyan Virtual Training Facility</h2>
                <p className="text-gray-800 leading-relaxed text-xl ">Cyber Gyan, a flagship initiative of C-DAC under MeitY, offers a cutting-edge virtual training facility for aspiring cyber security professionals. This platform provides a simulated environment where students can acquire practical skills and learn how to defend against real-world cyber threats.</p>
                <img src="https://cdaccybergyan.uat.dcservices.in/images/AboutCourse.png" alt="training" className="w-full mt-5" />
            </div>

            <div>
                <h2 className="text-3xl font-semibold text-blue-900 mt-10 mb-5">About the course</h2>
                <p className="text-gray-800 leading-relaxed text-xl "> Our comprehensive Cyber Security Programme on Ethical Hacking and Penetration Testing equips you with the skills and knowledge to become a skilled cyber security professional. The program is designed to provide a deep understanding of ethical hacking methodologies, penetration testing techniques, and essential cyber security concepts.</p>
                <img src="https://cdaccybergyan.uat.dcservices.in/images/AboutCourseCategory.png" alt="training" className="w-full mt-5" />
            </div>
        </div>
    );
};
