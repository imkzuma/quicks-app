export default function DefaultImageChat( props ){
    const { image } = props;
    const initial = image[0].toUpperCase();
    return(
        <div
            className = "bg-primary text-white d-flex justify-content-center align-items-center rounded-circle"
            style = {{
                minWidth: "2.125rem",
                minHeight: "2.125rem",
                maxWidth: "2.125rem",
                maxHeight: "2.125rem",
            }}
        >
            { initial }
        </div>
    )
}