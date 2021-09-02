const ContactItem = ({img, username, user_id, status="offline"}) => {

    return (
        <div className="contact_item">
            <div className="img_and_name">
                <img src={img} alt="contact_img"/>
                <span>{username}</span>
            </div>
            <div className={"status status_" + status}></div>
        </div>
    )
}

export default ContactItem;