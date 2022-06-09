import Navbar from "../component/navbar"
import Subscription from "../component/subscription"
import GetAQuote from "../component/getAQuote"
import Footer from "../component/footer"

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Subscription />
            <GetAQuote />
            <Footer />
        </div>
    );
}
 
export default Layout;