import { ClipLoader } from "react-spinners";
import "./App.css";
import { MyLink } from "./components/Link";
import { Table } from "./components/Table";

function Library({ data }: { data: Info }) {
  if (!data) {
    return <ClipLoader size={20} />;
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
      <Table items={data.releases} />
    </div>
  );
}

export default Library;
