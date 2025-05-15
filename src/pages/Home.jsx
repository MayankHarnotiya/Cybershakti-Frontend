import { Element } from "react-scroll";
import { About } from "./About";
import { Eligible } from "./Eligible";
import {Contact} from './Contact'
import { Hero } from "./Hero";

export const Home = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <Element name="home" className="">
       <Hero/>
      </Element>

      {/* About Us Section */}
      <Element name="about" className="w-full bg-white">
        <About/>
      </Element>

      {/* Who is Eligible Section */}
      <Element name="eligibility" className="w-full bg-white">
        <Eligible/>
      </Element>

      {/* Contact Section */}
      <Element name="contact" className="w-full bg-white ">
        <Contact/>
      </Element>
    </div>
  );
};





export default Home;
