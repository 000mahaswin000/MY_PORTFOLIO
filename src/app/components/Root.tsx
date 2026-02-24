import { SpaceBackground } from './SpaceBackground';
import { CometCursor } from './CometCursor';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { SectionDivider } from './SectionDivider';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Skills } from '../pages/Skills';
import { Academics } from '../pages/Academics';
import { Projects } from '../pages/Projects';
import { Contact } from '../pages/Contact';

export function Root() {
  return (
    <div
      style={{
        position: 'relative',
        background: '#000010',
      }}
    >
      <SpaceBackground />
      <CometCursor />
      <Navigation />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 64,
        }}
      >
        <section id="home">
          <Home />
        </section>

        <SectionDivider color="purple" />

        <section id="about">
          <About />
        </section>

        <SectionDivider color="cyan" />

        <section id="skills">
          <Skills />
        </section>

        <SectionDivider color="purple" />

        <section id="academics">
          <Academics />
        </section>

        <SectionDivider color="cyan" />

        <section id="projects">
          <Projects />
        </section>

        <SectionDivider color="rose" />

        <section id="contact">
          <Contact />
        </section>

        <Footer />
      </div>

      <BackToTop />
    </div>
  );
}
