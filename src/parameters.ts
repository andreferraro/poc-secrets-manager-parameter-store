/* eslint-disable @typescript-eslint/no-explicit-any */
import { SSM } from 'aws-sdk'
import { IParameter } from './interfaces'

export async function getParam(parameter: string): Promise<IParameter> {
    const client = new SSM({
        region: 'us-east-1',
    })

    return new Promise((resolve, reject) => {
        client.getParameter({ Name: parameter, WithDecryption: true }, (err, data) => {
            if (err) {
                console.log(JSON.stringify(err))
                reject(err)
                return
            }

            if ('Parameter' in data) {
                resolve(data.Parameter as unknown as IParameter)
            } else {
                resolve(Buffer.from(data.Parameter as any, 'base64').toString('ascii') as unknown as IParameter)
            }
        })
    })
}
