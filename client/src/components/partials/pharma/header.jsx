import PharmaNavBar from "./menuBar"

const PharmaHeader = () => {
    <div className="site-navbar py-2">
        <PharmaNavBar />
        <div className="search-wrap">
        <div className="container">
            <a href="#" className="search-close js-search-close"><span class="icon-close2"></span></a>
            <form action="#" method="post">
            <input type="text" className="form-control" placeholder="Search keyword and hit enter..."/>
            </form>
        </div>
        </div>
    </div>
}

export default PharmaHeader;