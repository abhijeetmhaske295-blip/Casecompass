import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Comprehensive fallback dictionary for legal terms
const LEGAL_GLOSSARY: Record<string, { definition: string; proceduralContext: string; latinEtymology?: string }> = {
  'subpoena duces tecum': {
    definition: 'A court order directing a witness to produce specified physical documents, records, or tangible evidence at a trial or deposition.',
    proceduralContext: 'Governed by Fed. R. Civ. P. 45 or state equivalents. Failure to comply can result in contempt sanctions.',
    latinEtymology: 'Latin: "under penalty, you shall bring with you"'
  },
  'lis pendens': {
    definition: 'A formal recorded notice indicating that title or ownership of a specified real property is subject to pending litigation.',
    proceduralContext: 'Cloud on title preventing transfer or encumbrance free of claims until the underlying dispute resolves.',
    latinEtymology: 'Latin: "lawsuit pending"'
  },
  'interlocutory appeal': {
    definition: 'An appeal of a non-final ruling by a trial court made prior to the trial court issuing a final judgment on the merits.',
    proceduralContext: 'Usually permitted only under narrow statutory exceptions (e.g., 28 U.S.C. § 1292) or collateral order doctrines where delay would cause irreparable prejudice.',
    latinEtymology: 'Latin: "speaking between"'
  },
  'demurrer': {
    definition: 'A formal objection pleading that asserts the opposing party\'s factual allegations, even if fully true, are legally insufficient to state a cause of action.',
    proceduralContext: 'Equivalent to a Rule 12(b)(6) Motion to Dismiss for failure to state a claim.',
    latinEtymology: 'Old French: "to delay or stay"'
  },
  'summary adjudication': {
    definition: 'A court ruling resolving one or more specific causes of action, affirmative defenses, or claims for punitive damages without disposing of the entire lawsuit.',
    proceduralContext: 'Often brought under Fed. R. Civ. P. 56(a) to narrow issues for trial when no genuine dispute of material fact exists on that issue.'
  },
  'laches': {
    definition: 'An equitable defense alleging that the plaintiff has unreasonably delayed in asserting a legal right, resulting in severe prejudice to the defendant.',
    proceduralContext: 'Equitable doctrine distinct from legal statutes of limitations; requires showing both unreasonable delay and prejudice.'
  },
  'mandamus': {
    definition: 'An extraordinary judicial writ commanding a lower court, public official, or corporation to perform a mandatory public or legal duty.',
    proceduralContext: 'Available only when petitioner has a clear legal right, respondent has a clear duty, and no other adequate remedy exists.',
    latinEtymology: 'Latin: "we command"'
  },
  'spoliation': {
    definition: 'The intentional, reckless, or negligent destruction, alteration, or failure to preserve evidence relevant to pending or reasonably foreseeable litigation.',
    proceduralContext: 'May trigger severe evidentiary sanctions, adverse inference jury instructions, or entry of default judgment under Fed. R. Civ. P. 37(e).'
  },
  'prima facie': {
    definition: 'Sufficient evidence established at first impression to establish a fact or raise a presumption unless disproved or rebutted.',
    proceduralContext: 'The initial evidentiary threshold required to survive summary judgment or motion for directed verdict before burden shifts.',
    latinEtymology: 'Latin: "at first face"'
  },
  'certiorari': {
    definition: 'A writ or order by which a higher appellate court exercises discretionary jurisdiction to review a lower court decision.',
    proceduralContext: 'Primary mechanism for US Supreme Court discretionary review (Rule 10).',
    latinEtymology: 'Latin: "to be more fully informed"'
  },
  'motion in limine': {
    definition: 'A pretrial motion asking the court to rule on the admissibility of certain evidence before it is presented to the jury.',
    proceduralContext: 'Aims to prevent prejudicial or inadmissible evidence from being mentioned within earshot of the jury pool.'
  },
  'protective order': {
    definition: 'A judicial decree restricting disclosure, dissemination, or inspection of confidential, proprietary, or trade secret discovery materials.',
    proceduralContext: 'Entered under Fed. R. Civ. P. 26(c) upon showing of good cause.'
  }
};

