import React, { Component, Suspense } from "react";

// Importing Components Lazily
const Navbar = React.lazy(() => import("../../components/Navbar/NavBar"));
const Login = React.lazy(() => import("../../components/Login"));
const ProjectForm = React.lazy(() => import("../../components/ProjectForm"));
const ProjectList = React.lazy(() => import("../../components/ProjectList"));
const TaskForm = React.lazy(() => import("../../components/TaskForm"));
const TaskList = React.lazy(() => import("../../components/TaskList"));
const Footer = React.lazy(() => import("../../components/Footer/Footer"));

class Layout1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        { id: 1, idnm: "login", navheading: "Login" },
        { id: 2, idnm: "projects", navheading: "Projects" },
        { id: 3, idnm: "tasks", navheading: "Tasks" },
      ],
      pos: document.documentElement.scrollTop,
      imglight: false,
      navClass: "",
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollNavigation, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > this.state.pos) {
      this.setState({ navClass: "nav-sticky", imglight: false });
    } else {
      this.setState({ navClass: "", imglight: false });
    }
  };

  // Preloader component
  PreLoader = () => {
    return (
      <div id="preloader">
        <div id="status">
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Suspense fallback={this.PreLoader()}>
          {/* Importing Navbar */}
          <Navbar
            navItems={this.state.navItems}
            navClass={this.state.navClass}
            imglight={this.state.imglight}
          />

          {/* Dynamic Content based on Route */}
          <main>
            {this.props.children}
          </main>

          {/* Importing Footer */}
          <Footer />
        </Suspense>
      </React.Fragment>
    );
  }
}

export default Layout1;
