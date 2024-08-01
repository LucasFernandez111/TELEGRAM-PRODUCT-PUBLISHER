import { Composer } from "telegraf";
const { message } = require("telegraf/filters");
import documentOn from "./document";

const onComposer = new Composer();

onComposer.on(message("document"), documentOn);
export default onComposer;
