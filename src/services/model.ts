export interface BaseModel {
    id: string;
}

export interface BookModel extends BaseModel {
    name: string;
    categoryTagId: string;
    categoryTagLabel: string;
    colorTagId: string;
    colorTagLabel: string;
    text: string;
    imageURL: string;
    author: string;
}

export interface TagModel extends BaseModel {
    label: string;
    fieldName: string;
    order: number;
}

export interface BookGetModel {
    page: number;
    per_page?: number;
    categoryTagId: string;
    colorTagId: string;
    sortBy: SelectFilterOption;
}

export type SelectFilterOption = {
    label: string;
    value: string;
    isDescending: boolean;
}
