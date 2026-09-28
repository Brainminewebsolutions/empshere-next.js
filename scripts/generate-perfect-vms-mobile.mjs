import fs from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";
import sharp from "sharp";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

// Read official emsphere logo and convert to base64 data URI
const logoBuffer = fs.readFileSync("public/universal-images/header/emsphere-technologies-logo.webp");
const logoBase64 = `data:image/webp;base64,${logoBuffer.toString("base64")}`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: transparent;
    width: 1100px;
    height: 1220px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  .stage {
    position: relative;
    width: 920px;
    height: 1080px;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 2200px;
  }

  /* Ground Ambient Glow */
  .ambient-glow {
    position: absolute;
    width: 580px;
    height: 700px;
    left: 170px;
    top: 140px;
    background: radial-gradient(circle at 50% 50%, rgba(0, 159, 227, 0.22) 0%, rgba(2, 132, 199, 0.08) 50%, transparent 74%);
    filter: blur(50px);
    pointer-events: none;
    z-index: 1;
  }

  /* Realistic Ground Contact Shadow */
  .ground-shadow {
    position: absolute;
    width: 420px;
    height: 80px;
    bottom: 50px;
    left: 250px;
    background: radial-gradient(ellipse at 50% 50%, rgba(15, 23, 42, 0.36) 0%, rgba(15, 23, 42, 0.12) 48%, transparent 72%);
    filter: blur(16px);
    transform: rotate(-3deg);
    z-index: 1;
  }

  /* 3D Phone Container (balanced, elegant perspective) */
  .phone-3d-wrap {
    position: relative;
    width: 388px;
    height: 800px;
    transform-style: preserve-3d;
    transform: rotateX(10deg) rotateY(-14deg) rotateZ(4.5deg);
    z-index: 2;
  }

  /* Physical Side Buttons */
  .btn-power {
    position: absolute;
    right: -4px;
    top: 190px;
    width: 4px;
    height: 64px;
    background: linear-gradient(180deg, #475569, #1e293b);
    border-radius: 0 3px 3px 0;
  }
  .btn-vol-up {
    position: absolute;
    left: -4px;
    top: 165px;
    width: 4px;
    height: 52px;
    background: linear-gradient(180deg, #475569, #1e293b);
    border-radius: 3px 0 0 3px;
  }
  .btn-vol-down {
    position: absolute;
    left: -4px;
    top: 230px;
    width: 4px;
    height: 52px;
    background: linear-gradient(180deg, #475569, #1e293b);
    border-radius: 3px 0 0 3px;
  }

  /* Phone Outer Chassis - Titanium Space Black */
  .phone-body {
    position: relative;
    width: 100%;
    height: 100%;
    background: #090e17;
    border-radius: 56px;
    padding: 12px;
    box-shadow:
      -18px 36px 60px -12px rgba(15, 23, 42, 0.44),
      -8px 14px 26px -6px rgba(0, 0, 0, 0.3),
      inset 0 0 0 1.5px rgba(255, 255, 255, 0.3),
      inset 0 0 0 4px #1e293b,
      inset 0 0 0 7px #090e17;
    overflow: hidden;
  }

  /* Phone Outer Chamfer Rim */
  .phone-rim {
    position: absolute;
    inset: 0;
    border-radius: 56px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    pointer-events: none;
    z-index: 10;
  }

  /* Phone Screen Glass */
  .phone-screen {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f8fafc;
    border-radius: 46px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  /* Glass Specular Sheen */
  .screen-sheen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.36) 0%, rgba(255, 255, 255, 0.04) 50%, transparent 100%);
    pointer-events: none;
    z-index: 9;
  }

  /* 1. iOS Status Bar */
  .status-bar {
    position: relative;
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 24px 0 24px;
    z-index: 8;
  }
  .status-time {
    font-size: 13px;
    font-weight: 800;
    color: #0f172a;
    font-family: 'Inter', sans-serif;
  }
  .dynamic-island {
    position: absolute;
    left: 50%;
    top: 9px;
    transform: translateX(-50%);
    width: 102px;
    height: 25px;
    background: #090e17;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 14px;
    gap: 7px;
    z-index: 8;
  }
  .camera-lens {
    width: 8.5px;
    height: 8.5px;
    border-radius: 50%;
    background: #1e293b;
    border: 1px solid #0284c7;
    box-shadow: inset 0 0 3px #0284c7;
  }
  .sensor-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #334155;
  }
  .status-icons {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #0f172a;
  }

  /* 2. App Top Header */
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 18px 6px 18px;
    z-index: 7;
  }
  .company-logo {
    width: 140px;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 119, 194, 0.1));
  }
  .header-actions {
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .live-pill {
    display: flex;
    align-items: center;
    gap: 4px;
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #059669;
    font-size: 8.5px;
    font-weight: 800;
    padding: 2.5px 7px;
    border-radius: 12px;
    letter-spacing: 0.04em;
  }
  .live-pulse {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 6px #10b981;
  }
  .avatar-circle {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #009fe3 0%, #0077c2 100%);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
    box-shadow: 0 2px 6px rgba(0, 119, 194, 0.25);
  }

  /* 3. Location Bar */
  .location-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 18px 8px 18px;
    padding: 5px 10px;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    z-index: 6;
  }
  .loc-text {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 9.5px;
    font-weight: 700;
    color: #334155;
  }
  .loc-date {
    font-size: 8.5px;
    font-weight: 600;
    color: #64748b;
  }

  /* 4. Dashboard Scroll Container */
  .dashboard-content {
    flex: 1;
    padding: 0 18px;
    display: flex;
    flex-direction: column;
    gap: 9px;
    z-index: 6;
    overflow: hidden;
  }

  /* HERO METRIC ROW: 108 Visitors & 75% Check-In Rate */
  .hero-metric-card {
    background: linear-gradient(135deg, #0077c2 0%, #005691 100%);
    border-radius: 18px;
    padding: 12px 14px;
    color: #ffffff;
    box-shadow: 0 8px 22px -4px rgba(0, 119, 194, 0.35);
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 8px;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .hero-card-sheen {
    position: absolute;
    right: -25px;
    top: -25px;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Left Half: 108 Visitors */
  .metric-left {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .metric-badge-row {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .metric-label-tag {
    font-size: 8.5px;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: #bae6fd;
    text-transform: uppercase;
  }
  .metric-growth-pill {
    background: rgba(16, 185, 129, 0.25);
    border: 1px solid rgba(16, 185, 129, 0.5);
    color: #6ee7b7;
    font-size: 8px;
    font-weight: 800;
    padding: 1px 5px;
    border-radius: 8px;
  }
  .metric-number-row {
    display: flex;
    align-items: baseline;
    gap: 5px;
  }
  .metric-large-num {
    font-size: 34px;
    font-weight: 900;
    line-height: 1;
    color: #ffffff;
    letter-spacing: -0.03em;
  }
  .metric-large-unit {
    font-size: 11px;
    font-weight: 700;
    color: #e0f2fe;
  }
  .metric-sub-note {
    font-size: 8px;
    color: #bae6fd;
    font-weight: 600;
  }

  /* Right Half: 75% Check-In Donut */
  .metric-right {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 14px;
    padding: 8px 10px;
    backdrop-filter: blur(8px);
  }
  .donut-box {
    position: relative;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
  }
  .donut-box svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .donut-bg {
    fill: none;
    stroke: rgba(255, 255, 255, 0.25);
    stroke-width: 5;
  }
  .donut-fg {
    fill: none;
    stroke: #f8bb18;
    stroke-width: 5;
    stroke-linecap: round;
    stroke-dasharray: 138;
    stroke-dashoffset: 34.5; /* 75% */
  }
  .donut-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12.5px;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -0.02em;
  }
  .donut-stats {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .donut-stats-title {
    font-size: 9px;
    font-weight: 800;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .donut-stats-detail {
    font-size: 8px;
    font-weight: 600;
    color: #bae6fd;
    line-height: 1.25;
  }

  /* CARD 2: WEEKLY VISITOR TRAFFIC (Smooth Wave Chart with S M T W T F S) */
  .card-analytics {
    background: #ffffff;
    border-radius: 18px;
    padding: 10px 14px 8px 14px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .card-head-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-head-title {
    font-size: 9.5px;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: #0f172a;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .title-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #009fe3;
  }
  .card-head-tag {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    color: #0284c7;
    font-size: 8.5px;
    font-weight: 700;
    padding: 1.5px 6px;
    border-radius: 8px;
  }

  .wave-chart-svg-wrap {
    width: 100%;
    height: 96px;
    position: relative;
  }

  .days-label-row {
    display: flex;
    justify-content: space-between;
    padding: 4px 6px 0 6px;
    border-top: 1px solid #f1f5f9;
  }
  .day-label {
    font-size: 9px;
    font-weight: 800;
    color: #64748b;
  }
  .day-label.today {
    color: #0077c2;
    background: #e0f2fe;
    border-radius: 4px;
    padding: 0 4px;
  }

  /* CARD 3: HOURLY FOOTFALL FLOW (Bar Chart) */
  .card-hourly {
    background: #ffffff;
    border-radius: 18px;
    padding: 10px 14px 8px 14px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .card-tag-peak {
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #059669;
    font-size: 8px;
    font-weight: 800;
    padding: 1.5px 6px;
    border-radius: 8px;
  }

  .hourly-legend-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 8px;
    font-weight: 700;
    color: #64748b;
  }
  .legend-items {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .dot-vis { width: 5px; height: 5px; border-radius: 50%; background: #009fe3; }
  .dot-ctr { width: 5px; height: 5px; border-radius: 50%; background: #f8bb18; }

  .bars-chart-inner {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 70px;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 2px;
  }
  .bar-pair-group {
    display: flex;
    align-items: flex-end;
    gap: 3.5px;
    height: 100%;
  }
  .bar-v {
    width: 6.5px;
    border-radius: 3px 3px 1px 1px;
    background: linear-gradient(180deg, #009fe3 0%, #0284c7 100%);
  }
  .bar-c {
    width: 6.5px;
    border-radius: 3px 3px 1px 1px;
    background: linear-gradient(180deg, #f8bb18 0%, #eab308 100%);
  }

  .hours-label-row {
    display: flex;
    justify-content: space-around;
    font-size: 8px;
    font-weight: 700;
    color: #94a3b8;
    padding-top: 2px;
  }

  /* CARD 4: RECENT VERIFIED VISITOR */
  .card-recent-visitor {
    background: #ffffff;
    border-radius: 14px;
    padding: 7px 11px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .visitor-profile {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .vis-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0284c7 0%, #0077c2 100%);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 800;
  }
  .vis-info {
    display: flex;
    flex-direction: column;
  }
  .vis-name {
    font-size: 9.5px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.15;
  }
  .vis-sub {
    font-size: 7.5px;
    color: #64748b;
    font-weight: 600;
  }
  .vis-status-badge {
    background: #dcfce7;
    border: 1px solid #86efac;
    color: #15803d;
    font-size: 8px;
    font-weight: 800;
    padding: 2.5px 7px;
    border-radius: 8px;
  }

  /* 5. Bottom Navigation Bar */
  .bottom-nav {
    height: 52px;
    background: #ffffff;
    border-top: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 16px 8px 16px;
    position: relative;
    z-index: 7;
  }
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    color: #94a3b8;
    font-size: 8px;
    font-weight: 700;
  }
  .nav-item.active {
    color: #0077c2;
  }
  .nav-indicator {
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 90px;
    height: 4px;
    background: #090e17;
    border-radius: 2px;
  }
</style>
</head>
<body>

<div class="stage">
  <!-- Soft Ambient Glow -->
  <div class="ambient-glow"></div>

  <!-- Realistic Ground Contact Shadow -->
  <div class="ground-shadow"></div>

  <!-- 3D Smartphone Container -->
  <div class="phone-3d-wrap">
    <!-- Physical Side Buttons -->
    <div class="btn-power"></div>
    <div class="btn-vol-up"></div>
    <div class="btn-vol-down"></div>

    <!-- Phone Titanium Chassis -->
    <div class="phone-body">
      <div class="phone-rim"></div>

      <!-- Phone Display -->
      <div class="phone-screen">
        <div class="screen-sheen"></div>

        <!-- 1. Status Bar -->
        <div class="status-bar">
          <span class="status-time">9:41</span>
          <div class="dynamic-island">
            <div class="camera-lens"></div>
            <div class="sensor-dot"></div>
          </div>
          <div class="status-icons">
            <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
              <path d="M1 9h2V2H1v7zm4 0h2V0H5v9zm4 0h2V4H9v5zm4 0h2V6h-2v3z"/>
            </svg>
            <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor">
              <path d="M7 1a6.97 6.97 0 0 1 5 2.15l-1.4 1.4A4.98 4.98 0 0 0 7 3a4.98 4.98 0 0 0-3.6 1.55L2 3.15A6.97 6.97 0 0 1 7 1zm0 4a2.98 2.98 0 0 1 2.12.88l-2.12 2.12-2.12-2.12A2.98 2.98 0 0 1 7 5z"/>
            </svg>
            <svg width="19" height="10" viewBox="0 0 19 10" fill="currentColor">
              <rect x="0" y="0" width="16" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
              <rect x="2" y="2" width="10" height="6" rx="1.5"/>
              <path d="M17 3.5v3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- 2. Logo & App Actions Header -->
        <div class="app-header">
          <img src="${logoBase64}" alt="Emsphere Logo" class="company-logo" />
          <div class="header-actions">
            <div class="live-pill">
              <span class="live-pulse"></span>
              LIVE
            </div>
            <div class="avatar-circle">AD</div>
          </div>
        </div>

        <!-- 3. Location Bar -->
        <div class="location-bar">
          <div class="loc-text">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0077c2" stroke-width="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>HQ Tower · Main Reception</span>
          </div>
          <span class="loc-date">Today, 28 Sep</span>
        </div>

        <!-- 4. Dashboard Content -->
        <div class="dashboard-content">
          <!-- HERO CARD: 108 Visitors + 75% Check-In Donut -->
          <div class="hero-metric-card">
            <div class="hero-card-sheen"></div>
            <!-- Left: 108 Visitors -->
            <div class="metric-left">
              <div class="metric-badge-row">
                <span class="metric-label-tag">Visitors Today</span>
                <span class="metric-growth-pill">▲ +18%</span>
              </div>
              <div class="metric-number-row">
                <span class="metric-large-num">108</span>
                <span class="metric-large-unit">Visitors</span>
              </div>
              <span class="metric-sub-note">81 Checked In · 27 Expected</span>
            </div>

            <!-- Right: 75% Donut -->
            <div class="metric-right">
              <div class="donut-box">
                <svg viewBox="0 0 54 54">
                  <circle cx="27" cy="27" r="22" class="donut-bg" />
                  <circle cx="27" cy="27" r="22" class="donut-fg" />
                </svg>
                <div class="donut-text">75%</div>
              </div>
              <div class="donut-stats">
                <span class="donut-stats-title">Checked In</span>
                <span class="donut-stats-detail">Active on premises</span>
              </div>
            </div>
          </div>

          <!-- CARD 2: WEEKLY VISITOR TRAFFIC (Smooth Wave Chart) -->
          <div class="card-analytics">
            <div class="card-head-row">
              <div class="card-head-title">
                <span class="title-dot"></span>
                Weekly Lobby Traffic
              </div>
              <span class="card-head-tag">+24% vs Last Week</span>
            </div>
            <div class="wave-chart-svg-wrap">
              <svg viewBox="0 0 280 96" preserveAspectRatio="none" style="width: 100%; height: 100%;">
                <defs>
                  <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#009fe3" stop-opacity="0.32" />
                    <stop offset="60%" stop-color="#0077c2" stop-opacity="0.1" />
                    <stop offset="100%" stop-color="#0284c7" stop-opacity="0.0" />
                  </linearGradient>
                  <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#38bdf8" />
                    <stop offset="50%" stop-color="#009fe3" />
                    <stop offset="100%" stop-color="#0077c2" />
                  </linearGradient>
                </defs>

                <!-- Subtle horizontal grid lines -->
                <line x1="0" y1="24" x2="280" y2="24" stroke="#f1f5f9" stroke-width="1" />
                <line x1="0" y1="48" x2="280" y2="48" stroke="#f1f5f9" stroke-width="1" />
                <line x1="0" y1="72" x2="280" y2="72" stroke="#f1f5f9" stroke-width="1" />

                <!-- Filled Wave Area -->
                <path
                  d="M 10 68 C 35 72, 55 48, 75 40 C 100 30, 120 66, 145 58 C 170 50, 195 22, 220 20 C 245 18, 260 46, 275 42 L 275 96 L 10 96 Z"
                  fill="url(#waveFill)"
                />

                <!-- Wave Stroke Line -->
                <path
                  d="M 10 68 C 35 72, 55 48, 75 40 C 100 30, 120 66, 145 58 C 170 50, 195 22, 220 20 C 245 18, 260 46, 275 42"
                  stroke="url(#waveStroke)"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                />

                <!-- Data Points -->
                <circle cx="75" cy="40" r="3" fill="#009fe3" stroke="#ffffff" stroke-width="1.5" />
                <circle cx="145" cy="58" r="3" fill="#0077c2" stroke="#ffffff" stroke-width="1.5" />
                <circle cx="220" cy="20" r="4.5" fill="#f8bb18" stroke="#ffffff" stroke-width="2" />
              </svg>
            </div>
            <div class="days-label-row">
              <span class="day-label">S</span>
              <span class="day-label">M</span>
              <span class="day-label">T</span>
              <span class="day-label">W</span>
              <span class="day-label today">T</span>
              <span class="day-label">F</span>
              <span class="day-label">S</span>
            </div>
          </div>

          <!-- CARD 3: HOURLY FOOTFALL FLOW (Bar Chart) -->
          <div class="card-hourly">
            <div class="card-head-row">
              <div class="card-head-title">
                <span class="title-dot" style="background: #f8bb18;"></span>
                Hourly Footfall Flow
              </div>
              <span class="card-tag-peak">Peak: 11:30 AM</span>
            </div>
            <div class="hourly-legend-row">
              <span>Arrivals by Time Slot</span>
              <div class="legend-items">
                <div class="legend-item"><span class="dot-vis"></span> Visitors</div>
                <div class="legend-item"><span class="dot-ctr"></span> Vendors</div>
              </div>
            </div>
            <div class="bars-chart-inner">
              <!-- 9 AM -->
              <div class="bar-pair-group">
                <div class="bar-v" style="height: 32px;"></div>
                <div class="bar-c" style="height: 18px;"></div>
              </div>
              <!-- 11 AM (Peak) -->
              <div class="bar-pair-group">
                <div class="bar-v" style="height: 60px;"></div>
                <div class="bar-c" style="height: 38px;"></div>
              </div>
              <!-- 1 PM -->
              <div class="bar-pair-group">
                <div class="bar-v" style="height: 42px;"></div>
                <div class="bar-c" style="height: 24px;"></div>
              </div>
              <!-- 3 PM -->
              <div class="bar-pair-group">
                <div class="bar-v" style="height: 48px;"></div>
                <div class="bar-c" style="height: 20px;"></div>
              </div>
              <!-- 5 PM -->
              <div class="bar-pair-group">
                <div class="bar-v" style="height: 36px;"></div>
                <div class="bar-c" style="height: 28px;"></div>
              </div>
              <!-- 7 PM -->
              <div class="bar-pair-group">
                <div class="bar-v" style="height: 20px;"></div>
                <div class="bar-c" style="height: 12px;"></div>
              </div>
            </div>
            <div class="hours-label-row">
              <span>9 AM</span>
              <span>11 AM</span>
              <span>1 PM</span>
              <span>3 PM</span>
              <span>5 PM</span>
              <span>7 PM</span>
            </div>
          </div>

          <!-- CARD 4: RECENT VERIFIED VISITOR -->
          <div class="card-recent-visitor">
            <div class="visitor-profile">
              <div class="vis-avatar">AR</div>
              <div class="vis-info">
                <span class="vis-name">Alex Rivera · TechCorp</span>
                <span class="vis-sub">Digital Pass #EMS-8041 · Gate 1 (10:45 AM)</span>
              </div>
            </div>
            <span class="vis-status-badge">● Inside</span>
          </div>
        </div>

        <!-- 5. Bottom Navigation Bar -->
        <div class="bottom-nav">
          <div class="nav-item active">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            <span>Overview</span>
          </div>
          <div class="nav-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Visitors</span>
          </div>
          <div class="nav-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M7 7h3v3H7zm7 0h3v3h-3zm-7 7h3v3H7zm7 7v-3h3v3"/>
            </svg>
            <span>E-Pass</span>
          </div>
          <div class="nav-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            <span>Security</span>
          </div>
          <div class="nav-indicator"></div>
        </div>
      </div>
    </div>
  </div>
</div>

</body>
</html>
`;

const tmpHtml = path.join(os.tmpdir(), "temp-vms-mobile.html");
const tmpPng = path.join(os.tmpdir(), "temp-vms-mobile.png");

fs.writeFileSync(tmpHtml, html, "utf8");
console.log("Written", tmpHtml);

const cmd = `"${EDGE_PATH}" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=1100,1220 --default-background-color=00000000 --screenshot="${tmpPng}" "file://${tmpHtml.replace(/\\/g, "/")}"`;
execSync(cmd, { stdio: "inherit" });
console.log("Rendered", tmpPng);

async function processImage() {
  const metadata = await sharp(tmpPng).metadata();
  console.log("Rendered image size:", metadata.width, metadata.height);

  const trimmed = await sharp(tmpPng)
    .trim({ threshold: 5 })
    .webp({ quality: 96, lossless: false, effort: 6 })
    .toBuffer();

  const finalInfo = await sharp(trimmed).metadata();
  console.log("Trimmed final size:", finalInfo.width, finalInfo.height);

  const destPath = path.resolve("app/images/visitor-management-system/visitor-analytics-mobile-app-dashboard.webp");
  fs.writeFileSync(destPath, trimmed);
  console.log("Successfully updated", destPath);

  if (fs.existsSync(tmpHtml)) fs.unlinkSync(tmpHtml);
  if (fs.existsSync(tmpPng)) fs.unlinkSync(tmpPng);
}

processImage().catch(console.error);