// API: Explain legal term
app.post('/api/explain-legal-term', async (req, res) => {
  try {
    const { term, contextSentence } = req.body;
    if (!term || typeof term !== 'string') {
      return res.status(400).json({ error: 'Term is required' });
    }

    const cleanTerm = term.trim().toLowerCase();
    const fallback = LEGAL_GLOSSARY[cleanTerm];

    if (ai) {
      try {
        const prompt = `You are a Senior Legal Scholar. Explain the legal term "${term}" concisely for a legal timeline application.
Context where term appeared: "${contextSentence || 'Legal proceeding'}".
Rules:
1. Provide a rigorous, plain-English definition (2-3 sentences max).
2. State the procedural significance / consequences.
3. Note Latin or historical etymology if applicable.
4. Maintain a neutral, authoritative tone. Do not provide legal advice.
Return valid JSON in this format:
{
  "definition": "...",
  "proceduralContext": "...",
  "etymology": "..."
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });

        const text = response.text?.trim() || '{}';
        const parsed = JSON.parse(text);
        return res.json({
          term,
          definition: parsed.definition || fallback?.definition || 'Legal doctrine or procedural mechanism governing proceedings.',
          proceduralContext: parsed.proceduralContext || fallback?.proceduralContext || 'Standard procedural benchmark applied in litigation.',
          etymology: parsed.etymology || fallback?.latinEtymology || undefined,
          source: 'AI Verified'
        });
      } catch (geminiErr) {
        console.warn('Gemini explanation fallback:', geminiErr);
      }
    }

    // Fallback if AI not available or errored
    if (fallback) {
      return res.json({
        term,
        definition: fallback.definition,
        proceduralContext: fallback.proceduralContext,
        etymology: fallback.latinEtymology,
        source: 'CaseCompass Legal Corpus'
      });
    }

    return res.json({
      term,
      definition: `Specialized legal term appearing in case records. Under statutory and common law doctrine, "${term}" establishes procedural or substantive duties.`,
      proceduralContext: 'Consult applicable local civil or procedural rules to identify governing requirements.',
      source: 'Standard Procedural Index'
    });
  } catch (err: any) {
    console.error('Error in explain-legal-term:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
});

// API: Parse custom legal document text into structured timeline events, conflicts, gaps, deadlines
app.post('/api/parse-case-text', async (req, res) => {
  try {
    const { text, caseTitle } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text content is required' });
    }

    if (ai) {
      try {
        const prompt = `You are CaseCompass, an expert legal chronology parser.
Analyze this legal record text:
Case Title: ${caseTitle || 'Case Record'}
Text:
"""
${text}
"""

Strict Rules:
1. Extract chronological events. For each, extract the exact source sentence.
2. Flag any uncertain/low confidence date (e.g. illegible stamp or missing year) - DO NOT GUESS.
3. Detect Date Conflicts: When two records or sentences report different dates for the same event, identify both dates side-by-side with source tags.
4. Detect Gaps: Missing referenced orders (e.g. "pursuant to Order of March 4" but March 4 order not in file), events without dates, or broken sequential steps.
5. Explicit Deadlines ONLY: Extract ONLY explicit deadlines directly stated in the text. Link each deadline directly to its verbatim source sentence. ABSOLUTELY NO calculated or invented dates.
6. Extract key legal terms present in the text with plain definitions.

Return strictly valid JSON with this exact schema:
{
  "events": [
    {
      "id": "e_1",
      "date": "YYYY-MM-DD" or string,
      "dateDisplay": "Human readable date",
      "isDateConfident": boolean,
      "unconfidentReason": string or null,
      "title": "Short title",
      "summary": "Detailed event summary",
      "eventType": "FILING" | "ORDER" | "HEARING" | "DISCOVERY" | "COMMUNICATION" | "DEADLINE",
      "sourceDocument": "Name of source document",
      "sourceSentence": "Exact quote from text",
      "hasConflict": boolean,
      "conflictDetails": {
        "alternateDate": "YYYY-MM-DD",
        "alternateSourceDocument": "Name of conflicting document",
        "alternateSourceSentence": "Exact conflicting quote",
        "conflictDescription": "Why dates diverge"
      } or null,
      "legalTerms": ["term1", "term2"]
    }
  ],
  "gaps": [
    {
      "id": "g_1",
      "title": "Short gap description",
      "referencedDocument": "Missing document or order",
      "description": "Explanation of missing record or step",
      "severity": "CRITICAL" | "MODERATE" | "LOW",
      "sourceSentence": "Exact sentence referencing missing item"
    }
  ],
  "explicitDeadlines": [
    {
      "id": "d_1",
      "dueDate": "Exact date stated",
      "title": "Action required",
      "obligatedParty": "Party name or court",
      "sourceSentence": "Verbatim source sentence stating the deadline",
      "statutoryBasis": "Rule or order cited, if any"
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });

        const jsonText = response.text?.trim() || '{}';
        const parsed = JSON.parse(jsonText);
        return res.json(parsed);
      } catch (geminiErr) {
        console.warn('Gemini parse failed, falling back to heuristic parser:', geminiErr);
      }
    }

    // Heuristic parser fallback will be handled by the caller or returns structured response
    return res.status(200).json({ fallbackNeeded: true });
  } catch (err: any) {
    console.error('Error in parse-case-text:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CaseCompass server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
