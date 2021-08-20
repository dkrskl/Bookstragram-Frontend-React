import {api} from './api';
import {BookGetModel, BookModel} from './model';
import {ITEMS_PER_PAGE} from '../screens/Books';

const URL_BASE = '/book';

export class BookService {
    public static get(bookGetModel: BookGetModel): Promise<{ data: BookModel[]; totalCount: string; }> {
        const {page, categoryTagId, colorTagId, per_page = ITEMS_PER_PAGE, sortBy} = bookGetModel;

        return api.get<BookModel[]>(URL_BASE + `/?page=${page - 1}&per_page=${per_page}&categoryTagId=${categoryTagId}&colorTagId=${colorTagId}&${sortBy.isDescending ? 'sortByDescending' : 'sortBy'}=${sortBy.value}`)
            .then((response) => (
                {
                    data: response.data,
                    totalCount: response.headers['x-total-count'],
                }
            ));
    }
}
