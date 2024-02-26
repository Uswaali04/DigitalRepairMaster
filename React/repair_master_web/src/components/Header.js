import { Link, useNavigate } from "react-router-dom";
function Header() {

  const token = localStorage.getItem('token');
  const user_type = localStorage.getItem('user_type')
  const profileId = localStorage.getItem('profile_Id')
  const navigate = useNavigate()
  const Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("user_type")
    localStorage.removeItem("repair_id")
    localStorage.removeItem("Shop/Lab_name")
    localStorage.removeItem("userid")
    localStorage.removeItem("profileId")
    localStorage.removeItem("profile_Id")
    navigate("/");
  }

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Repair Master</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>

                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/check-shops">
                    Check Shops
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about-us">
                    About us
                  </Link>
                </li>
                {!profileId && token && user_type === 'as_a_shop/lab_owner' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/earn-money">
                        Earn Money
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={Logout} to="/">
                        Logout
                      </Link>
                    </li>
                  </>
                )

                }
                {profileId && token && user_type === 'as_a_shop/lab_owner' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/earn-money">
                        Earn Money
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/view-profile">
                        ViewProfile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={Logout} to="/">
                        Logout
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/your-offers">
                        Your Offers
                      </Link>
                    </li>
                  </>
                )

                }

                {!token && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login/Register
                    </Link>
                  </li>
                )}
               
                {token && user_type === 'as_a_client' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/post-task">
                        Post for a Repair
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/posted-by-you">
                        Posted by You
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={Logout} to="/">
                        Logout
                      </Link>
                    </li>
                  </>
                )}
               
              </ul>
              
            </div>
          </div>
        </nav>

      </header>
    </div>
  );
}

export default Header;
