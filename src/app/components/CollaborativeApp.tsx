"use client";

import { useMyPresence, useOthers, useSelf } from "../../../liveblocks.config";
import Cursor from "./cursor";
const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

export function CollaborativeApp() {
  const others = useOthers();
  const userCount = others.length;
  const currentUser = useSelf();
console.log(currentUser)
  const [{ cursor }, updateMyPresence] = useMyPresence();

  return <div className="w-screen h-screen"
    onPointerMove={(event) => {
      updateMyPresence({
        cursor: {
          x: Math.round(event.clientX),
          y: Math.round(event.clientY),
        }
      })
    }}
     onPointerLeave={() =>
        updateMyPresence({
          cursor: null,
        })
      }
  >
 
    <div> {cursor
          ? `${cursor.x} × ${cursor.y}`
          : "Move your cursor to broadcast its position to other people in the room."}</div>

    {
        /**
         * Iterate over other users and display a cursor based on their presence
         */
        others.map(({ connectionId, presence }) => {
          if (presence?.cursor === null) {
            return null;
          }

          return (
            <Cursor
              key={`cursor-${connectionId}`}
              // connectionId is an integer that is incremented at every new connections
              // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
              color={COLORS[connectionId % COLORS.length]}
              x={presence.cursor.x}
              y={presence.cursor.y}
            />
          );
        })
      }

  </div>;
}