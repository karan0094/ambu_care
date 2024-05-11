import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
//import "./homeScript.js";
import { LocateFixed } from "lucide-react";

function Home() {
  return (
    <section className="Home_Section">
      <div className="main_content">
        <div className="hero_sec"></div>
        <div className="form_entry">
          <form
            action=""
            name="formUser"
            id="formUserId"
            className="formUserClass"
            method="POST"
          >
            <div className="inputdiv">
              <input
                type="text"
                name=""
                id="source"
                className="inpText"
                placeholder="Enter Source Location"
              />
              <LocateFixed className="srcClass"/>
            </div>
            <div className="inputdiv">
              <input
                type="text"
                name=""
                id="destination"
                className="inpText"
                placeholder="Enter Destination Location"
              />
            </div>
            <input
              type="button"
              className="searchbtn"
              value="Search Ambulance"
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Home;
