import styles from './style.module.css';

type Props = {
    name: string;
    author: string;
    imageURL: string;
    categoryName: string;
}

const DEFAULT_IMG = 'https://ocean.si.edu/sites/default/files/styles/photo_full/public/2018-12/turtle-863336_1280.jpg';

export function Photo(props: Props) {
    return (
        <div className={styles.container}>
            <img src={props.imageURL} className={styles.image}/>
            <p><b>{props.name}</b></p>
            {props.categoryName || 'No Category'}
            <br/>
            Written by {props.author}
        </div>
    );
}
