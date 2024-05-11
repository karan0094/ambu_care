import React from 'react'
import './Foot.css'
import { faFacebook,faTwitter,faLinkedin,faPinterest } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Footer() {
    return (
        <>
          <div className="new_footer_area bg_color">
            <div className="new_footer_top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6 kal">
                    <div
                      className="f_widget company_widget wow fadeInLeft"
                      data-wow-delay="0.2s"
                    >
                      <h3 className="f-title f_600 t_color f_size_18">
                        Emergency Ambulance
                      </h3>
                      <p>Available 24x7 for your safety!!</p>
                      <form
                        action="#"
                        className="f_subscribe_two mailchimp"
                        method="post"
                        noValidate={true}
                      >
                        <input
                          type="text"
                          name="EMAIL"
                          className="form-control memail"
                          placeholder="Email"
                        />
                        <button className="btn btn_get btn_get_two" type="submit">
                          Subscribe
                        </button>
                        <p
                          className="mchimp-errmessage"
                          style={{ display: "none" }}
                        ></p>
                        <p
                          className="mchimp-sucmessage"
                          style={{ display: "none" }}
                        ></p>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 hel">
                    <div
                      className="f_widget about-widget pl_70 wow fadeInLeft"
                      data-wow-delay="0.4s"
                    >
                      <h3 className="f-title f_600 t_color f_size_18">Download</h3>
                      <ul className="list-unstyled f_list">
                        <li>
                          <a href="#">Company</a>
                        </li>
                        <li>
                          <a href="#">Android App</a>
                        </li>
                        <li>
                          <a href="#">iOS App</a>
                        </li>
                        <li>
                          <a href="#">Desktop</a>
                        </li>
                        <li>
                          <a href="#">Projects</a>
                        </li>
                        <li>
                          <a href="#">My tasks</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 bel">
                    <div
                      className="f_widget about-widget pl_70 wow fadeInLeft"
                      data-wow-delay="0.4s"
                    >
                      <h3 className="f-title f_600 t_color f_size_18">Services</h3>
                      <ul className="list-unstyled f_list">
                        <li>
                          <a href="#">Ambulance</a>
                        </li>
                        <li>
                          <a href="#">Air Ambulance</a>
                        </li>
                        <li>
                          <a href="#">Dead Body Ambulance</a>
                        </li>
                        <li>
                          <a href="#">Train Ambulance</a>
                        </li>
                        <li>
                          <a href="#">Funeral</a>
                        </li>
                        <li>
                          <a href="#">Basic Life Support</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 del">
                    <div
                      className="f_widget about-widget pl_70 wow fadeInLeft"
                      data-wow-delay="0.6s"
                    >
                      <h3 className="f-title f_600 t_color f_size_18">Help</h3>
                      <ul className="list-unstyled f_list">
                        <li>
                          <a href="#">FAQ</a>
                        </li>
                        <li>
                          <a href="#">Term &amp; Conditions</a>
                        </li>
                        <li>
                          <a href="#">Reporting</a>
                        </li>
                        <li>
                          <a href="#">Documentation</a>
                        </li>
                        <li>
                          <a href="#">Support Policy</a>
                        </li>
                        <li>
                          <a href="#">Privacy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div
                      className="f_widget social-widget pl_70 wow fadeInLeft"
                      data-wow-delay="0.8s"
                    >
                      <h3 className="f-title f_600 t_color f_size_18">
                        Team Solutions
                      </h3>
                      <div className="f_social_icon">
                        <a href="#" ><FontAwesomeIcon icon={faFacebook} className="fab fa-facebook"/></a>
                        <a href="#"><FontAwesomeIcon icon={faTwitter} className="fab fa-facebook"/></a>
                        <a href="#" ><FontAwesomeIcon icon={faLinkedin} className="fab fa-facebook"/></a>
                        <a href="#"><FontAwesomeIcon icon={faPinterest} className="fab fa-facebook"/></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer_bg">
                <div className="footer_bg_one"></div>
                <div className="footer_bg_two"></div>
              </div>
            </div>
            <div className="footer_bottom">
              <div className="container">
                <div className="align-items-center">
                  <div className="col-lg-6 col-sm-7">
                    <p className="mb-0 f_400">
                      © rapidrescue Inc.. 2024 All rights reserved.
                    </p>
                  </div>
                  <div className="col-lg-6 col-sm-5 text-right">
                    <p>
                      Made with <i className="icon_heart"></i> in{" "}
                      <a
                        href="http://rapidrescue.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        RapidRescue
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default Footer
