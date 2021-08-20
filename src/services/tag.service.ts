import {api} from './api';
import {TagModel} from './model';

const URL_BASE = '/tag';

export class TagService {
    public static get(fieldName: string): Promise<TagModel[]> {
        return api.get<TagModel[]>(URL_BASE + `/?fieldName=${fieldName}`)
            .then((response) => response.data);
    }
}
