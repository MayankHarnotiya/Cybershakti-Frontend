import { Element } from "react-scroll";
import { About } from "./About";
import { Eligible } from "./Eligible";
import {Contact} from './Contact'

export const Home = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <Element name="home">
      
      </Element>

      {/* About Us Section */}
      <Element name="about" className="w-full">
        <About/>
      </Element>

      {/* Who is Eligible Section */}
      <Element name="eligibility" className="w-full">
        <Eligible/>
      </Element>

      {/* Contact Section */}
      <Element name="contact" className="w-full ">
        <Contact/>
      </Element>
    </div>
  );
};





export default Home;
