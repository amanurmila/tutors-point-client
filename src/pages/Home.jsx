import ApprovedSession from "./Home/ApprovedSession";
import BannerSection from "./Home/BannerSection";
import StudySessions from "./Home/StudySessions";
import TutorSection from "./Home/TutorSection";

const Home = () => {
  return (
    <div>
      <section>
        <BannerSection />
      </section>
      <section>
        <StudySessions />
      </section>
      <section>
        <ApprovedSession />
      </section>
      <section>
        <TutorSection />
      </section>
    </div>
  );
};

export default Home;
