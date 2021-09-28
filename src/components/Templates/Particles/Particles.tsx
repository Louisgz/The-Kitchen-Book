import React from "react";
import TsParticles from "react-tsparticles";
import { createStyles, makeStyles } from "@material-ui/core";
import ParticleGreen from "images/Geometric/ParticleGreen.svg";
import ParticleOrange from "images/Geometric/ParticleOrange.svg";

const useStyles = makeStyles(() =>
  createStyles({
    particles: {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      zIndex: -1,
    },
  })
);

const Particles: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TsParticles
        id="tsparticles"
        className={classes.particles}
        options={{
          fpsLimit: 60,
          interactivity: {
            detectsOn: "parent",
            events: {
              onClick: {
                enable: true,
                mode: "repulse",
              },
              onHover: {
                enable: false,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 15,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#65BC30",
            },
            links: {
              enable: false,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: true,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 15,
            },
            opacity: {
              value: 1,
            },
            shape: {
              type: "image",
              options: {
                images: [
                  {
                    src: ParticleGreen,
                  },
                  {
                    src: ParticleOrange,
                  },
                ],
              },
            },
            size: {
              random: {
                enable: true,
                minimumValue: 5,
              },
              value: 15,
            },
          },
          detectRetina: true,
        }}
      />
    </React.Fragment>
  );
};

export default Particles;
