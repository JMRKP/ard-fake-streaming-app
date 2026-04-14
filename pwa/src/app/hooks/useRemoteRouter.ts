import { useEffect } from "react";
import { useControllerEvents } from "./useControllerEvents";
import { router } from "../routes";

export function useRemoteRouter() {
  const { lastCommand } = useControllerEvents();

  useEffect(() => {
    if (!lastCommand) return;
    const { command } = lastCommand;
    const skipParam = command.action !== "go-home" && command.skipBlack ? "&skipBlack=1" : "";
    const variantParam = command.action !== "go-home" && command.variant ? `&variant=${command.variant}` : "";
    switch (command.action) {
      case "start-countdown":
        router.navigate(`/sender?phase=countdown${skipParam}${variantParam}`);
        break;
      case "start-live": {
        const at = Math.max(
          0,
          Math.min(180, Math.floor(command.atSeconds)),
        );
        router.navigate(`/sender?phase=live&at=${at}${skipParam}${variantParam}`);
        break;
      }
      case "go-home":
        router.navigate("/");
        break;
    }
  }, [lastCommand]);
}
