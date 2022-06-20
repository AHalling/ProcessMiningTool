import Copyright from "./Copyright";
import { Footer } from "../Styling/SharedStyling";



const FooterLayout = () => {
    return (
        <Footer>
            <Copyright>Copyright license AGPL {(new Date().getFullYear())}</Copyright>
        </Footer>
    )
}

export default FooterLayout