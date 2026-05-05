import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Homepage } from "./components/pages/Homepage";
import { Articles } from "./components/pages/Articles";
import { ThreatHierarchy } from "./components/pages/ThreatHierarchy";
import { SocialEngineering } from "./components/pages/threats/SocialEngineering";
import { AIFraud } from "./components/pages/threats/AIFraud";
import { OSINT } from "./components/pages/threats/OSINT";
import { OWASPThreatMap } from "./components/pages/OWASPThreatMap";
import { SQLInjection } from "./components/pages/owasp/SQLInjection";
import { BrokenAccessControl } from "./components/pages/owasp/BrokenAccessControl";
import { CryptographicFailures } from "./components/pages/owasp/CryptographicFailures";
import { SecurityMisconfiguration } from "./components/pages/owasp/SecurityMisconfiguration";
import { MishandlingExceptions } from "./components/pages/owasp/MishandlingExceptions";
import { InsecureDesign } from "./components/pages/owasp/InsecureDesign";
import { SoftwareSupplyChain } from "./components/pages/owasp/SoftwareSupplyChain";
import { AuthenticationFailures } from "./components/pages/owasp/AuthenticationFailures";
import { DataIntegrityFailures } from "./components/pages/owasp/DataIntegrityFailures";
import { SecurityLoggingFailures } from "./components/pages/owasp/SecurityLoggingFailures";

// Router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Homepage },
      { path: "articles", Component: Articles },
      { path: "threats", Component: ThreatHierarchy },
      { path: "threats/social-engineering", Component: SocialEngineering },
      { path: "threats/ai-fraud", Component: AIFraud },
      { path: "threats/osint", Component: OSINT },
      { path: "owasp-lab", Component: OWASPThreatMap },
      { path: "owasp-lab/threat-map", Component: OWASPThreatMap },
      { path: "owasp-lab/broken-access", Component: BrokenAccessControl },
      { path: "owasp-lab/cryptographic-failures", Component: CryptographicFailures },
      { path: "owasp-lab/sql-injection", Component: SQLInjection },
      { path: "owasp-lab/insecure-design", Component: InsecureDesign },
      { path: "owasp-lab/security-misconfiguration", Component: SecurityMisconfiguration },
      { path: "owasp-lab/software-supply-chain", Component: SoftwareSupplyChain },
      { path: "owasp-lab/authentication-failures", Component: AuthenticationFailures },
      { path: "owasp-lab/data-integrity", Component: DataIntegrityFailures },
      { path: "owasp-lab/security-logging", Component: SecurityLoggingFailures },
      { path: "owasp-lab/mishandling-exceptions", Component: MishandlingExceptions },
    ],
  },
]);
