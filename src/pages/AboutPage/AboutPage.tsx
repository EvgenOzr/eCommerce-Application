import dataTeam from "./data/dataTeam";
import "./AboutPage.scss";

const AboutPage = () => {
  return (
    <div className="about-container">
      {dataTeam.map((item) => {
        console.log(item.foto);

        return (
          <div className="about-card">
            <div className="about-card_personal">
              <div className="about-card_personal_name">{item.name}</div>
              <div className="about-card_personal_info">{item.info}</div>
              <div className="about-card_personal_role">
                Role in project: {item.role}
              </div>
              <a href={item.github} className="about-card_personal_github">
                Github profile
              </a>
            </div>
            <div className="about-card_foto">
              <img src={item.foto} alt="profilefoto" />
            </div>
          </div>
        );
      })}
      <a href="https://rs.school/" className="about_logo" target="_self" />
    </div>
  );
};

export default AboutPage;
