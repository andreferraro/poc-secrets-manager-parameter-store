/* eslint-disable @typescript-eslint/no-explicit-any */
import { SecretsManager } from 'aws-sdk'

export async function getSecret(secretArn: string): Promise<string> {
    const client = new SecretsManager({
        region: 'us-east-1',
    })

    return new Promise((resolve, reject) => {
        client.getSecretValue({ SecretId: secretArn }, (err, data) => {
            if (err) {
                console.log(JSON.stringify(err))
                reject(err)
                return
            }

            if ('SecretString' in data) {
                resolve(data.SecretString as string)
            } else {
                resolve(Buffer.from(data.SecretBinary as any, 'base64').toString('ascii'))
            }
        })
    })
}
