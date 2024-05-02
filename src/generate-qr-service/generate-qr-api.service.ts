import {API} from '../api'

export class GenerateQrApiService {
  public static generate(url: string): Promise<Response> {
    return fetch(`${API.root}/api/v1/generator/create?url=${url}`)
  }
}
