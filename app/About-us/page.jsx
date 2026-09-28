import React from 'react';
import BackToTop from "@/components/BackToTop";

export default function AboutUsPage() {
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f7f7f7',
      padding: '4rem 1rem',
      fontFamily: 'inherit'
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#4c4c4c',
      marginBottom: '1rem',
      marginTop: '0'
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#666',
      lineHeight: '1.6'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      maxWidth: '1100px',
      margin: '0 auto'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column'
    },
    cardTitle: {
      fontSize: '1.5rem',
      color: '#333',
      marginBottom: '1rem',
      marginTop: '0'
    },
    placeholderImage: {
      width: '100%',
      height: '160px',
      backgroundColor: '#f3f4f6',
      border: '2px dashed #d1d5db',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9ca3af',
      marginBottom: '1.5rem',
      fontWeight: '500'
    },
    valuesList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    valueItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      backgroundColor: 'rgba(248, 187, 24, 0.1)',
      padding: '1rem',
      borderRadius: '8px',
      color: '#555'
    },
    valueNumber: {
      width: '32px',
      height: '32px',
      backgroundColor: '#f8bb18',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      flexShrink: '0'
    },
    teamSection: {
      maxWidth: '1100px',
      margin: '4rem auto 0',
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      textAlign: 'center'
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    },
    teamMember: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      width: '96px',
      height: '96px',
      borderRadius: '50%',
      backgroundColor: '#e5e7eb',
      border: '2px dashed #d1d5db',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9ca3af',
      marginBottom: '1rem'
    },
    memberName: {
      fontWeight: '600',
      color: '#333',
      margin: '0 0 0.25rem 0'
    },
    memberRole: {
      fontSize: '0.875rem',
      color: '#0077c2',
      margin: '0'
    }
  };

  return (
    <main style={styles.container}>
      {/* Page Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>About Us</h1>
        <p style={styles.subtitle}>
          Welcome to the about page. This is a temporary layout using standard React inline CSS where you can add your company&apos;s story, mission, and team details later.
        </p>
      </div>

      {/* Main Content Area */}
      <div style={styles.contentGrid}>
        
        {/* Placeholder 1 */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Our Story</h2>
          <div style={styles.placeholderImage}>
            <span>Image/Video Placeholder</span>
          </div>
          <p style={{ ...styles.subtitle, textAlign: 'center', fontSize: '1rem', marginTop: 0 }}>
            You can add your company&apos;s history and background information here.
          </p>
        </div>

        {/* Placeholder 2 */}
        <div style={styles.card}>
          <h2 style={{ ...styles.cardTitle, textAlign: 'center' }}>Our Mission & Values</h2>
          <ul style={styles.valuesList}>
            <li style={styles.valueItem}>
              <span style={styles.valueNumber}>1</span>
              <span>Value Point 1 Placeholder</span>
            </li>
            <li style={styles.valueItem}>
              <span style={styles.valueNumber}>2</span>
              <span>Value Point 2 Placeholder</span>
            </li>
            <li style={styles.valueItem}>
              <span style={styles.valueNumber}>3</span>
              <span>Value Point 3 Placeholder</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Team Section Placeholder */}
      <div style={styles.teamSection}>
        <h2 style={styles.cardTitle}>Meet Our Team</h2>
        <div style={styles.teamGrid}>
          {[1, 2, 3].map((item) => (
            <div key={item} style={styles.teamMember}>
              <div style={styles.avatar}>
                 <span style={{ fontSize: '0.75rem' }}>Photo</span>
              </div>
              <h3 style={styles.memberName}>Team Member Name</h3>
              <p style={styles.memberRole}>Position / Role</p>
            </div>
          ))}
        </div>
      </div>
      <BackToTop />
    </main>
  );
}
