// import AddIcon from "../../components/AddIcon/AddIcon";
import AvatarMenu from "../../components/AvatarMenu/AvatarMenu";
import HeaderBar from "../../components/HeaderBar/HeaderBar";

const HomeHeaderBar = () => {
  return (
    <div>
      <HeaderBar navbarRight={<AvatarMenu />} />
    </div>
  );
};
export { HomeHeaderBar };
