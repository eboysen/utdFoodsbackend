import morgan from "morgan";
import chalk from "chalk";
import { time } from "console";

export const morganMiddleware = morgan(function (tokens,req,res){
    return[
        "\n\n\n",
        chalk.yellow("MORGAN --->"),
        chalk.red("http method: "+tokens.method(req,res)),
        chalk.blue("url: "+ tokens.url(req,res)),
        chalk.cyan("status: " + tokens.status(req,res)),
        chalk.greenBright("runtime: " +tokens['response-time'](req,res) + " ms"),
        chalk.green("@: "+ tokens.date(req, res))
    ].join('\n');
});