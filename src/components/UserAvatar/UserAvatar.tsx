import Avatar from "@mui/material/Avatar";

interface userAvaterProps {
  given_name?: string;
}

const UserAvatar = (props: userAvaterProps) => {
  return (
    <Avatar
      sx={{
        width: 28,
        height: 28,
        bgcolor: "white",
        color: "text.primary",
        borderColor: "text.primary",
        border: "1px solid",
      }}
    >
      {props.given_name?.charAt(0).toUpperCase() || "U"}
    </Avatar>
  );
};

export default UserAvatar;
