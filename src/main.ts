import express from 'express';
import { getSecret } from './secrets';
import * as dotenv from 'dotenv';
import { getParam } from './parameters';
import { ICredentials, IParameter } from './interfaces';

dotenv.config();
const app = express();
const port = 3000;

app.get('/', async (req, res): Promise<ICredentials> => {
    const secrets = await getSecret(process.env.SECRETS_MANAGER_ARN);
    const secretsObj: ICredentials = JSON.parse(secrets);

    // console.log(secretsObj.access_token);
    // console.log(secretsObj.client_secret);

    const param: IParameter = await getParam('partner_url');

    // console.log(param.Value);

    res.json({access_token: secretsObj.access_token, client_secret: secretsObj.client_secret, url: param.Value});
    return Promise.resolve(secretsObj);
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
