
import "./Navbar.css";

export  const Navbar = () => {

 const pages = ["Homes", "Blog",  "Setting", "About Us", "Our Team"]
    
    return(
  <div className="simple-navbar">
    {pages.map((page) => (
        <h3 key={page}>{page}</h3>
    ))}
  </div>
    );
};