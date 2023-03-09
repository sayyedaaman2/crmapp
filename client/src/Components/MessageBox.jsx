
function MessageBox(props) {
    return (
        <div id="message-box">
            <div id='message-content'>{props.messageContent.message}</div>
            <div id="message-button-continer">
                <button id="message-btn" onClick={() => {
                    document.getElementById("message-box").style.display = "none";
                }}>OK</button>
            </div>
        </div>
    )
}
export default MessageBox;