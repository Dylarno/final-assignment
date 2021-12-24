import './styles.css';

export const Post = (props) => {
    const {username, text} = props;

    return (
        <div className="post-container">
            <div className="post">
                <p className="username"> {username} </p>
                <p className="text"> {text} </p>
            </div>
        </div>
    )
}