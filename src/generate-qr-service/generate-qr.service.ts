import {GenerateQrApiService} from './generate-qr-api.service'

export class GenerateQrService {
  public static generate(url: string): Promise<string | null> {
    return GenerateQrApiService.generate(url)
      .then((res) => res.blob())
      .then((res) => {
        return URL.createObjectURL(res)
      })
      .catch((err) => {
        console.log(err)

        return null
      })
  }
}
