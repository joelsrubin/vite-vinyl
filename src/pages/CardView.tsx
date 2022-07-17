import VStack from "../components/Stack";
const items = [{ text: "a" }, { text: "b" }, { text: "c" }, { text: "d" }];

export default function CardView() {
  return <VStack items={items} />;
}
