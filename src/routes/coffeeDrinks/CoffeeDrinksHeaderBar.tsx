// import AddIcon from "../../components/AddIcon/AddIcon";
import AvatarMenu from "../../components/AvatarMenu/AvatarMenu";
import HeaderBar from "../../components/HeaderBar/HeaderBar";

const CoffeeDrinksHeaderBar = () => {
  return (
    <div>
      <HeaderBar
        navbarCenter={
          <img
            style={{ width: "100%", height: "auto", verticalAlign: "middle" }}
            src="/logo-no-background.svg"
          />
        }
        navbarRight={<AvatarMenu />}
      />
    </div>
  );
};
export { CoffeeDrinksHeaderBar };
