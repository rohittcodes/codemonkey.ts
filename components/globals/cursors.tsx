import { useEffect, useMemo, useState } from "react";
import { useSelf } from "@liveblocks/react/suspense";
import { AwarenessList, UserAwareness } from "@/liveblocks.config";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";

type Props = {
  yProvider: LiveblocksYjsProvider;
};

export function Cursors({ yProvider }: Props) {
  const userInfo = useSelf((me) => me.info);

  const [awarenessUsers, setAwarenessUsers] = useState<AwarenessList>([]);

  useEffect(() => {
    const localUser: UserAwareness["user"] = userInfo;
    yProvider.awareness.setLocalStateField("user", localUser);

    function setUsers() {
      setAwarenessUsers([...yProvider.awareness.getStates()] as AwarenessList);
    }

    yProvider.awareness.on("change", setUsers);
    setUsers();

    return () => {
      yProvider.awareness.off("change", setUsers);
    };
  }, [yProvider]);

  const styleSheet = useMemo(() => {
    let cursorStyles = "";

    for (const [clientId, client] of awarenessUsers) {
      if (client?.user) {
        cursorStyles += `
          .yRemoteSelection-${clientId}, 
          .yRemoteSelectionHead-${clientId}  {
            --user-color: ${client.user.color || "orangered"};
          }
          
          .yRemoteSelectionHead-${clientId}::after {
            content: "${client.user.name}";
          }
        `;
      }
    }

    return { __html: cursorStyles };
  }, [awarenessUsers]);

  return <style dangerouslySetInnerHTML={styleSheet} />;
}
