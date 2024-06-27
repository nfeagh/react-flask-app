import { IoHeart, IoHeartOutline, IoStar, IoStarOutline } from "react-icons/io5";

export default function FavouriteIcon(props) {
  return props.isFavourite ? (
    <IoStar size="30px" color="gold"  />  // T21
  ) : (
    <IoStarOutline size="30px" color="gold" className="opacity-75 hover:opacity-100" /> // T21
  );
}
