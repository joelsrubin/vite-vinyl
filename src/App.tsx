import { MyLink } from "./components/Link";

export default function App() {
  return (
    <div className="font-mono text-center text-xl mt-20">
      <h1>Vinyl Cup</h1>
      <ul className="mt-20 flex flex-col gap-10 items-center">
        <MyLink to="/library" text="Table View" isLoading={false} />
        {/* <MyLink to="/cards" text="Card View" state={state} /> */}
      </ul>
    </div>
  );
}
