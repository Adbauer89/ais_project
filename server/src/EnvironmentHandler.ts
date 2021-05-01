import fs from 'fs';

export default class EnvironmentHandler {
    private readonly filePath: string;

    public constructor(filePath: string) {
        this.filePath = filePath;
    }

    public setUp() {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath);
            data.toString().replace(/\r\n/g, '\n').split('\n').forEach((line: string) => {
                const [key, value] = line.split('=', 2);
                if (key && process.env[key] === undefined) {
                    process.env[key] = value;
                }
            })
        }
    }
}
