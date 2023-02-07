import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";

function FooterPage() {
    return(
        <footer>
            <div className="social-media">
                <a href="https://www.facebook.com/" title="for reference only"><AiOutlineFacebook className="social-icon"/></a>
                <a href="https://www.instagram.com/" title="for reference only" ><AiOutlineInstagram className="social-icon"/></a>
                <a href="https://twitter.com/" title="for reference only"><AiOutlineTwitter className="social-icon"/></a>
            </div>
            <p>© 2022 Long To Lotto Tang</p>
        </footer>
    );
}

export default FooterPage;