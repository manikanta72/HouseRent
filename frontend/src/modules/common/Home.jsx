import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Carousel, Card, Row, Col } from "react-bootstrap";
import AllPropertiesCards from "../user/AllPropertiesCards";

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const heroImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
  ];

  const cities = [
    { name: "Hyderabad", img: "https://c4.wallpaperflare.com/wallpaper/76/280/48/architecture-building-design-house-wallpaper-preview.jpg" },
    { name: "Bengaluru", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2" },
    { name: "Vizag", img: "https://t3.ftcdn.net/jpg/02/33/59/42/360_F_233594258_81s2Un5DEpmiHYxuOPAUfnrD0T9we5fd.jpg" },
  ];

  const lifestyles = [
    { title: "Near Beach", route: "/explore/beach", img: "https://images.mansionglobal.com/im-34094709?width=1920&height=1200" },
    { title: "City Life", route: "/explore/city", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b" },
    { title: "Near Forest", route: "/explore/forest", img: "https://w0.peakpx.com/wallpaper/405/320/HD-wallpaper-house-near-forest-forest-house-moss-waterfall-nature-trees-landscape.jpg" },
    { title: "Open Land", route: "/explore/open", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar expand="lg" className="custom-navbar sticky-top">
        <Container>
          <Navbar.Brand className="brand-text">RentEase</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto gap-3 align-items-center">
              <Link className="nav-link-custom" to="/">Home</Link>
              <Link className="nav-link-custom" to="/login">Login</Link>
              <Link to="/register">
                <Button className="nav-cta">Register</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ================= HERO ================= */}
      <Carousel fade interval={600}>
        {heroImages.map((img, i) => (
          <Carousel.Item key={i}>
            <img
              src={`${img}?auto=format&fit=crop&w=1600&q=80`}
              className="d-block w-100 hero-img"
              alt="home"
            />
            <Carousel.Caption className="hero-caption">
              <h2>Find Homes You’ll Love</h2>
              <p>Verified, affordable & comfortable rental homes</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* ================= POPULAR CITIES ================= */}
      <section className="section">
        <Container>
          <h3 className="section-title">Popular Cities</h3>
          <Row>
            {cities.map((city, i) => (
              <Col md={4} key={i}>
                <Card className="click-card" onClick={() => navigate(`/city/${city.name.toLowerCase()}`)}>
                  <Card.Img src={city.img} />
                  <Card.Body>
                    <Card.Title>{city.name}</Card.Title>
                    <p className="text-muted">Explore homes in {city.name}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= LIFESTYLE ================= */}
      <section className="section bg-light">
        <Container>
          <h3 className="section-title">Homes by Lifestyle</h3>
          <Row>
            {lifestyles.map((life, i) => (
              <Col md={3} sm={6} key={i}>
                <Card className="click-card" onClick={() => navigate(life.route)}>
                  <Card.Img src={life.img} />
                  <Card.Body className="text-center">
                    <Card.Title>{life.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

     {/* ================= FEATURED HOMES ================= */}
<section className="section bg-featured">
  <Container>
    <div className="featured-header">
      <h3 className="section-title">Featured Properties</h3>
      <Link to="/properties" className="view-all-link">
        View all →
      </Link>
    </div>

    <div className="featured-wrapper">
      <AllPropertiesCards />
    </div>
  </Container>
</section>

   {/* ================= HAPPY CUSTOMERS (VIDEO REVIEWS) ================= */}
<section className="section bg-light">
  <Container>
    <h3 className="section-title">Happy Customers</h3>

    <Row>
      {[
        {
          title: "Family Home Experience",
          src: "https://v.ftcdn.net/06/61/76/80/240_F_661768035_oAN7IuPjKHTbL8UBJOgX4Wko2fv4KQ1d_ST.mp4",
        },
        {
          title: "Luxury Apartment Tour",
          src: "https://v.ftcdn.net/06/70/43/22/240_F_670432288_O5IfE6jWcgOTf6zpFgUOhPuyeHFNSfVj_ST.mp4",
        },
        {
          title: "Peaceful Living",
          src: "https://v.ftcdn.net/16/19/00/81/240_F_1619008163_0mGBS7guqcTYRMjXgUosE6lCLOA4aJQN_ST.mp4",
        },
      ].map((video, i) => (
        <Col md={4} key={i}>
          <div className="customer-video-card">
            <h5 className="video-title">{video.title}</h5>

            <video
              className="customer-video"
              muted
              loop
              playsInline
              preload="metadata"
              onMouseEnter={(e) => {
                e.currentTarget.play().catch(() => {});
              }}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
              onClick={(e) => {
                if (e.currentTarget.paused) {
                  e.currentTarget.play().catch(() => {});
                } else {
                  e.currentTarget.pause();
                }
              }}
            >
              <source src={video.src} type="video/mp4" />
            </video>

            <p className="video-hint">Your Dream is our Goal.</p>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
</section>
      {/* ================= CTA ================= */}
      <section className="cta-section">
        <h2>Want to List Your Property?</h2>
        <p>Reach thousands of tenants easily</p>
        <Link to="/register">
          <Button variant="light">Register as Owner</Button>
        </Link>
      </section>

     {/* ================= FOOTER ================= */}
<footer className="footer-main">
  <Container>
    <Row className="footer-top">
      <Col md={4} sm={12}>
        <h5 className="footer-brand">RentEase</h5>
        <p className="footer-desc">
          Find verified rental homes across India with comfort, trust, and ease.
        </p>
      </Col>

      <Col md={2} sm={6}>
        <h6 className="footer-title">Company</h6>
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </Col>

      <Col md={3} sm={6}>
        <h6 className="footer-title">Popular Cities</h6>
        <ul className="footer-links">
          <li>Hyderabad</li>
          <li>Bengaluru</li>
          <li>Vizag</li>
          <li>Chennai</li>
        </ul>
      </Col>

      <Col md={3} sm={12}>
        <h6 className="footer-title">Contact</h6>
        <p className="footer-contact">
          <i className="bi bi-envelope"></i> giet@ac.in
        </p>
        <p className="footer-contact">
          <i className="bi bi-telephone"></i> +91 12345 67890
        </p>
      </Col>
    </Row>

    <hr className="footer-divider" />

    <Row className="footer-bottom">
      <Col md={6} sm={12}>
        <p>© 2026 RentEase. All rights reserved.</p>
      </Col>

      <Col md={6} sm={12} className="footer-social">
        <i className="bi bi-facebook"></i>
        <i className="bi bi-instagram"></i>
        <i className="bi bi-linkedin"></i>
        <i className="bi bi-twitter-x"></i>
      </Col>
    </Row>
  </Container>
</footer>
    </>
  );
};

export default Home;