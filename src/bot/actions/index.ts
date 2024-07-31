import { Composer } from "telegraf";
import queryPublish from "./query.publish";
import { removeFiles } from "../../utils/remove.files";
import { receivedPath } from "../../config";

const actionsComposer = new Composer();

actionsComposer.action("publish", queryPublish);
actionsComposer.action("cancel_publish", (ctx) => {
  ctx.deleteMessage();
  removeFiles(receivedPath);
});

export default actionsComposer;
