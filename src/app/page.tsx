import { CollaborativeApp } from "./components/CollaborativeApp";
import { Room } from "./room";

export default function Page() {
  return (
    <Room>
      <CollaborativeApp />
    </Room>
  );
}