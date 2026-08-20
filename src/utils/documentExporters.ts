import { hostingGuideSteps, personalInfo, educationData, undergradEducationData, vtuTranscriptData } from '../data/portfolioData';

/**
 * Generates and triggers the download of an authentic Microsoft Word compatible (.doc) document
 * containing the full hosting, deployment, git, and Formspree guidance.
 */
export function downloadHostingGuidanceWordDoc() {
  const docHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Website Hosting & Deployment Guidance - Sagar Gurung</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body {
      font-family: 'Segoe UI', Calibri, Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1e293b;
      margin: 36pt 48pt;
    }
    h1 {
      font-size: 22pt;
      color: #0f172a;
      border-bottom: 2pt solid #0284c7;
      padding-bottom: 6pt;
      margin-bottom: 12pt;
    }
    h2 {
      font-size: 15pt;
      color: #0369a1;
      margin-top: 18pt;
      margin-bottom: 8pt;
      border-bottom: 1pt solid #cbd5e1;
      padding-bottom: 4pt;
    }
    h3 {
      font-size: 12pt;
      color: #334155;
      margin-top: 12pt;
      margin-bottom: 4pt;
    }
    p, li {
      font-size: 10.5pt;
      color: #334155;
    }
    .callout {
      background-color: #f0f9ff;
      border-left: 4pt solid #0284c7;
      padding: 10pt 14pt;
      margin: 12pt 0;
      border-radius: 4pt;
    }
    .code-block {
      font-family: 'Consolas', 'Courier New', monospace;
      background-color: #0f172a;
      color: #38bdf8;
      padding: 10pt 14pt;
      border-radius: 4pt;
      font-size: 9.5pt;
      line-height: 1.4;
      margin: 8pt 0;
      white-space: pre-wrap;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12pt 0;
    }
    th, td {
      border: 1pt solid #cbd5e1;
      padding: 6pt 10pt;
      font-size: 10pt;
      text-align: left;
    }
    th {
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: bold;
    }
    .footer-note {
      margin-top: 30pt;
      padding-top: 10pt;
      border-top: 1pt solid #e2e8f0;
      font-size: 9pt;
      color: #64748b;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>WEBSITE HOSTING & DEPLOYMENT GUIDANCE</h1>
  <p><strong>Prepared for Website Owner:</strong> ${personalInfo.name} (${personalInfo.email})</p>
  <p><strong>Portfolio Version:</strong> Electrical Engineering & Systems Management Platform (React 18 + Vite + TypeScript)</p>
  <p><strong>Date Generated:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

  <div class="callout">
    <strong>Executive Purpose:</strong> This complete engineering guidance document outlines step-by-step instructions for hosting, configuring custom domains, managing document transcripts, and connecting contact form notifications for your personal professional portfolio website.
  </div>

  <h2>1. Project Structure & Prerequisites</h2>
  <p>Your portfolio is built using modern industry standards: React 18, TypeScript, Tailwind CSS, and Vite. It compiles into static HTML/CSS/JS files inside the <code>dist/</code> directory upon running <code>npm run build</code>.</p>
  
  <table>
    <tr>
      <th>Tool / Requirement</th>
      <th>Recommended Version</th>
      <th>Purpose</th>
    </tr>
    <tr>
      <td><strong>Node.js</strong></td>
      <td>v18.x or v20.x LTS</td>
      <td>JavaScript runtime environment</td>
    </tr>
    <tr>
      <td><strong>NPM / PNPM</strong></td>
      <td>v9.x or later</td>
      <td>Package dependency manager</td>
    </tr>
    <tr>
      <td><strong>Git</strong></td>
      <td>v2.30+</td>
      <td>Version control & GitHub synchronization</td>
    </tr>
    <tr>
      <td><strong>Vercel or Netlify Account</strong></td>
      <td>Free Tier</td>
      <td>Zero-cost global edge CDN hosting & automatic SSL</td>
    </tr>
  </table>

  <h2>2. Recommended Hosting Option: Vercel (1-Click & Free)</h2>
  <p>Vercel provides automatic deployments every time you push code to GitHub, offers free SSL certificates (https://), and delivers sub-second load times worldwide.</p>
  
  <h3>Step-by-Step Deployment:</h3>
  <ol>
    <li>Push your project code to a GitHub repository:</li>
  </ol>
  <div class="code-block">git init
git add .
git commit -m "Initial commit of Sagar Gurung Portfolio"
git branch -M main
git remote add origin https://github.com/your-username/sagar-gurung-portfolio.git
git push -u origin main</div>

  <ol start="2">
    <li>Go to <a href="https://vercel.com">vercel.com</a> and sign in with your GitHub account.</li>
    <li>Click <strong>"Add New..." &gt; "Project"</strong> and select your <code>sagar-gurung-portfolio</code> repository.</li>
    <li>Vercel automatically detects the Vite framework. Verify the default settings:
      <ul>
        <li><strong>Framework Preset:</strong> Vite</li>
        <li><strong>Build Command:</strong> <code>npm run build</code></li>
        <li><strong>Output Directory:</strong> <code>dist</code></li>
      </ul>
    </li>
    <li>Click <strong>"Deploy"</strong>. Within 45 seconds, your website will be live at <code>https://your-app.vercel.app</code>.</li>
  </ol>

  <h2>3. Alternative Free Hosting: GitHub Pages</h2>
  <p>If you prefer hosting directly from your existing GitHub repository without creating third-party accounts:</p>
  <div class="code-block"># Install the gh-pages deployment package
npm install -D gh-pages

# Build and deploy to the gh-pages branch
npm run build
npx gh-pages -d dist</div>
  <p>In your GitHub repository settings, go to <strong>Settings &gt; Pages</strong> and set the source branch to <code>gh-pages</code>.</p>

  <h2>4. Connecting Real Contact Form Submissions (Formspree)</h2>
  <p>Your portfolio includes a built-in contact form designed to forward recruiter and inquiry messages directly to your inbox (<code>${personalInfo.email}</code>) without requiring you to maintain a separate backend server.</p>
  
  <h3>Setup Steps:</h3>
  <ol>
    <li>Visit <a href="https://formspree.io">formspree.io</a> and register for a free account.</li>
    <li>Click <strong>"+ New Form"</strong> and name it <em>"Sagar Gurung Portfolio Contact"</em>.</li>
    <li>Set the recipient email to <code>${personalInfo.email}</code>.</li>
    <li>Copy your Formspree Form ID (e.g. <code>xvgoqzkp</code> or endpoint <code>https://formspree.io/f/xvgoqzkp</code>).</li>
    <li>You can enter this ID directly into your project's <code>.env</code> file or within the website's contact form interface:</li>
  </ol>
  <div class="code-block"># In your .env file
VITE_FORMSPREE_ID=your_form_id_here</div>

  <h2>5. Academic Credentials & Transcript Management</h2>
  <p>Your portfolio is pre-configured with both your graduate and undergraduate degrees:</p>
  <ul>
    <li><strong>Master of Science in Electrical Engineering:</strong> Western New England University (Springfield, MA) — GPA 3.19</li>
    <li><strong>Bachelor of Engineering in Electronics & Communication:</strong> Visvesvaraya Technological University (Belagavi, India) — Seat No. <code>${vtuTranscriptData.seatNumber}</code>, First Class (CGPA 7.26 / 65.10%)</li>
  </ul>
  <p>Using the built-in <strong>Owner Document Manager</strong> in the Credentials Portal, you can upload new PDF transcripts, updated CV revisions, and certification certificates at any time with automatic browser storage and 1-click removal.</p>

  <h2>6. Quick CLI Command Reference</h2>
  <div class="code-block"># Start local development server (http://localhost:3000)
npm run dev

# Run TypeScript type verification
npm run lint

# Compile production-ready static bundle
npm run build

# Preview production build locally
npm run preview</div>

  <div class="footer-note">
    <p>© ${new Date().getFullYear()} ${personalInfo.name} • Master of Science in Electrical Engineering • Visvesvaraya Technological University (1EW15EC126)</p>
  </div>
</body>
</html>
  `.trim();

  const blob = new Blob([docHtml], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Sagar_Gurung_Portfolio_Hosting_Guidance.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads the Markdown format of the hosting guidance
 */
export function downloadHostingGuidanceMarkdown() {
  const mdContent = `# WEBSITE HOSTING & DEPLOYMENT GUIDANCE
**Owner:** ${personalInfo.name} (${personalInfo.email})  
**Degree:** MS in Electrical Engineering (WNEU) | BE in Electronics & Communication (VTU)  
**Date:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

---

## 1. Quick Overview
Your portfolio is built with **React 18 + TypeScript + Vite + Tailwind CSS**. It builds static production files into the \`dist/\` folder.

---

## 2. Option A: Vercel (Recommended - 100% Free & Automatic)
1. Push your repository to GitHub:
   \`\`\`bash
   git init
   git add .
   git commit -m "Sagar Gurung Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sagar-gurung-portfolio.git
   git push -u origin main
   \`\`\`
2. Sign in to [Vercel](https://vercel.com) with your GitHub account.
3. Click **Add New... > Project** and select this repo.
4. Framework is auto-detected as **Vite**. Output directory is \`dist\`.
5. Click **Deploy**. Your portfolio is live with free HTTPS SSL.

---

## 3. Option B: GitHub Pages
\`\`\`bash
npm install -D gh-pages
npm run build
npx gh-pages -d dist
\`\`\`
In GitHub Repo > **Settings > Pages**, set branch to \`gh-pages\`.

---

## 4. Setting Up Real Contact Inquiries with Formspree
1. Create a free account at [Formspree.io](https://formspree.io).
2. Create a new form targeted to \`${personalInfo.email}\`.
3. Copy your Form ID (e.g. \`xvgoqzkp\`).
4. Set \`VITE_FORMSPREE_ID=xvgoqzkp\` in your \`.env\` file.

---

## 5. Academic Records & Transcripts
- **Master of Science (Electrical Engineering):** Western New England University (GPA 3.19)
- **Bachelor of Engineering (ECE):** Visvesvaraya Technological University (USN: 1EW15EC126, CGPA 7.26 / First Class)

---
© ${new Date().getFullYear()} ${personalInfo.name}
`;

  const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Sagar_Gurung_Portfolio_Hosting_Guidance.md';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
