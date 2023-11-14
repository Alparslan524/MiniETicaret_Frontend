import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    constructor(private httpClientService: HttpClientService) { }

    async getBaseStorageUrl(): Promise<any> {
        const getObservable: Observable<any> = await this.httpClientService.get({
            controller: "files",
            action: "getbasestorageurl"
        })
        return await firstValueFrom(getObservable);
    }
}
