import express from 'express';
import { getSecret } from './secrets';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

interface ICredentials {
    access_token: string; client_secret: string;
}

app.get('/', async (req, res): Promise<ICredentials> => {
    const secrets = await getSecret(process.env.SECRETS_MANAGER_ARN);
    const secretsObj: ICredentials = JSON.parse(secrets);

    console.log(secretsObj.access_token);
    console.log(secretsObj.client_secret);

    res.json(secretsObj);
    return Promise.resolve(secretsObj);
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
