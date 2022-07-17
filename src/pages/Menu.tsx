import { useParams } from "react-router-dom";
import { MyLink } from "../components/Link";

export default function Menu() {
  const { userName } = useParams();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <MyLink to="/" text="Home" />
      <MyLink to={`/library/${userName}`} text="Library" />
      {/* <MyLink to="/cardView" text="Card View" /> */}
    </div>
  );
}
