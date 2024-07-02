import React, { Component, Suspense } from "react";

// Importando componentes de manera diferida (lazy loading)
const Navbar = React.lazy(() => import("../../component/Navbar/NavBar"));
const Section = React.lazy(() => import("./Section"));
const About = React.lazy(() => import("../../component/About"));
const Services = React.lazy(() => import("../../component/Services"));
const Feature = React.lazy(() => import("../../component/Feature"));
const Project = React.lazy(() => import("../../component/Project"));
const Clients = React.lazy(() => import("../../component/Clients"));
const Contact = React.lazy(() => import("../../component/Contact"));
const Footer = React.lazy(() => import("../../component/Footer/Footer"));

class Layout3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        { id: 1, idnm: "home", navheading: "Home" },
        { id: 2, idnm: "about", navheading: "About Us" },
        { id: 3, idnm: "services", navheading: "Services" },
        { id: 4, idnm: "features", navheading: "Features" },
        { id: 5, idnm: "project", navheading: "Project" },
        { id: 6, idnm: "clients", navheading: "Clients" },
        { id: 7, idnm: "contact", navheading: "Contact Us" },
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

  // Componente de preloader
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
          {/* Importando Navbar */}
          <Navbar
            navItems={this.state.navItems}
            navClass={this.state.navClass}
            imglight={this.state.imglight}
          />

          {/* Importando Section */}
          <Section />

          {/* Importando About */}
          <About />

          {/* Importando Services */}
          <Services />

          {/* Importando Feature */}
          <Feature />

          {/* Importando Project */}
          <Project />

          {/* Importando Clients */}
          <Clients />

          {/* Importando Contact */}
          <Contact />

          {/* Importando Footer */}
          <Footer />
        </Suspense>
      </React.Fragment>
    );
  }
}

export default Layout3;

