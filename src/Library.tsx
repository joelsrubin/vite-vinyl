import { ClipLoader } from "react-spinners";
import "./App.css";
import { MyLink } from "./components/Link";
import { MyTable } from "./components/Table";

function Library({ data }: { data: Info }) {
  if (!data) {
    return (
      <div className="flex justify-center content-center items-center min-h-screen">
        <ClipLoader size={40} />
      </div>
    );
  }
  return (
    <div>
      <h1 className="font-mono text-center text-xl mt-10">vinyl</h1>
      <h1 className="font-mono text-center text-xl">
        total count {data.pagination.items}
      </h1>

      <nav className="flex justify-center mt-4">
        <MyLink to="/" text="Home" />
      </nav>
      <MyTable items={data.releases} />
    </div>
  );
}

export default Library;
