import { useEffect } from "react";
import { useControllerEvents } from "./useControllerEvents";
import { router } from "../routes";

export function useRemoteRouter() {
  const { lastCommand } = useControllerEvents();

  useEffect(() => {
    if (!lastCommand) return;
    const { command } = lastCommand;
    const skipParam = command.action !== "go-home" && command.skipBlack ? "&skipBlack=1" : "";
    switch (command.action) {
      case "start-countdown": {
        const camParam = command.cameraFacing ? `&camera=${command.cameraFacing}` : "";
        router.navigate(`/sender?phase=countdown${skipParam}${camParam}`);
        break;
      }
      case "start-live": {
        const at = Math.max(
          0,
          Math.min(180, Math.floor(command.atSeconds)),
        );
        const camParam = command.cameraFacing ? `&camera=${command.cameraFacing}` : "";
        router.navigate(`/sender?phase=live&at=${at}${skipParam}${camParam}`);
        break;
      }
      case "go-home":
        router.navigate("/");
        break;
    }
  }, [lastCommand]);
}
