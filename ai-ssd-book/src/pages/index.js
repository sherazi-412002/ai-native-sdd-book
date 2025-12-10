import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--dark', styles.heroBanner)}>
      <div className="container">

        <h1
          className={styles.heroTitle}
          style={{
            color: '#ffffff',
            fontWeight: '700',
            textShadow: '0px 0px 10px rgba(255,255,255,0.6)',
          }}
        >
          Physical AI & Humanoid Robotics
        </h1>

        <p
          className={styles.heroSubtitle}
          style={{
            color: '#cfcfcf',
            fontSize: '1.2rem',
            marginTop: '0.5rem',
            textShadow: '0px 0px 6px rgba(200,200,200,0.4)',
          }}
        >
          Modules: The Robotic Nervous System (ROS 2) • The Digital Twin (Gazebo & Unity) •
          The AI Robot Brain (NVIDIA Isaac VLA)
        </p>

        <div style={{ marginTop: '2rem' }}>
          <Link
            className="button button--primary button--lg"
            style={{
              backgroundColor: '#00e5ff',
              color: '#000',
              borderRadius: '10px',
              padding: '12px 28px',
              fontWeight: '700',
              boxShadow: '0 0 15px rgba(0,229,255,0.8)',
            }}
            to="/docs/introduction"
          >
            Start Learning
          </Link>
        </div>

      </div>
    </header>
  );
}

function ExploreModules() {
  return (
    <section className={styles.modulesSection}>
      <div className="container">
        <h2 className={styles.modulesTitle}>Explore Modules</h2>

        <div className={styles.modulesGrid}>

          <div className={styles.moduleCard}>
            <h3>Robotic Nervous System</h3>
            <p>Learn ROS 2, movement control, and sensory architecture.</p>
          </div>

          <div className={styles.moduleCard}>
            <h3>Digital Twin</h3>
            <p>Simulate robots in Gazebo and Unity with real-world accuracy.</p>
          </div>

          <div className={styles.moduleCard}>
            <h3>AI Robot Brain</h3>
            <p>Use NVIDIA Isaac VLA for modern robot intelligence.</p>
          </div>

          <div className={styles.moduleCard}>
            <h3>Humanoid Locomotion</h3>
            <p>Master balance, walking, actuators, and motion control.</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout>
      <HomepageHeader />
      <ExploreModules />
    </Layout>
  );
}
