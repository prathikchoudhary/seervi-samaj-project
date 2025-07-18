import LeftImage from "../images/Diya-Left.svg";
import RightImage from "../images/Diya-Right.svg";

export default function Image() {
    return (
        <div className="flex justify-between">
            <img src={LeftImage} width="120px" className="ml-2" alt="Diya-Left" />
            <img src={RightImage} width="120px" className="mr-2" alt="Diya-Right" />
        </div>
    );
}