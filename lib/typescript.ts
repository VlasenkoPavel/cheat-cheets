
/** java style string formater */
const format = (theString: string, ...args: (string | number)[]) => {
    const regex = /%s/;
    const stringArgs = args.map(i => i.toString());
    const formater = (substring: string, newValue: string) => substring.replace(regex, newValue);

    return stringArgs.reduce(formater, theString);
}

/** min server */
const http = require('http');
const listner = (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello You\n');
}

const server = http.createServer(listner);
server.listen(8080);
