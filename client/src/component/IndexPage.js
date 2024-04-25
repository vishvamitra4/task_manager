import todoGif from "./MR.gif";
import "./IndexPage.css";

function IndexPage() {
    return (
        <>
            <div className="indexPage">
                <h1 style={{ "fontSize": "7rem", "fontWeight": "900" }}>
                    <span style={{ "color": "red" }}>Task</span><br></br>
                    <span style={{ "position": "fixed", "zIndex": "-1", "top": "157px" }} id="manager">Manager</span>
                </h1>
                <img style={{ "width": "50%" }} src={todoGif} className="todo-image" />
            </div>
            <p>Created By @Vishvamitra</p>
        </>
    )
}

export default IndexPage;
