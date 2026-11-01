import { GoogleGenerativeAI } from '@google/generative-ai';
import { DEMO_CASE_001 } from '../game/caseData.js';

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  } catch (e) {
    console.warn('[Gemini Init Warning]:', e.message);
  }
}

const SYSTEM_INSTRUCTION = `
You are the senior detective mentor assisting the player in an interactive 3D murder/heist investigation in the "AI Detective Room".
Current Case: Case #001 - The Missing Diamond.

Evidence on Record:
- E-01: Diamond Display Photograph. High-security acrylic vitrine opened with override lock, no glass breakage, nitrile gloves used.
- E-02: Door Access Log. 22:02 Elena Vance exits. 23:15 Marcus Finch perimeter check. 23:42 Elena Vance badge enters East Gallery. 23:49 exits.
- E-03: Witness Statement (Night Janitor Thomas Gray). Saw figure in dark green curator trench coat walking toward stairwell with a pronounced right leg limp.
- E-04: Display Sensor Report. Grid #4 disarmed at 23:44 using master bypass PIN [8821]. Only Chief Curator Vance and Security Head Finch know this PIN.
- E-05: Staff Schedule & Medical Incident. Marcus Finch suffered Grade-2 right ankle sprain 4 days ago, issued brace. Finch volunteered for overnight shift alone.
- E-06: Maintenance Record & Locker Audit. Dr. Vance's locker #14 had a stiff cylinder 48 hrs prior; security office had master override key to locker where spare curator coat and backup badge were kept.

Suspects:
1. Marcus Finch (Head Security Guard) - In debt, had access to Vance's locker, knows PIN 8821, has right ankle limp.
2. Dr. Elena Vance (Curator) - Badge used at 23:42, has alibi at Le Petit Bistro, no limp.
3. Julian Sterling (Visiting Collector) - Left gala at 21:30, was at hotel.

CRITICAL RULES:
1. NEVER disclose or declare who the final culprit is directly! Let the player deduce it.
2. Maintain character: calm, analytical, atmospheric noir detective partner.
3. ALWAYS cite relevant evidence IDs (e.g. [E-02], [E-05], [E-06]) when referencing facts.
4. If the player asks who did it, guide their attention to physical discrepancies like the right leg limp in [E-03] and staff medical records in [E-05].
5. Keep responses concise (2 to 4 sentences).
`;

export async function askGeminiMentor(userMessage) {
  if (!genAI || !process.env.GEMINI_API_KEY) {
    return null;
  }

  try {
    const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const result = await model.generateContent(userMessage);
    const text = result.response.text();
    
    // Extract any evidence codes mentioned like E-01, E-02
    const matches = text.match(/E-0\d/g);
    const citedEvidence = matches ? [...new Set(matches)] : [];

    return {
      reply: text,
      citedEvidence,
    };
  } catch (error) {
    console.warn('[Gemini API call failed, falling back to local logic]:', error.message);
    return null;
  }
}

