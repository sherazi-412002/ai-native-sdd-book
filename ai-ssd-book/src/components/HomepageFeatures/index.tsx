import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Module 1: The Robotic Nervous System (ROS 2)',
    description: (
      <>
        Learn about ROS 2, the de facto robotic nervous system, core concepts, and how to build robust robotic applications.
      </>
    ),
    link: '/docs/module1',
  },
  {
    title: 'Module 2: The Digital Twin (Gazebo & Unity)',
    description: (
      <>
        Understand digital twins in robotics, Gazebo physics simulation, and Unity integration for high-fidelity visualization.
      </>
    ),
    link: '/docs/module2',
  },
  {
    title: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
    description: (
      <>
        Explore NVIDIA Isaac platform, SDK basics, and robotics applications for perception, navigation, and manipulation.
      </>
    ),
    link: '/docs/module3-isaac',
  },
  {
    title: 'Module 4: Vision-Language-Action (VLA)',
    description: (
      <>
        Master Vision-Language-Action systems for humanoid robotics, cognitive planning, and complete VLA capstone implementation.
      </>
    ),
    link: '/docs/module4-vla',
  },
];

function Feature({title, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link className="button button--secondary button--lg" to={link}>
          Explore Module
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
