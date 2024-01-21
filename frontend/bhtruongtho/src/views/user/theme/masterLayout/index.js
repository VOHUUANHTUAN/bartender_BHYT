import { memo } from "react";
import Header from "../header";
import Footer from "../footer";
import { useUser } from "../../../../context/UserContext";
const MasterLayout = ({ children, ...props }) => {
    const { user } = useUser();
    return (
        <div {...props}>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default memo(MasterLayout);
