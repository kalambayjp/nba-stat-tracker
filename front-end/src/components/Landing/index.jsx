import nbaLogos from "../../assets/images/nbaLogos.png";
import "./index.scss";
// front-end\src\assets\images\nba-team-logos.png

const Landing = () => {
  return (
    <div className="landing-page-content">
      <div className="landing-prompt">
        <h3>Login / Register</h3>
        <span>To get the latest stats on your favourite teams and players</span>
      </div>
      <div className="landing-animation">
        <img src={nbaLogos} alt="nba teams" />
      </div>
    </div>
  );
};

export default Landing;
