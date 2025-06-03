import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { CollaborativeEditor } from "./CollaborativeEditor";
import {useParams} from 'react-router-dom'
export default function CodeEditor() {
  const {interviweID}= useParams();
  return (
    <LiveblocksProvider publicApiKey="pk_dev_tgW_tZIA_sn0UbsJFo1A0EaTk2sRWVjItueJcag1ttt3DuMo1I2f9OYVTRi99pHz">
      <RoomProvider id="inteviweID">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <CollaborativeEditor />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
