"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const read_excel_file_1 = require("../../services/excel/read.excel.file");
const path_1 = __importDefault(require("path"));
const read_data_excel_1 = require("../../services/excel/read.data.excel");
const excel_data_validators_1 = require("../../services/excel/excel.data.validators");
const create_excel_1 = require("../../services/excel/create.excel");
const remove_files_1 = require("../../utils/remove.files");
const publish_1 = require("../../utils/publish");
const data_excel_1 = require("../../services/excel/data.excel");
const error_handler_1 = require("../../utils/error_handler");
exports.default = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ctx.answerCbQuery();
        ctx.deleteMessage();
        const fileName = (0, read_excel_file_1.searchExcelFile)(config_1.receivedPath);
        const documentPath = path_1.default.join(config_1.receivedPath, fileName);
        const workbook = yield (0, read_excel_file_1.readExcelFile)(documentPath);
        const dataSheetComplete = (0, read_data_excel_1.readDataExcel)(workbook);
        if (!(0, excel_data_validators_1.isDataComplete)(dataSheetComplete))
            throw new Error("Datos incompletos");
        const dataSheetPublish = (0, data_excel_1.getFirstFiveElements)(dataSheetComplete);
        const dataSheetNew = (0, data_excel_1.getRemainingElements)(dataSheetComplete);
        const newDocument = yield (0, create_excel_1.createExcel)(dataSheetNew);
        ctx.reply("¡Tu nuevo excel esta listo! ✅📊");
        yield ctx.replyWithDocument({ source: newDocument });
        yield (0, publish_1.publish)(dataSheetPublish, ctx);
    }
    catch (error) {
        (0, error_handler_1.handlerError)(error, ctx);
    }
    finally {
        yield (0, remove_files_1.removeFiles)(config_1.receivedPath);
        yield (0, remove_files_1.removeFiles)(config_1.generatedPath);
        yield (0, remove_files_1.removeFiles)(config_1.imagesBasePath);
    }
});
//# sourceMappingURL=query.publish.js.map