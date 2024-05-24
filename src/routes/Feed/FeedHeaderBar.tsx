// import AddIcon from "../../components/AddIcon/AddIcon";
import AvatarMenu from "../../components/AvatarMenu/AvatarMenu";
import HeaderBar from "../../components/HeaderBar/HeaderBar";

const FeedHeaderBar = () => {
  return (
    <div>
      <HeaderBar
        data-testid="feed-header-bar"
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
export { FeedHeaderBar };
