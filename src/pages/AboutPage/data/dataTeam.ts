import prog1 from "../../../assets/images/AboutPage/prog_1.jpg";
import prog2 from "../../../assets/images/AboutPage/prog_2.jpg";
import prog3 from "../../../assets/images/AboutPage/prog_3.jpg";

const dataTeam = [
  {
    name: "Evgeny",
    role: "Team lead, frontend developer",
    info: "I live in the Urals. I have been working as a developer of automation systems for over 10 years. I do development on React in my free time. I am taking a course rolling scope schools to improve my skills in web development and make new acquaintances. Hobbies: hicking, velo",
    foto: prog1,
    github: "https://github.com/EvgenOzr",
    contributions: [
      "Main page implementation",
      "About Us page implementation",
      "Profile page implementation",
      "Edit Profile",
      "Routing implementation",
      "Tests",
    ],
  },
  {
    name: "Victoria",
    role: "Backend & frontend developer",
    info: "Live in Minsk. I worked as a security system design engineer for 5 years. Then for 5 years I worked as a site administrator. Now, I want to change direction and further develop myself. I am interested in areas where I could work with programming languages, mathematics. Hobbies: photography, drawing",
    foto: prog2,
    github: "https://github.com/toryzb",
    contributions: [
      "Catalog page implementation",
      "Categories implementation",
      "Initial Api setup",
      "Adding cart implementation",
      "Filter implementation",
      "Routing implementation",
    ],
  },
  {
    name: "Kirill",
    role: "Backend & frontend developer",
    info: `Live in Kaliningrad. I'm working in rent business about 7 years and try to change my job. Think that the front-end is the best way to start a career in IT. Before I've ended course in Sberbank and want to imrove my skills and experience in rolling scope schools. Hobbies: music, films, sport.`,
    foto: prog3,
    github: "https://github.com/repkoO",
    contributions: [
      "Login page implementation",
      "Register page implementation",
      "Cart page implementation",
      "Search implementation",
      "Detailed Product Page Implementation",
      "Routing implementation",
    ],
  },
];
export default dataTeam;
