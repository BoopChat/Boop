import { React, useState } from "react";
import { useSelector } from "react-redux";

import { ContactsController } from "./controllers/Contacts";
import { AlertType, useAlertDialogContext } from "./dialogs/AlertDialog";
import Modal from "./dialogs/Modal";

import "../../styles/dialog.css";
import trash from "../../assets/icons/trash.svg";


const ViewContactDialog = ({ onClose, img, username, id }) => {

    const handleClose = () => onClose();

    return (
        <Modal onClose={handleClose} center>
            <div id="view-contact-dialog">
                <header>{username + "#" + id}</header>
                <img src={img} alt="user"/>
            </div>
        </Modal>
    );
};

const ConfirmDialog = ({ onClose, username, id }) => {

    const handleClose = confirm => onClose(confirm);

    return (
        <Modal onClose={() => handleClose(false)} center>
            <div id="delete-contact-dialog">
                <header><b>Delete contact</b> {username + "#" + id} ?</header>
                <main>
                    <button className="btn_confirm" onClick={() => handleClose(true)}>Yes</button>
                    <button className="btn_deny" onClick={() => handleClose(false)}>Cancel</button>
                </main>
            </div>
        </Modal>
    );
};

const ContactItem = ({ img, username, status, id, triggerRefresh }) => {

    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const handleClickContact = () => setImageDialogOpen(true);
    const closeContactImage = () => setImageDialogOpen(false);

    const { display: displayDialog } = useAlertDialogContext();

    const token = useSelector((state) => state.user.token);

    const confirmDelete = () => setConfirmDialogOpen(true);

    const deleteContact = confirm => {
        setConfirmDialogOpen(false); // close confirm dialog
        if (confirm) { // if user confirmed to delete the contact
            const runAsync = async () => {
                let result = await ContactsController.deleteContact(token, id);
                displayDialog({
                    title: result.success ? "Success" : "Error",
                    message: result.msg,
                    type: result.success ? AlertType.Success : AlertType.Error
                });
            };
            runAsync();
            triggerRefresh();
        }
    };

    return (
        <div className="contact_item" title={username + "#" + id}>
            { imageDialogOpen ?
                <ViewContactDialog onClose={closeContactImage} img={img} username={username} id={id}/> : <></> }
            { confirmDialogOpen ? <ConfirmDialog onClose={deleteContact} username={username} id={id}/>  : <></> }
            <div className="img_and_name contacts">
                <img onClick={handleClickContact} src={img} className="skeleton" alt=""/>
                <div>
                    <span className="displayName">{username}</span>
                    <span className="id">{"#" + id}</span>
                </div>
            </div>

            <div className="trash_and_status">
                <div className={"status status_" + status}></div>
                <button className="trash_btn" id="deleteButton" onClick={confirmDelete}>
                    <img src={trash} alt="Delete"/>
                </button>
            </div>
        </div>
    );
};

export default ContactItem;
