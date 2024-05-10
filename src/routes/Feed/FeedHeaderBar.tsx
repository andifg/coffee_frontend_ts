import AddIcon from "../../components/AddIcon/AddIcon";
import AvatarMenu from "../../components/AvatarMenu/AvatarMenu";
import HeaderBar from "../../components/HeaderBar/HeaderBar";

const FeedHeaderBar = () => {
  return (
    <div>
      <HeaderBar navbarLeft={<AddIcon />} navbarRight={<AvatarMenu />} />
    </div>
  );
};
export { FeedHeaderBar };
