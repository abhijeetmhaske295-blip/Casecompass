import { LegalCaseData } from '../types/legalCase';

export const SAMPLE_CASES: LegalCaseData[] = [
  {
    id: 'case_apex_meridian',
    caseNumber: '24-CV-01842-WHA',
    caseTitle: 'Apex Commercial Technologies Inc. v. Meridian Global Logistics LLC',
    courtJurisdiction: 'U.S. District Court, Northern District of California (San Francisco Division)',
    presidingJudge: 'Hon. William Alsup',
    caseType: 'Commercial Contract & Trade Secret Misappropriation',
    filingDate: '2024-01-18',
    rawText: `[DOCKET EXCERPT: 24-CV-01842-WHA]
On January 18, 2024, Plaintiff Apex Commercial Technologies filed its Complaint alleging breach of contract and proprietary code misappropriation (Doc. 1).
On February 09, 2024, Defendant Meridian Global Logistics filed a Demurrer challenging the sufficiency of Claim III (Doc. 8).
On February 26, 2024, the Court entered an Order denying the Demurrer without prejudice and setting initial case management (Doc. 14).
On March 12, 2024, Plaintiff served a Subpoena Duces Tecum on third-party cloud vendor NexaData for database audit logs (Doc. 19, Certificate of Service).
CONTROVERSY: However, Defendant's Declaration of Counsel filed April 02, 2024 (Doc. 27, ¶ 4) explicitly states: "Plaintiff served the third-party subpoena on March 19, 2024, rather than March 12, violating the noticed 14-day discovery window."
On April 08, 2024, the parties appeared for a telephonic discovery conference. Court minutes (Doc. 31) state: "Parties to submit joint letter pursuant to the Judge's Telephonic Order of April 08, 2024." NOTE: No formal written Telephonic Order dated April 08, 2024 was ever entered on the docket.
On [Stamp smudged: October ??, 2023], pre-suit demand was allegedly stamped at counsel's mailroom, though date and month digits are illegible.
On April 22, 2024, Plaintiff filed a Motion in Limine seeking to preclude Defendant from introducing spoliated server mirrors (Doc. 36).
On May 06, 2024, the Court issued Scheduling Order (Doc. 42) stating verbatim: "Defendants shall file and serve their Opposition to Plaintiff's Motion to Compel no later than May 24, 2024 at 5:00 PM PST."
The Scheduling Order further states: "All expert disclosures under Fed. R. Civ. P. 26(a)(2) shall be completed by June 14, 2024."
On May 11, 2024, Defendant petitioned for an Interlocutory Appeal regarding the protective order scope (Doc. 49).`,
    documents: [
      {
        id: 'doc_1',
        name: 'Docket Entry 1 - Verified Complaint.pdf',
        type: 'Complaint Pleading',
        uploadedAt: '2024-01-18',
        pageCount: 24,
        content: `UNITED STATES DISTRICT COURT\nNORTHERN DISTRICT OF CALIFORNIA\n\nAPEX COMMERCIAL TECHNOLOGIES INC.,\n  Plaintiff,\n  v.\nMERIDIAN GLOBAL LOGISTICS LLC,\n  Defendant.\n\nCase No. 24-CV-01842-WHA\n\nCOMPLAINT FOR BREACH OF MASTER SERVICES AGREEMENT AND MISAPPROPRIATION OF TRADE SECRETS\n\n1. Plaintiff Apex Commercial Technologies filed its Complaint on January 18, 2024, alleging willful breach of software development covenants and trade secret theft.\n2. Demand letter bears partially smudged incoming mail stamp reading "[OCT ?? 2023 - RECEIVED]". No postal return receipt was retained.\n3. Defendant acquired source code mirrors without authorization.`
      },
      {
        id: 'doc_19',
        name: 'Docket Entry 19 - Subpoena Duces Tecum Certificate of Service.pdf',
        type: 'Discovery Proof of Service',
        uploadedAt: '2024-03-12',
        pageCount: 4,
        content: `CERTIFICATE OF ELECTRONIC SERVICE\n\nI declare under penalty of perjury that on March 12, 2024, Plaintiff served a Subpoena Duces Tecum on third-party cloud vendor NexaData for database audit logs via electronic registered transmission to NexaData Corporation Trust Center.\n\nExecuted at San Francisco, CA on March 12, 2024.`
      },
      {
        id: 'doc_27',
        name: 'Docket Entry 27 - Declaration of Defense Counsel.pdf',
        type: 'Counsel Declaration',
        uploadedAt: '2024-04-02',
        pageCount: 8,
        content: `DECLARATION OF DEFENSE COUNSEL IN OPPOSITION TO DISCOVERY EXTENSION\n\nI, Marcus Vance, declare:\n... Paragraph 4: Plaintiff served the third-party subpoena on March 19, 2024, rather than March 12, violating the noticed 14-day discovery window and depriving Defendant of timely opportunity to move to quash under Rule 45.`
      },
      {
        id: 'doc_42',
        name: 'Docket Entry 42 - Pretrial Scheduling Order.pdf',
        type: 'Judicial Order',
        uploadedAt: '2024-05-06',
        pageCount: 6,
        content: `CIVIL PRETRIAL SCHEDULING ORDER\n\nIT IS HEREBY ORDERED:\n1. Defendants shall file and serve their Opposition to Plaintiff's Motion to Compel no later than May 24, 2024 at 5:00 PM PST.\n2. All expert disclosures under Fed. R. Civ. P. 26(a)(2) shall be completed by June 14, 2024.\n3. Dispositive motion cut-off is firm.`
      }
    ],
    events: [
      {
        id: 'e_0',
        date: '2023-10-??',
        dateDisplay: '[Unconfident: Oct ??, 2023]',
        isDateConfident: false,
        unconfidentReason: 'Document mailroom rubber stamp is physically smudged; day and month digits illegible in original scan. Do not extrapolate date.',
        title: 'Pre-Suit Notice of Dispute Stamp',
        summary: 'Plaintiff transmitted initial formal demand letter prior to filing federal action.',
        eventType: 'COMMUNICATION',
        sourceDocument: 'Docket Entry 1 - Verified Complaint.pdf (Doc. 1-2, p. 3)',
        sourceSentence: 'Demand letter bears partially smudged incoming mail stamp reading "[OCT ?? 2023 - RECEIVED]".',
        hasConflict: false,
        legalTerms: ['prima facie'],
        reviewStatus: 'FLAGGED',
        verificationNote: 'Smudged mailroom stamp requires verification against physical postal registry log.',
        verifiedBy: 'Associate Counsel J. Miller'
      },
      {
        id: 'e_1',
        date: '2024-01-18',
        dateDisplay: 'January 18, 2024',
        isDateConfident: true,
        title: 'Complaint Filed by Apex Commercial Technologies',
        summary: 'Plaintiff initiates federal civil action asserting breach of software master services agreement and trade secret misappropriation.',
        eventType: 'FILING',
        sourceDocument: 'Docket Entry 1 - Verified Complaint.pdf',
        sourceSentence: 'On January 18, 2024, Plaintiff Apex Commercial Technologies filed its Complaint alleging breach of contract and proprietary code misappropriation (Doc. 1).',
        hasConflict: false,
        legalTerms: ['prima facie'],
        reviewStatus: 'VERIFIED',
        verificationNote: 'Matches CM/ECF docket stamp exactly.',
        verifiedBy: 'Lead Counsel S. Vance',
        verifiedAt: '2024-01-19'
      },
      {
        id: 'e_2',
        date: '2024-02-09',
        dateDisplay: 'February 09, 2024',
        isDateConfident: true,
        title: 'Demurrer / Motion to Dismiss Filed',
        summary: 'Defendant Meridian Global Logistics challenges the legal sufficiency of Claim III (Trade Secret Theft).',
        eventType: 'FILING',
        sourceDocument: 'Docket Entry 8 (Notice of Demurrer, p. 1)',
        sourceSentence: 'On February 09, 2024, Defendant Meridian Global Logistics filed a Demurrer challenging the sufficiency of Claim III (Doc. 8).',
        hasConflict: false,
        legalTerms: ['demurrer'],
        reviewStatus: 'VERIFIED',
        verifiedBy: 'Paralegal R. Chen'
      },
      {
        id: 'e_3',
        date: '2024-02-26',
        dateDisplay: 'February 26, 2024',
        isDateConfident: true,
        title: 'Order Denying Demurrer Without Prejudice',
        summary: 'Court rules plaintiff alleged sufficient factual predicate to survive initial pleading challenge.',
        eventType: 'ORDER',
        sourceDocument: 'Docket Entry 14 (Civil Minutes & Order, p. 2)',
        sourceSentence: 'On February 26, 2024, the Court entered an Order denying the Demurrer without prejudice and setting initial case management (Doc. 14).',
        hasConflict: false,
        legalTerms: ['demurrer'],
        reviewStatus: 'VERIFIED',
        verifiedBy: 'Lead Counsel S. Vance'
      },
      {
        id: 'e_4',
        date: '2024-03-12',
        dateDisplay: 'March 12, 2024 vs March 19, 2024 [CONFLICT]',
        isDateConfident: true,
        title: 'Subpoena Duces Tecum Service on NexaData',
        summary: 'Formal subpoena issued to third-party cloud infrastructure custodian for raw server audit traces.',
        eventType: 'DISCOVERY',
        sourceDocument: 'Docket Entry 19 - Subpoena Duces Tecum Certificate of Service.pdf',
        sourceSentence: 'On March 12, 2024, Plaintiff served a Subpoena Duces Tecum on third-party cloud vendor NexaData for database audit logs (Doc. 19, Certificate of Service).',
        hasConflict: true,
        conflictDetails: {
          primaryDate: '2024-03-12',
          primarySource: 'Docket Entry 19 - Subpoena Duces Tecum Certificate of Service.pdf',
          primarySentence: 'Proof of Service certifies electronic transmission to NexaData registered agent on March 12, 2024.',
          conflictingDate: '2024-03-19',
          conflictingSource: 'Docket Entry 27 - Declaration of Defense Counsel.pdf (¶ 4)',
          conflictingSentence: 'Defendant\'s Declaration of Counsel filed April 02, 2024 states: "Plaintiff served the third-party subpoena on March 19, 2024, rather than March 12, violating the noticed 14-day discovery window."',
          conflictDescription: 'Discrepancy of 7 days affects validity of third-party objection window under Fed. R. Civ. P. 45.'
        },
        legalTerms: ['subpoena duces tecum'],
        reviewStatus: 'FLAGGED',
        verificationNote: 'Critical conflict pending hearing argument on Rule 45 motion to quash.',
        verifiedBy: 'Lead Counsel S. Vance'
      },
      {
        id: 'e_5',
        date: '2024-04-08',
        dateDisplay: 'April 08, 2024',
        isDateConfident: true,
        title: 'Telephonic Case Management Conference',
        summary: 'Magistrate hearing addressing discovery impasse and production schedule.',
        eventType: 'HEARING',
        sourceDocument: 'Minute Entry (Doc. 31)',
        sourceSentence: 'On April 08, 2024, the parties appeared for a telephonic discovery conference. Court minutes (Doc. 31) state: "Parties to submit joint letter pursuant to the Judge\'s Telephonic Order of April 08, 2024."',
        hasConflict: false,
        legalTerms: ['protective order'],
        reviewStatus: 'PENDING'
      },
      {
        id: 'e_6',
        date: '2024-04-22',
        dateDisplay: 'April 22, 2024',
        isDateConfident: true,
        title: 'Motion in Limine Concerning Alleged Spoliation',
        summary: 'Plaintiff moves to exclude reconstructed server drive images citing failure to preserve primary log partitions.',
        eventType: 'FILING',
        sourceDocument: 'Docket Entry 36 (Motion in Limine, pp. 1-12)',
        sourceSentence: 'On April 22, 2024, Plaintiff filed a Motion in Limine seeking to preclude Defendant from introducing spoliated server mirrors (Doc. 36).',
        hasConflict: false,
        legalTerms: ['motion in limine', 'spoliation'],
        reviewStatus: 'VERIFIED',
        verifiedBy: 'Associate Counsel J. Miller'
      },
      {
        id: 'e_7',
        date: '2024-05-06',
        dateDisplay: 'May 06, 2024',
        isDateConfident: true,
        title: 'Comprehensive Scheduling & Pretrial Order',
        summary: 'Court sets strict briefing deadlines and mandates disclosure cutoff.',
        eventType: 'ORDER',
        sourceDocument: 'Docket Entry 42 - Pretrial Scheduling Order.pdf',
        sourceSentence: 'On May 06, 2024, the Court issued Scheduling Order (Doc. 42) stating verbatim: "Defendants shall file and serve their Opposition to Plaintiff\'s Motion to Compel no later than May 24, 2024 at 5:00 PM PST."',
        hasConflict: false,
        legalTerms: ['protective order'],
        reviewStatus: 'VERIFIED',
        verifiedBy: 'Managing Partner D. Hayes'
      },
      {
        id: 'e_8',
        date: '2024-05-11',
        dateDisplay: 'May 11, 2024',
        isDateConfident: true,
        title: 'Petition for Interlocutory Appeal Filed',
        summary: 'Defendant seeks immediate appellate review of trade secret protective order boundaries under collateral order doctrine.',
        eventType: 'FILING',
        sourceDocument: 'Docket Entry 49 (Notice of Appeal, p. 1)',
        sourceSentence: 'On May 11, 2024, Defendant petitioned for an Interlocutory Appeal regarding the protective order scope (Doc. 49).',
        hasConflict: false,
        legalTerms: ['interlocutory appeal', 'protective order'],
        reviewStatus: 'PENDING'
      }
    ],
    gaps: [
      {
        id: 'gap_1',
        title: 'Missing "Telephonic Order of April 08, 2024"',
        referencedDocument: 'Judge\'s Telephonic Order dated April 08, 2024',
        description: 'Court minute order Doc. 31 explicitly directs parties to submit briefing "pursuant to the Judge\'s Telephonic Order of April 08, 2024", but no standalone written order was entered on the CM/ECF docket.',
        severity: 'CRITICAL',
        sourceSentence: 'Court minutes (Doc. 31) state: "Parties to submit joint letter pursuant to the Judge\'s Telephonic Order of April 08, 2024."',
        discoveredInDocument: 'Docket Entry 31 (Minute Entry)'
      },
      {
        id: 'gap_2',
        title: 'Missing Proof of Service for Pre-Suit Demand',
        referencedDocument: 'Proof of Personal or Certified Mail Service (Demand Letter)',
        description: 'The pre-suit demand letter attached as Doc. 1-2 lacks an executed affidavit or postal certified tracking slip confirming delivery to defendant.',
        severity: 'MODERATE',
        sourceSentence: 'Demand letter bears partially smudged incoming mail stamp reading "[OCT ?? 2023 - RECEIVED]".',
        discoveredInDocument: 'Exhibit B to Complaint (Doc. 1-2)'
      }
    ],
    explicitDeadlines: [
      {
        id: 'dl_1',
        dueDate: '2024-05-24',
        dueDateDisplay: 'May 24, 2024 at 5:00 PM PST',
        title: 'Opposition to Plaintiff\'s Motion to Compel',
        obligatedParty: 'Defendant (Meridian Global Logistics LLC)',
        sourceSentence: 'Defendants shall file and serve their Opposition to Plaintiff\'s Motion to Compel no later than May 24, 2024 at 5:00 PM PST.',
        sourceDocument: 'Docket Entry 42 - Pretrial Scheduling Order.pdf (Doc. 42, ¶ 2)',
        statutoryBasis: 'Fed. R. Civ. P. 37 / Civ. L.R. 7-3',
        isCourtMandated: true,
        isCompleted: false
      },
      {
        id: 'dl_2',
        dueDate: '2024-06-14',
        dueDateDisplay: 'June 14, 2024',
        title: 'Expert Disclosures Cutoff',
        obligatedParty: 'Both Parties (Apex & Meridian)',
        sourceSentence: 'All expert disclosures under Fed. R. Civ. P. 26(a)(2) shall be completed by June 14, 2024.',
        sourceDocument: 'Docket Entry 42 - Pretrial Scheduling Order.pdf (Doc. 42, ¶ 5)',
        statutoryBasis: 'Fed. R. Civ. P. 26(a)(2)',
        isCourtMandated: true,
        isCompleted: false
      }
    ]
  },
  {
    id: 'case_vance_greenfield',
    caseNumber: 'PB-2024-8831',
    caseTitle: 'Estate of Eleanor Vance v. Greenfield Healthcare System',
    courtJurisdiction: 'Probate & Family Court, Commonwealth of Massachusetts (Middlesex Division)',
    presidingJudge: 'Hon. Katherine Field',
    caseType: 'Fiduciary Duty, Elder Neglect & Wrongful Death',
    filingDate: '2024-02-14',
    rawText: `[CASE RECORD: PB-2024-8831]
On February 14, 2024, the Administrator of the Estate filed a Petition for Formal Probate and Complaint for Breach of Fiduciary Duty (Pleading 1).
On February 22, 2024, Plaintiff filed a Lis Pendens on Greenfield Convalescent Pavilion real estate parcels (Pleading 5).
On March 04, 2024, Defendant filed an Answer asserting the affirmative defense of Laches due to alleged delay in estate administration (Pleading 9).
DISCREPANCY: The certified Massachusetts Certificate of Death indicates time and date of death as November 14, 2023 at 23:45 EST. However, Greenfield Nursing Facility Discharge Summary (Exhibit D) records patient discharge as November 15, 2023 at 08:30 AM.
On March 18, 2024, the Court issued a Discovery Directive stating: "Defendant Greenfield Healthcare shall produce all attendant nursing shift logs strictly on or before April 12, 2024."
On April 03, 2024, deposition testimony referenced "Physician Emergency Protocol Transfer Directive #7" dated October 2023. This internal protocol was omitted from the hospital document production.
On April 19, 2024, the Court issued an Order for Pretrial Conference with explicit text: "Parties must exchange designated witness lists no later than May 30, 2024."`,
    documents: [
      {
        id: 'doc_v1',
        name: 'Petition for Formal Probate (Pleading 1).pdf',
        type: 'Probate Pleading',
        uploadedAt: '2024-02-14',
        pageCount: 16,
        content: `COMMONWEALTH OF MASSACHUSETTS\nPROBATE AND FAMILY COURT DEPARTMENT\nMIDDLESEX DIVISION\nDocket No. PB-2024-8831\n\nPETITION FOR FORMAL PROBATE AND COMPLAINT FOR DAMAGES\n\nOn February 14, 2024, the Administrator of the Estate of Eleanor Vance filed this Petition alleging breach of fiduciary care and negligent facility supervision.`
      },
      {
        id: 'doc_v2',
        name: 'Certified Commonwealth Death Certificate vs Hospital Discharge.pdf',
        type: 'Vital Record & Medical Chart',
        uploadedAt: '2024-03-01',
        pageCount: 5,
        content: `EXHIBIT C & D COMPARISON:\n\nThe certified Massachusetts Certificate of Death indicates time and date of death as November 14, 2023 at 23:45 EST.\nHowever, Greenfield Nursing Facility Discharge Summary (Exhibit D) records patient discharge as November 15, 2023 at 08:30 AM.`
      }
    ],
    events: [
      {
        id: 'v_1',
        date: '2023-11-14',
        dateDisplay: 'November 14, 2023 vs November 15, 2023 [CONFLICT]',
        isDateConfident: true,
        title: 'Record of Patient Demise vs Formal Discharge',
        summary: 'Vital records registry death certificate diverges by 9 hours from nursing shift discharge notation.',
        eventType: 'COMMUNICATION',
        sourceDocument: 'Certified Commonwealth Death Certificate vs Hospital Discharge.pdf',
        sourceSentence: 'The certified Massachusetts Certificate of Death indicates time and date of death as November 14, 2023 at 23:45 EST. However, Greenfield Nursing Facility Discharge Summary (Exhibit D) records patient discharge as November 15, 2023 at 08:30 AM.',
        hasConflict: true,
        conflictDetails: {
          primaryDate: '2023-11-14',
          primarySource: 'Massachusetts Registry of Vital Statistics Death Certificate',
          primarySentence: 'Official Death Certificate registers time of demise as November 14, 2023 at 23:45 EST.',
          conflictingDate: '2023-11-15',
          conflictingSource: 'Greenfield Nursing Chart Exhibit D (Discharge Note)',
          conflictingSentence: 'Discharge Summary indicates decedent was discharged in care on November 15, 2023 at 08:30 AM.',
          conflictDescription: 'Facility records show medical discharge 9 hours after official municipal death registration.'
        },
        legalTerms: ['prima facie'],
        reviewStatus: 'FLAGGED',
        verificationNote: 'Critical timeline contradiction central to negligence causation.'
      },
      {
        id: 'v_2',
        date: '2024-02-14',
        dateDisplay: 'February 14, 2024',
        isDateConfident: true,
        title: 'Petition for Formal Probate & Complaint Filed',
        summary: 'Administrator of Estate initiates wrongful death and breach of fiduciary care proceedings.',
        eventType: 'FILING',
        sourceDocument: 'Petition for Formal Probate (Pleading 1).pdf',
        sourceSentence: 'On February 14, 2024, the Administrator of the Estate filed a Petition for Formal Probate and Complaint for Breach of Fiduciary Duty (Pleading 1).',
        hasConflict: false,
        legalTerms: ['prima facie'],
        reviewStatus: 'VERIFIED'
      },
      {
        id: 'v_3',
        date: '2024-02-22',
        dateDisplay: 'February 22, 2024',
        isDateConfident: true,
        title: 'Notice of Lis Pendens Recorded',
        summary: 'Estate places cloud on title of care facility physical real property assets.',
        eventType: 'FILING',
        sourceDocument: 'Middlesex Registry of Deeds Recording (Pleading 5)',
        sourceSentence: 'On February 22, 2024, Plaintiff filed a Lis Pendens on Greenfield Convalescent Pavilion real estate parcels (Pleading 5).',
        hasConflict: false,
        legalTerms: ['lis pendens'],
        reviewStatus: 'VERIFIED'
      },
      {
        id: 'v_4',
        date: '2024-03-04',
        dateDisplay: 'March 04, 2024',
        isDateConfident: true,
        title: 'Answer Asserting Affirmative Defense of Laches',
        summary: 'Defendant claims unexcused delay by personal representative barred equitable recovery.',
        eventType: 'FILING',
        sourceDocument: 'Defendant Answer & Affirmative Defenses (Pleading 9)',
        sourceSentence: 'On March 04, 2024, Defendant filed an Answer asserting the affirmative defense of Laches due to alleged delay in estate administration (Pleading 9).',
        hasConflict: false,
        legalTerms: ['laches'],
        reviewStatus: 'VERIFIED'
      },
      {
        id: 'v_5',
        date: '2024-03-18',
        dateDisplay: 'March 18, 2024',
        isDateConfident: true,
        title: 'Court Discovery Directive for Nursing Shift Logs',
        summary: 'Judicial order mandating production of unredacted shift rosters and hourly logs.',
        eventType: 'ORDER',
        sourceDocument: 'Probate Court Discovery Directive (Pleading 14)',
        sourceSentence: 'On March 18, 2024, the Court issued a Discovery Directive stating: "Defendant Greenfield Healthcare shall produce all attendant nursing shift logs strictly on or before April 12, 2024."',
        hasConflict: false,
        legalTerms: [],
        reviewStatus: 'VERIFIED'
      },
      {
        id: 'v_6',
        date: '2024-04-19',
        dateDisplay: 'April 19, 2024',
        isDateConfident: true,
        title: 'Pretrial Conference Scheduling Order',
        summary: 'Judge sets exchange dates for expert and lay witnesses.',
        eventType: 'ORDER',
        sourceDocument: 'Court Pretrial Order (Pleading 21)',
        sourceSentence: 'On April 19, 2024, the Court issued an Order for Pretrial Conference with explicit text: "Parties must exchange designated witness lists no later than May 30, 2024."',
        hasConflict: false,
        legalTerms: [],
        reviewStatus: 'PENDING'
      }
    ],
    gaps: [
      {
        id: 'v_gap_1',
        title: 'Missing "Physician Emergency Protocol Transfer Directive #7"',
        referencedDocument: 'Internal Protocol Directive #7 (October 2023)',
        description: 'Attending physician deposition repeatedly cites mandatory transfer guidelines in Directive #7, but the document was withheld from initial disclosures.',
        severity: 'CRITICAL',
        sourceSentence: 'On April 03, 2024, deposition testimony referenced "Physician Emergency Protocol Transfer Directive #7" dated October 2023.',
        discoveredInDocument: 'Deposition Transcript of Dr. Marcus Reed (Exhibit K)'
      }
    ],
    explicitDeadlines: [
      {
        id: 'v_dl_1',
        dueDate: '2024-04-12',
        dueDateDisplay: 'April 12, 2024',
        title: 'Production of Attendant Nursing Shift Logs',
        obligatedParty: 'Defendant (Greenfield Healthcare System)',
        sourceSentence: 'Defendant Greenfield Healthcare shall produce all attendant nursing shift logs strictly on or before April 12, 2024.',
        sourceDocument: 'Discovery Directive (Pleading 14, p. 1)',
        statutoryBasis: 'Mass. R. Civ. P. 34',
        isCourtMandated: true
      },
      {
        id: 'v_dl_2',
        dueDate: '2024-05-30',
        dueDateDisplay: 'May 30, 2024',
        title: 'Exchange of Designated Witness Lists',
        obligatedParty: 'Both Parties',
        sourceSentence: 'Parties must exchange designated witness lists no later than May 30, 2024.',
        sourceDocument: 'Pretrial Order (Pleading 21, ¶ 3)',
        statutoryBasis: 'Mass. R. Civ. P. 16',
        isCourtMandated: true
      }
    ]
  },
  {
    id: 'case_state_sterling',
    caseNumber: 'ENF-2023-419',
    caseTitle: 'State Environmental Protection Agency v. Sterling Mining Operations',
    courtJurisdiction: 'Appellate Division & Administrative Law Court, 3rd Judicial District',
    presidingJudge: 'Admin. Law Judge Sarah Chen',
    caseType: 'Groundwater Contamination & Administrative Enforcement',
    filingDate: '2023-09-15',
    rawText: `[ADMINISTRATIVE DOCKET: ENF-2023-419]
On September 15, 2023, the Agency issued an Administrative Notice of Violation alleging tailings runoff (Notice ENF-419).
On [Illegible Inspector Seal: Nov ?? 2023], an on-site field soil sample was cataloged with barcode QA-992.
FIELD CONFLICT: The Field Inspector Log records soil sampling date as November 03, 2023. However, State Laboratory Chain of Custody Intake (Lab Doc. 12) stamped sample QA-992 as collected November 09, 2023.
On November 28, 2023, Respondent filed a Petition for Writ of Mandamus seeking to compel dismissal of the administrative complaint.
On December 04, 2023, the Hearing Examiner entered an Order stating: "Respondent shall submit corrective containment engineering drawings strictly by December 15, 2023."
GAP: Hearing transcript page 44 references "Groundwater Remediation Interim Protocol approved September 28", but this approval memo is omitted from the official record index.
On January 10, 2024, the Agency filed for Summary Adjudication on Count I (Effluent Violations).`,
    documents: [
      {
        id: 'doc_s1',
        name: 'Agency Administrative Notice of Violation (Notice ENF-419).pdf',
        type: 'Administrative Citation',
        uploadedAt: '2023-09-15',
        pageCount: 11,
        content: `STATE ENVIRONMENTAL REGULATORY BOARD\nENFORCEMENT DIVISION\nDocket No. ENF-2023-419\n\nADMINISTRATIVE NOTICE OF VIOLATION\n\nOn September 15, 2023, the Agency issued this Notice alleging heavy metal effluent runoffs into the Blackwood Watershed.`
      }
    ],
    events: [
      {
        id: 's_1',
        date: '2023-09-15',
        dateDisplay: 'September 15, 2023',
        isDateConfident: true,
        title: 'Administrative Notice of Violation Issued',
        summary: 'Enforcement division initiates formal penalty proceedings citing toxic runoff.',
        eventType: 'FILING',
        sourceDocument: 'Agency Notice of Violation (Doc. 1)',
        sourceSentence: 'On September 15, 2023, the Agency issued an Administrative Notice of Violation alleging tailings runoff (Notice ENF-419).',
        hasConflict: false,
        legalTerms: [],
        reviewStatus: 'VERIFIED'
      },
      {
        id: 's_2',
        date: '2023-11-03',
        dateDisplay: 'November 03, 2023 vs November 09, 2023 [CONFLICT]',
        isDateConfident: true,
        title: 'Chain of Custody Collection Date Discrepancy',
        summary: 'Field officer field notebook date contradicts certified environmental testing laboratory intake intake stamp.',
        eventType: 'DISCOVERY',
        sourceDocument: 'Field Log vs Lab Custody Seal QA-992',
        sourceSentence: 'The Field Inspector Log records soil sampling date as November 03, 2023. However, State Laboratory Chain of Custody Intake (Lab Doc. 12) stamped sample QA-992 as collected November 09, 2023.',
        hasConflict: true,
        conflictDetails: {
          primaryDate: '2023-11-03',
          primarySource: 'Field Inspector Log QA-992',
          primarySentence: 'Field notebook logs sampling time as Nov 03, 2023, 14:00.',
          conflictingDate: '2023-11-09',
          conflictingSource: 'State Laboratory Intake Certificate',
          conflictingSentence: 'State laboratory receipt marks collection date as Nov 09, 2023.',
          conflictDescription: '6-day gap compromises statutory 48-hour refrigeration limit for volatile organic analysis.'
        },
        legalTerms: ['spoliation'],
        reviewStatus: 'FLAGGED'
      },
      {
        id: 's_3',
        date: '2023-11-28',
        dateDisplay: 'November 28, 2023',
        isDateConfident: true,
        title: 'Petition for Writ of Mandamus Filed',
        summary: 'Mining corporation petitions appellate court for extraordinary writ directing dismissal.',
        eventType: 'FILING',
        sourceDocument: 'Verified Petition for Writ of Mandamus (Doc. 18)',
        sourceSentence: 'On November 28, 2023, Respondent filed a Petition for Writ of Mandamus seeking to compel dismissal of the administrative complaint.',
        hasConflict: false,
        legalTerms: ['mandamus'],
        reviewStatus: 'VERIFIED'
      },
      {
        id: 's_4',
        date: '2023-12-04',
        dateDisplay: 'December 04, 2023',
        isDateConfident: true,
        title: 'Examiner Order for Containment Drawings',
        summary: 'Administrative law judge directs immediate submission of engineering barrier plans.',
        eventType: 'ORDER',
        sourceDocument: 'Hearing Examiner Order (Doc. 23)',
        sourceSentence: 'On December 04, 2023, the Hearing Examiner entered an Order stating: "Respondent shall submit corrective containment engineering drawings strictly by December 15, 2023."',
        hasConflict: false,
        legalTerms: [],
        reviewStatus: 'VERIFIED'
      },
      {
        id: 's_5',
        date: '2024-01-10',
        dateDisplay: 'January 10, 2024',
        isDateConfident: true,
        title: 'Motion for Summary Adjudication on Count I',
        summary: 'State moves for immediate judgment on discharge standards as matter of law.',
        eventType: 'FILING',
        sourceDocument: 'Agency Motion for Partial Summary Adjudication (Doc. 34)',
        sourceSentence: 'On January 10, 2024, the Agency filed for Summary Adjudication on Count I (Effluent Violations).',
        hasConflict: false,
        legalTerms: ['summary adjudication'],
        reviewStatus: 'PENDING'
      }
    ],
    gaps: [
      {
        id: 's_gap_1',
        title: 'Missing "Interim Remediation Protocol of September 28"',
        referencedDocument: 'Groundwater Remediation Interim Protocol approval memo',
        description: 'Hearing transcripts refer to an approved interim protocol dated September 28, but neither party produced the written protocol into the record.',
        severity: 'CRITICAL',
        sourceSentence: 'Hearing transcript page 44 references "Groundwater Remediation Interim Protocol approved September 28", but this approval memo is omitted from the official record index.',
        discoveredInDocument: 'Administrative Hearing Transcript Vol. 2, p. 44'
      }
    ],
    explicitDeadlines: [
      {
        id: 's_dl_1',
        dueDate: '2023-12-15',
        dueDateDisplay: 'December 15, 2023',
        title: 'Submission of Corrective Containment Engineering Drawings',
        obligatedParty: 'Respondent (Sterling Mining Operations)',
        sourceSentence: 'Respondent shall submit corrective containment engineering drawings strictly by December 15, 2023.',
        sourceDocument: 'Hearing Examiner Order (Doc. 23, ¶ 1)',
        statutoryBasis: 'State Admin. Code § 310-8.2',
        isCourtMandated: true
      }
    ]
  }
];
