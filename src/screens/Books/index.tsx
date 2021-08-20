import {Container} from '../../components/Container';
import {TagFilterList, TagType} from '../../components/TagFilterList';
import {useCallback, useEffect, useState} from 'react';
import {Photo} from '../../components/Photo';
import styles from './style.module.css';
import Pagination from 'rc-pagination';
import '../../../node_modules/rc-pagination/assets/index.css';
import {BookService} from '../../services/book.service';
import {BookModel, SelectFilterOption} from '../../services/model';

export const ITEMS_PER_PAGE = 9;

const SELECT_FILTER_OPTIONS = [
    {
        label: 'Last added',
        value: 'created_at_time',
        isDescending: true,
    },
    {
        label: 'First added',
        value: 'created_at_time',
        isDescending: false,
    },
    {
        label: 'Alphabetically (A > Z)',
        value: 'name',
        isDescending: false,
    },
    {
        label: 'Alphabetically (Z > A)',
        value: 'name',
        isDescending: true,
    },
];

export function Books() {
    const [bookList, setBookList] = useState<BookModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBookCount, setTotalBookCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<TagType>({label: '', id: ''});
    const [selectedColor, setSelectedColor] = useState<TagType>({label: '', id: ''});
    const [sortBy, setSortBy] = useState<SelectFilterOption>(SELECT_FILTER_OPTIONS[0]);

    const onFilterOptionPress = useCallback((index: string) => {
        const sortFilter = SELECT_FILTER_OPTIONS[parseInt(index, 10)];
        setSortBy(sortFilter ?? SELECT_FILTER_OPTIONS[0]);
        setCurrentPage(1);
    }, []);

    const onCategoryChange = useCallback((tag: TagType) => {
        setSelectedCategory(tag);
        setCurrentPage(1);
    }, []);

    const onColorChange = useCallback((tag: TagType) => {
        setSelectedColor(tag);
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        BookService.get({
            page: currentPage,
            categoryTagId: selectedCategory.id,
            colorTagId: selectedColor.id,
            sortBy,
        }).then((response) => {
            setBookList(response.data);
            setTotalBookCount(parseInt(response.totalCount, 10));
        });
    }, [currentPage, selectedCategory, selectedColor, sortBy]);

    return (
        <Container>
            <h1>Quickly find your book!</h1>
            <div className={styles.filtersContainer}>
                <div className={styles.tagFiltersContainer}>
                    <TagFilterList onClick={onCategoryChange}
                                   selectedTag={selectedCategory}
                                   tagFieldName='category'/>
                    <TagFilterList onClick={onColorChange}
                                   selectedTag={selectedColor}
                                   tagFieldName='color'/>
                </div>
                <div className={styles.dropdownFilterContainer}>
                    Sort results on {' '}
                    <select onChange={(e) => onFilterOptionPress(e.target.value)}>
                        {
                            SELECT_FILTER_OPTIONS.map((o, index) =>
                                <option value={index} key={o.value + o.isDescending}>
                                    {o.label}
                                </option>,
                            )
                        }
                    </select>
                </div>
            </div>
            {
                totalBookCount > 0 ?
                    <>
                        <div className={styles.photoContainer}>
                            {
                                bookList.map((b) =>
                                    <Photo name={b.name}
                                           author={b.author}
                                           categoryName={b.categoryTagLabel}
                                           imageURL={b.imageURL}
                                           key={b.id}/>,
                                )
                            }
                        </div>
                        <Pagination total={totalBookCount}
                                    pageSize={ITEMS_PER_PAGE}
                                    onChange={setCurrentPage}
                                    current={currentPage}/>
                    </>
                    :
                    <p>Not enough books to show</p>
            }
        </Container>
    );
}
