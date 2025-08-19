import logo from '../images/Logo-Name.svg';

function Logo({className="", ...props}) {
    return <img src={logo} alt="" className={className} props={props}   />
}

export default Logo