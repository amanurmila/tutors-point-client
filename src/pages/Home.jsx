import ApprovedSession from "./Home/ApprovedSession";
import BannerSection from "./Home/BannerSection";
import StudySessions from "./Home/StudySessions";

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
    </div>
  );
};

export default Home;
