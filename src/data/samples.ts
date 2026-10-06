export interface SampleArticle {
  id: string;
  category: 'Real' | 'Fake' | 'Uncertain';
  label: string;
  source: string;
  title: string;
  text: string;
}

export const SAMPLE_ARTICLES: SampleArticle[] = [
  {
    id: 'sample-real-1',
    category: 'Real',
    label: 'Real News (Science / Space)',
    source: 'NASA Aerospace Telemetry Bulletin',
    title: 'NASA Artemis Lunar Mission Completes Crucial Cryogenic Stage Rehearsal',
    text: `The National Aeronautics and Space Administration (NASA) announced on Tuesday that mission controllers and propulsion engineers successfully completed the cryogenic propellant loading test at Kennedy Space Center. The exercise verified that all liquid oxygen and liquid hydrogen flow valves met operational thresholds under sub-zero pressure.

"Every primary telemetry sensor reported nominal status throughout the simulated countdown," stated mission manager Charlie Blackwell-Smidt during an afternoon press briefing. "Our engineering teams demonstrated exceptional precision in managing core stage thermal cycles."

Representatives from independent aerospace certification bodies audited the telemetry logs, confirming that all four RS-25 engines maintained expected temperature margins. Formal review committees are scheduled to assemble this Friday to authorize the subsequent orbital test window.`
  },
  {
    id: 'sample-real-2',
    category: 'Real',
    label: 'Real News (Economy)',
    source: 'Federal Reserve Financial Wire',
    title: 'Federal Reserve Holds Benchmark Rates Steady Following Labor Market Audit',
    text: `The Federal Reserve concluded its scheduled two-day Federal Open Market Committee meeting on Wednesday, announcing that the target federal funds rate will remain in the range of 5.25 to 5.50 percent. 

In a statement released alongside the policy decision, policymakers noted that while job gains have moderated from earlier peaks, the unemployment rate remains low and economic growth continues at a solid pace. "Inflation has eased over the past year but remains elevated," Fed Chair Jerome Powell said during his scheduled press conference in Washington.

Economists surveyed by major financial news organizations noted that future rate adjustments will remain strictly data-dependent, requiring sustained progress on core personal consumption expenditure indices.`
  },
  {
    id: 'sample-fake-1',
    category: 'Fake',
    label: 'Fake News (Health Miracle Scam)',
    source: 'Viral Social Media Health Blog',
    title: 'SHOCKING: Banned Amazon Root Dissolves Stage 4 Tumors In 48 Hours!',
    text: `YOU WILL NOT BELIEVE WHAT BIG PHARMA IS DESPERATELY HIDING FROM YOU! An underground researcher deep in the Peruvian rainforest has uncovered an ancient sacred tree root that obliterates every single cancer cell and chronic disease in just forty-eight hours without chemotherapy, surgery, or medication!

Corrupt hospital executives and greedy pharmaceutical billionaires have paid millions in secret hush money to ban this information and erase it from medical journals. They want to keep humanity trapped in expensive medical treatments!

Doctors are terrified that this video will go viral! The government is preparing to take down our emergency server in less than 30 minutes. Share this urgent warning with everyone you love before it gets deleted forever!`
  },
  {
    id: 'sample-fake-2',
    category: 'Fake',
    label: 'Fake News (Financial Glitch Conspiracy)',
    source: 'Anonymous Telegram Forward',
    title: 'Secret ATM Backdoor Code 9999 Dispenses Unlimited Free Cash Worldwide',
    text: `Banks are currently in total panic after whistleblowers exposed a top-secret developer glitch present in every automatic teller machine worldwide! By typing the master code 9999 three times and tapping the red cancel button backwards, any citizen can withdraw unlimited bundles of hundred-dollar bills without deducting a single penny from their bank account!

Wall Street bankers and global elites have used this classified backdoor code for decades to fund private jets while ordinary people struggle with mortgages. Hurry down to your local ATM right now before the central banks permanently patch the software at midnight!`
  },
  {
    id: 'sample-uncertain-1',
    category: 'Uncertain',
    label: 'Uncertain / Rumor (Unverified Social Claim)',
    source: 'Online Forum Discussion',
    title: 'Leaked Rumors Suggest Major Smartphone Manufacturer May Delay Fall Keynote',
    text: `Unconfirmed industry chatter circulating on tech forums suggests that a prominent electronics manufacturer might reschedule its annual September flagship hardware presentation. Anonymous supply chain forum users claim that display panel yield issues at overseas manufacturing plants could push the rollout back by several weeks.

Company representatives have declined to comment on product rumors or speculative schedules. Industry analysts note that minor supply adjustments are routine in consumer electronics manufacturing, making it difficult to assess whether the rumored delay is genuine or based on forum speculation.`
  }
];
