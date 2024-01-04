import AddIcon from "./AddIcon";
import AvatarMenu from "./AvatarMenu";
import HeaderBar from "../../../components/HeaderBar";

export const HomeHeaderBar = () => {
  return (
    <div>
      <HeaderBar navbarLeft={<AddIcon />} navbarRight={<AvatarMenu />} />
    </div>
  );
};
export default HomeHeaderBar;
