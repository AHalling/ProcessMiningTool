// import init from "./init";

//import { parseLog } from "./fsInteraction";
// import { abstractLog } from "./src/log-abstraction";
// import mineFromAbstraction from "./src/mining";

export const apply = function (logPath: string) {

    let initial = require("./init");
    let parser = require("./fsInteraction");
    let abstractLog = require("./src/log-abstraction");
    let mining = require("./src/mining");

    initial.init();

    const parsedLog = parser.parseLog(logPath);

    const logAbstraction = abstractLog.abstractLog(parsedLog);

    const model = mining.mineFromAbstraction(logAbstraction);

    return model;
  }
