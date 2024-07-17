
import { Composer } from 'telegraf';
import publicarCommand from './publicar';


const commandsComposer = new Composer();

commandsComposer.command('publicar', publicarCommand);
// const PATH_ROUTER = __dirname;
// const cleanFileName = (fileName: string) => {
//   const file = fileName.split('.').shift();
//   return file;
// };
 // Leer y registrar los comandos automáticamente
// readdirSync(PATH_ROUTER).forEach((fileName) => {
//   const cleanName = cleanFileName(fileName);
//   if (cleanName && cleanName !== 'index') import(`./${cleanName}`).then((moduleCommand) => commandsComposer.command(cleanName, moduleCommand.default));  
// })


export default commandsComposer
