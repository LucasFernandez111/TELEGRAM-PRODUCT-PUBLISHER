import { Telegraf } from "telegraf";
import { BOT_GROUP, ID_GROUP } from "../config";
import { CustomError } from "./custom.error";

const botGroup = new Telegraf(BOT_GROUP);

export const sendPost = async (
  price: string,
  url: string,
  href: string,
  pathImage: string
) => {
  if (!pathImage || !price || !url || !href)
    throw new CustomError(
      "No hay imagen | precio | url |  href para enviar la publicacion ",
      "Ocurrió un error al publicar los productos. Por favor, inténtalo de nuevo más tarde.  🛍️",
      "sendPost"
    );
  await botGroup.telegram.sendPhoto(
    ID_GROUP,
    {
      source: pathImage,
    },
    {
      caption: `<b>🔥NUEVA OFERTA EXCLUSIVA DEL CANAL DE VENTAS🔥</b>
                \nHoy nuestra tienda de importaciones 🕵️ te trae un nuevo producto 🏴‍☠️. Para comprarlo es muy fácil, seleccionas las medidas, tamaño o colores, rellenas con tus datos de envío y solo queda esperar para disfrutar de tu compra.
                \n<b>MUY IMPORTANTE</b>
                \n• NOS DEBES DE ENVIAR EL NUMERO DE LA COMPRA PARA REGISTRARLA EN LA BASE DE DATOS Y ASÍ EVITAR PROBLEMAS DE ENVÍO.
                \n• ADEMÁS, TEN EN CUENTA QUE LOS ENLACES PUEDEN CADUCAR POR ELLO APROVECHA LA OFERTA EN EL MOMENTO VEAS ESTE MENSAJE.
                \nEn tan solo unos días, dependiendo del lugar, te llegará en las mejores condiciones y ahorrando un dineral!
                \n✅${price}✅
                \n<b>🔥Acuérdate de enviarnos el NUMERO DEL PEDIDO Y PONER EL CODIGO Chollazo2.0🔥</b>
                \n🚫OFERTA LIMITADA DE ESTE CANAL DE VENTAS🚫\n\nPara <b>COMPRAR</b>, puedes dirigirte al GROUP @Joselu_asistente_bot 🤖`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Comprar producto", url: `${url}` }],
          [{ text: "Mas imagenes ", url: `${href}` }],
        ],
      },
    }
  );
};
