import mobileBg from "../../assets/images/cover-How-to-use-Instagram.png";
import innerImg from "../../assets/images/the_spines-411x800.jpg";

const MobileSide = () => {
  return (
    <div className="relative w-80">
      <img src={mobileBg} className="absolute z-50" />
      <div className="absolute left-20 h-mobile w-56 top-5 px-3">
        <img src={innerImg} className="w-full pt-7" />
      </div>
    </div>
  );
};

export default MobileSide;
