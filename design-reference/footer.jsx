import React from 'react';
type LayerValue = string | number;
const absoluteLayer = (left: LayerValue, top: LayerValue, width: LayerValue, height: LayerValue, style: React.CSSProperties = {}): React.CSSProperties => ({
  position: "absolute",
  left,
  top,
  width,
  height,
  ...style
});
const rootLayer = (width: LayerValue, height: LayerValue, style: React.CSSProperties = {}): React.CSSProperties => ({
  position: "relative",
  width,
  height,
  ...style
});
const text1: React.CSSProperties = {
  whiteSpace: "pre-wrap",
  lineHeight: "20px"
};
const col1: React.CSSProperties = {
  display: "flex",
  flexDirection: "column"
};
const surface1: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0)",
  isolation: "isolate"
};
const font_Manrope: React.CSSProperties = {
  color: "#000000",
  fontFamily: "'Manrope', system-ui, sans-serif",
  fontWeight: 400
};
const font_Inter: React.CSSProperties = {
  color: "#000000",
  whiteSpace: "pre",
  fontFamily: "'Inter', system-ui, sans-serif",
  fontWeight: 700,
  lineHeight: "20px",
  letterSpacing: "0.7px",
  textTransform: "uppercase"
};
function EmHRMS(p: {
  "data-figma-id": string;
  fontSize: number;
  text: string;
}) {
  return <span data-figma-id={p["data-figma-id"]} style={{
    ...font_Manrope,
    ...text1,
    fontSize: p.fontSize,
    minWidth: 0,
    position: "relative",
    height: 24,
    flexShrink: 0,
    alignSelf: "stretch"
  }}>
      {p.text}
    </span>;
}
export function FooterGradient() {
  return <div data-figma-id="698:782" style={rootLayer("100%", 446, {
    background: "linear-gradient(#efb000, #efb000)",
    backgroundColor: "rgba(0, 0, 0, 0)",
    isolation: "isolate",
    ...col1,
    minWidth: 0,
    padding: "1px 80px 0",
    boxSizing: "border-box",
    gap: 1.3
  })}>
    <div data-figma-id="698:783" style={{
      ...surface1,
      minWidth: 0,
      position: "relative",
      height: 380,
      flexShrink: 0,
      alignSelf: "stretch"
    }}>
      <div data-figma-id="698:784" style={absoluteLayer(20, 64, 313, 252, surface1)}>
        <div data-figma-id="698:785" style={absoluteLayer(-39, -8, 259, 260, {
          background: "url(\"https://storage.googleapis.com/storage.magicpath.ai/user/415679721544753152/figma-assets/2596633a-5cbb-4602-a6a0-0b90f54ea2d7.png\")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          aspectRatio: "367 / 368"
        })} />
      </div>
      <div data-figma-id="698:786" style={absoluteLayer(381.1, 64, 261, 252, {
        ...surface1,
        ...col1,
        padding: "0 0 22px",
        boxSizing: "border-box",
        gap: 16
      })}>
        <span data-figma-id="698:787" style={{
          ...font_Inter,
          fontSize: 14.021,
          minWidth: 0,
          position: "relative",
          height: 20,
          flexShrink: 0,
          alignSelf: "stretch"
        }}>
          {"Products"}
        </span>
        <div data-figma-id="698:788" style={{
          ...surface1,
          ...col1,
          minWidth: 0,
          gap: 10,
          position: "relative",
          height: 194,
          flexShrink: 0,
          alignSelf: "stretch"
        }}>
          <EmHRMS data-figma-id="698:789" fontSize={13.918} text="emHRMS" />
          <EmHRMS data-figma-id="698:790" fontSize={13.86} text="emCLMS" />
          <EmHRMS data-figma-id="698:791" fontSize={13.878} text="emPayroll" />
          <EmHRMS data-figma-id="698:792" fontSize={13.862} text="emWorkForce" />
          <EmHRMS data-figma-id="698:793" fontSize={13.859} text="emVisit" />
          <EmHRMS data-figma-id="698:794" fontSize={13.919} text="emMeal" />
        </div>
      </div>
      <div data-figma-id="698:795" style={absoluteLayer(690.1, 64, 261, 252, {
        ...surface1,
        ...col1,
        padding: "0 0 22px",
        boxSizing: "border-box",
        gap: 16
      })}>
        <span data-figma-id="698:796" style={{
          ...font_Inter,
          fontSize: 14.062,
          minWidth: 0,
          position: "relative",
          height: 20,
          flexShrink: 0,
          alignSelf: "stretch"
        }}>
          {"Company"}
        </span>
        <div data-figma-id="698:797" style={{
          ...surface1,
          ...col1,
          minWidth: 0,
          gap: 10,
          position: "relative",
          height: 194,
          flexShrink: 0,
          alignSelf: "stretch"
        }}>
          <EmHRMS data-figma-id="698:798" fontSize={13.954} text="Home" />
          <EmHRMS data-figma-id="698:799" fontSize={13.847} text="About Us" />
          <EmHRMS data-figma-id="698:800" fontSize={13.943} text="Clients" />
          <EmHRMS data-figma-id="698:801" fontSize={13.955} text="Testimonials" />
          <EmHRMS data-figma-id="698:802" fontSize={13.915} text="Blogs" />
          <EmHRMS data-figma-id="698:803" fontSize={13.876} text="Contact Us" />
        </div>
      </div>
      <div data-figma-id="698:804" style={absoluteLayer(999, 64, 261, 252, {
        ...surface1,
        ...col1,
        padding: "0 0 56px",
        boxSizing: "border-box",
        gap: 16
      })}>
        <span data-figma-id="698:805" style={{
          ...font_Inter,
          fontSize: 14.04,
          minWidth: 0,
          position: "relative",
          height: 20,
          flexShrink: 0,
          alignSelf: "stretch"
        }}>
          {"Solutions"}
        </span>
        <div data-figma-id="698:806" style={{
          ...surface1,
          ...col1,
          minWidth: 0,
          gap: 10,
          position: "relative",
          height: 160,
          flexShrink: 0,
          alignSelf: "stretch"
        }}>
          <EmHRMS data-figma-id="698:807" fontSize={13.937} text={"Onboarding & Gatepass"} />
          <EmHRMS data-figma-id="698:808" fontSize={13.943} text="Contract Labour Management" />
          <EmHRMS data-figma-id="698:809" fontSize={13.959} text="Workforce Management" />
          <EmHRMS data-figma-id="698:810" fontSize={13.907} text="Visitor Management" />
          <EmHRMS data-figma-id="698:811" fontSize={13.935} text="Canteen Management" />
        </div>
      </div>
    </div>
    <div data-figma-id="698:812" style={{
      ...surface1,
      minWidth: 0,
      position: "relative",
      height: 64,
      flexShrink: 0,
      alignSelf: "stretch"
    }}>
      <span data-figma-id="698:813" style={absoluteLayer(20, 24, 283, 16, {
        ...font_Manrope,
        whiteSpace: "pre",
        fontSize: 11.964,
        lineHeight: "16.343px"
      })}>
        {"© 2026 Emsphere Technologies. All rights reserved."}
      </span>
      <div data-figma-id="698:814" style={absoluteLayer(1093.5, 24, 166, 16, surface1)}>
        <span data-figma-id="698:815" style={absoluteLayer(0, 0, 75, 16, {
          ...font_Manrope,
          whiteSpace: "pre",
          fontSize: 11.93,
          lineHeight: "16.296px"
        })}>
          {"Privacy Policy"}
        </span>
        <span data-figma-id="698:816" style={absoluteLayer(94.6, 0, 72, 16, {
          ...font_Manrope,
          whiteSpace: "pre",
          fontSize: 11.984,
          lineHeight: "16.371px"
        })}>
          {"Terms of Use"}
        </span>
      </div>
    </div>
  </div>;
}
export default FooterGradient;