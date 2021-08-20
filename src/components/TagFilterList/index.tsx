import styles from './style.module.css';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {TagModel} from '../../services/model';
import {TagService} from '../../services/tag.service';

export type TagType = {
    label: string;
    id: string;
    isSelected?: boolean; // or just Omit<TagType, 'isSelected'> instead
}

function Tag(props: TagType) {
    return (
        <div className={`${styles.tag} ${props.isSelected && styles.selected}`}>
            {
                props.label
            }
        </div>
    );
}

type Props = {
    tagFieldName: string;
    onClick: (tag: TagType) => void;
    selectedTag: TagType;
    addAllField?: boolean;
}

export function TagFilterList({tagFieldName, onClick, selectedTag, addAllField = true}: Props) {
    const [tagList, setTagList] = useState<TagModel[]>([]);

    useEffect(() => {
        TagService.get(tagFieldName)
            .then((response) => {
                if (addAllField) {
                    response.unshift({
                        label: 'All',
                        id: '',
                        order: -1,
                        fieldName: tagFieldName,
                    });
                }
                setTagList(response);
            })
            .catch((e) => console.log({e}));
    }, []);

    return (
        <div className={styles.tagListContainer}>
            {
                tagList.map((t) =>
                    <div className={styles.tagWrapper} onClick={() => onClick(t)} key={t.id}>
                        <Tag {...t} isSelected={selectedTag.id === t.id}/>
                    </div>,
                )
            }
        </div>
    );
}
