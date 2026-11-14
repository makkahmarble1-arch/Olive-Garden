# Google AdSense Preparation Checklist

**Status (2026-11-14, Lesson 9.6):**
- AdSense is **not** applied for, **not** installed, and **no** ad or analytics script is on the site.
- Nothing here guarantees approval.
- Google's policies change. Re-read the official pages before applying.

## 1. Official sources reviewed (2026-11-14)

| Source | What it says (summary) |
|---|---|
| Publisher Policies, Privacy disclosures (https://support.google.com/publisherpolicies/answer/10437486) | Publishers must have and follow a privacy policy that clearly discloses data collection, sharing, and use with Google products. It must tell users that third parties may place and read cookies on their browsers, and it may link to Google's "How Google uses data when you use our partners' sites or apps". It also requires compliance with the EU user consent policy |
| EU user consent policy (https://www.google.com/about/company/user-consent-policy/) | For users in the EEA, UK, and Switzerland: obtain legally valid consent for cookies/local storage where required and for personalized ads; keep consent records; give revocation instructions; identify each party that collects data |
| AdSense Help, CMP requirement (https://support.google.com/adsense/answer/13554116) | A **Google-certified CMP integrated with the IAB TCF** is required for personalized ads to EEA and UK users since 16 Jan 2024, and for Switzerland since 31 Jul 2024. Without one, those users may get only non-personalized or limited ads |
| How Google uses cookies in advertising (https://policies.google.com/technologies/ads) | Ad cookies come from domains such as doubleclick.net and googlesyndication.com. User controls: My Ad Center (https://myadcenter.google.com/), aboutads.info, youronlinechoices |
| AdSense eligibility (https://support.google.com/adsense/answer/9724) | Own content, compliance with the Program policies (https://support.google.com/adsense/answer/48182), age 18+. The Program policies prohibit ads on non-content pages and on pages made mainly for ads |

**Manual verification needed:**
- the full "Privacy and security" Program policy text
- the current CMP list
- the US state privacy (Restricted Data Processing) options in AdSense
- COPPA settings (https://support.google.com/publisherpolicies/answer/10436800)

## 2. Done now (current requirements for the site itself)

- [x] Privacy Policy describing the real data practices (`/privacy-policy`), linked in the footer of every page and next to the contact form.
- [x] Terms and Conditions (`/terms-and-conditions`) and Disclaimer (`/disclaimer`), both in the footer.
- [x] About Us and Contact Us: a working form and a verified email.
- [x] Independent-website disclosure on every page (footer) and on the Disclaimer; no use of the Olive Garden logo.
- [x] Original content, clear navigation, no ad-like layouts, no pages made only for ads.
- [x] The Privacy Policy already contains the future AdSense disclosures (third-party vendors including Google use cookies; Google's advertising cookies; opt-out links; the partner-sites link; consent for EEA/UK/Switzerland), clearly marked "not showing ads at this time".

## 3. Before activating AdSense (future requirements)

- [ ] Owner decision: apply, and on which pages ads may appear (not on legal, contact, or thin pages).
- [ ] **Planned CMP (owner decision 2026-11-14): Google's own "Privacy & messaging" consent tool** in AdSense, for EEA/UK/Switzerland visitors. **Before activation, verify:**
  - that it is still Google-certified and integrated with the IAB TCF
  - the current regional requirements (EEA, UK, Switzerland, and any new regions)
  - the US state privacy message options
  - how it loads with the ad tag

  Do not add any consent or ad script until then; no fake banner.
- [ ] Decide on US state privacy handling: AdSense Restricted Data Processing, and an opt-out link if required.
- [ ] Update `/privacy-policy`:
  - change "planned" to "active"
  - list the ad cookies and partners
  - describe the consent tool
  - set the new "Last updated" date
  - update `PRIVACY_DATA_INVENTORY.md`
- [ ] Add the AdSense script only after the CMP (the CMP must load first), and add `ads.txt` with the publisher id from the AdSense account. The `proxy.ts` file list picks up `public/ads.txt` automatically.
- [ ] Review the Content Security Policy before adding scripts (none exists yet; `SECURITY_TEST_REPORT.md`).
- [ ] Turn on site indexing at launch (`SITE_INDEXING=true`); AdSense review needs a crawlable live site.
- [ ] Re-check the COPPA setting: the site is general audience; the kids menu page is for parents.

## 4. Analytics (GA4 / Clarity), if wanted

- [ ] Owner decision on the tool(s).
- [ ] Consent: Google Consent Mode v2 with the same CMP for EEA/UK/CH. Clarity also needs a consent signal there.
- [ ] Update the Privacy Policy analytics section and the cookie table before activation.
