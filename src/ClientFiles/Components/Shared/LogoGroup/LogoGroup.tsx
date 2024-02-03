import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import "./LogoGroup.css"

const LogoGroup = () => {
  return (
    <div className="icon-container flex gap-4 text-3xl text-white">
      <div className="icon">
        <FaFacebook />
      </div>
      <div className="icon">
        <AiFillTwitterCircle />
      </div>
      <div className="icon">
        <RiInstagramFill />
      </div>
    </div>
  );
};

export default LogoGroup;
