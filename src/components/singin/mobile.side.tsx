import mobileBg from "../../assets/images/cover-How-to-use-Instagram.png";

const MobileSide = () => {
  return (
    <div className="relative w-80">
      <img src={mobileBg} className="absolute z-50" />
      <div className="absolute left-20 h-mobile w-56 top-5 px-3">text</div>
    </div>
  );
};

export default MobileSide;
