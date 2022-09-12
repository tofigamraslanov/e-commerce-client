import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { BaseStorageUrl } from '../../../contracts/baseStorageUrl';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private httpClientService: HttpClientService) {}

  async getBaseStorageUrl(): Promise<BaseStorageUrl> {
    const observable: Observable<BaseStorageUrl> =
      this.httpClientService.get<BaseStorageUrl>({
        controller: 'files',
        action: 'GetBaseStorageUrl',
      });
    return await firstValueFrom(observable);
  }
}
