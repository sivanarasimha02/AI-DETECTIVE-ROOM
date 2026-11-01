const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

// Default embedded fallback data matching Case #001
export const FALLBACK_CASE = {
  id: '001',
  caseNumber: 'CASE #001',
  title: 'The Missing Diamond',
  difficulty: 'Medium',
  setting: 'Museum Exhibition Room at Night',
  description: 'A priceless sapphire-cut diamond vanished from a secured exhibition hall during the midnight shift. All physical locks were untouched, but security logs and witness testimonies tell a tangled story.',
  objectives: [
    { id: 'obj_1', title: 'Inspect Crime Scene Manifest', description: 'Examine the crime scene photographs on the central desk (E-01).', requiredEvidenceId: 'E-01' },
    { id: 'obj_2', title: 'Examine Electronic Security Logs', description: 'Access the security terminal to review door entry timestamps (E-02).', requiredEvidenceId: 'E-02' },
    { id: 'obj_3', title: 'Review Witness Statement', description: 'Inspect the night janitor interview transcript (E-03).', requiredEvidenceId: 'E-03' },
    { id: 'obj_4', title: 'Analyze Sensor Override Data', description: 'Inspect forensic report on the laser grid override code (E-04).', requiredEvidenceId: 'E-04' },
    { id: 'obj_5', title: 'Inspect Staff Shift Roster', description: 'Check the filing cabinet for security guard and curator shift details (E-05).', requiredEvidenceId: 'E-05' },
    { id: 'obj_6', title: 'Check Maintenance & Locker Logs', description: 'Review the locker incident report and keycard discrepancies (E-06).', requiredEvidenceId: 'E-06' },
    { id: 'obj_7', title: 'Submit Final Indictment', description: 'Identify the perpetrator, select the corroborating evidence, and present your theory at the Verdict Station.' },
  ],
  suspects: [
    {
      id: 'suspect_1',
      name: 'Marcus Finch',
      role: 'Head Security Guard',
      profile: '12-year museum veteran who coordinates overnight monitoring and keycard issuance.',
      motive: 'Heavily indebted to illicit gambling syndicates; recently denied a salary advance.',
      alibi: 'Claims he was in the downstairs surveillance booth between 23:30 and 00:30, never entering the East Wing exhibition.',
      statement: 'I checked the locks at 23:00. Everything was secure. Elena was the last one with authorized master access.',
      evidenceReferences: ['E-02', 'E-05', 'E-06'],
    },
    {
      id: 'suspect_2',
      name: 'Dr. Elena Vance',
      role: 'Museum Curator',
      profile: 'Distinguished art historian who personally curated the Royal Sapphire Diamond exhibit.',
      motive: 'Rumored to be facing demotion following an audit discrepancy in acquisitions.',
      alibi: 'Claims she clocked out at 22:00, attended dinner across town at Le Petit Bistro, and forgot her badge in her office locker.',
      statement: 'I left the gallery before 10 PM. If my badge was scanned at 23:42, someone took it from my locker!',
      evidenceReferences: ['E-02', 'E-03', 'E-04'],
    },
    {
      id: 'suspect_3',
      name: 'Julian Sterling',
      role: 'Visiting Collector',
      profile: 'Wealthy antiquities dealer who offered to buy the diamond privately two weeks prior.',
      motive: 'Coveted the diamond for his private vault; contractually bound to leave the country tomorrow.',
      alibi: 'Was seen at the museum gala until 21:30, returned to his hotel suite at The Grand.',
      statement: 'I admired the piece, yes, but I do my trading with contracts, not by creeping through dark hallways.',
      evidenceReferences: ['E-01', 'E-03'],
    },
  ],
  evidence: [
    {
      id: 'E-01',
      evidenceCode: 'E-01',
      title: 'Diamond Display Photograph',
      location: 'Detective Desk',
      description: 'High-resolution forensic photo of the empty velvet pedestal inside the glass vitrine.',
      extractedText: 'Forensic notes: Acrylic case opened without glass breakage. High-security electronic bolt released smoothly via authorized override mechanism. No fingerprints on exterior glass, suggesting nitrile gloves.',
      observations: [
        'No forced entry or broken glass.',
        'Electronic lock opened with valid authentication.',
        'Perpetrator knew how to bypass glass vibration alarms.',
      ],
    },
    {
      id: 'E-02',
      evidenceCode: 'E-02',
      title: 'Door Access Log',
      location: 'Security Terminal',
      description: 'Digital printout from the East Wing gallery access reader between 22:00 and 00:30.',
      extractedText: '22:02 - Staff Exit: E. Vance (Badge #042)\n23:15 - Perimeter Check: M. Finch (Badge #007)\n23:42 - East Gallery Entry: E. Vance (Badge #042)\n23:49 - East Gallery Exit: E. Vance (Badge #042)',
      observations: [
        'Curator Elena Vance’s badge was logged entering at 23:42, directly conflicting with her bistro alibi.',
        'Guard Marcus Finch completed a check nearby 27 minutes prior.',
      ],
    },
    {
      id: 'E-03',
      evidenceCode: 'E-03',
      title: 'Witness Statement - Night Janitor',
      location: 'Investigation Corkboard',
      description: 'Recorded audio transcription from Thomas Gray, overnight custodian.',
      extractedText: 'At around quarter to midnight, I was buffing the North corridor floor. I saw a figure in the dark green curator trench coat walking toward the service stairwell. They walked with a distinct limp on their right leg. I yelled hello, but they pulled up their collar and hurried away.',
      observations: [
        'Perpetrator wore the curator’s distinctive green staff trench coat.',
        'Perpetrator was limping noticeably on the right leg.',
        'Dr. Elena Vance has no physical injury or limp.',
      ],
    },
    {
      id: 'E-04',
      evidenceCode: 'E-04',
      title: 'Display Sensor Report',
      location: 'Forensic Lab Table',
      description: 'Electronic diagnostic report from the vitrine optical sensors.',
      extractedText: 'Sensor grid #4 disarmed at 23:44:12 using master bypass PIN [8821]. Sensor re-engaged at 23:47:05. Master PIN [8821] is held only by Chief Curator Vance and Security Head Finch.',
      observations: [
        'Only two individuals possessed the PIN: Elena Vance and Marcus Finch.',
        'The theft took less than 3 minutes.',
      ],
    },
    {
      id: 'E-05',
      evidenceCode: 'E-05',
      title: 'Staff Schedule & Medical Incident Roster',
      location: 'Filing Cabinet',
      description: 'Internal HR schedule and incident log for museum staff.',
      extractedText: 'Employee Health Incident (4 days ago): Marcus Finch sustained Grade-2 right ankle sprain during loading bay inspection; advised light duty, issued brace.\nShift Roster: Finch volunteered for double night shift on 24th.',
      observations: [
        'Marcus Finch has an active right ankle sprain causing a limp.',
        'Finch volunteered to stay on duty alone overnight.',
      ],
    },
    {
      id: 'E-06',
      evidenceCode: 'E-06',
      title: 'Maintenance Record & Locker Audit',
      location: 'Filing Cabinet',
      description: 'Facilities maintenance ticket logged 48 hours prior to the incident.',
      extractedText: 'Ticket #409: Staff Locker #14 (Dr. E. Vance) lock cylinder reported stiff. Security office requested master key override. Spare curator uniform coat and backup lanyard badge #042 stored inside.',
      observations: [
        'Security had master access to Elena Vance’s locker containing her spare badge and coat.',
        'Finch had physical access to frame Dr. Vance.',
      ],
    },
  ],
};

export async function getCaseDetails(caseId) {
  try {
    const res = await fetch(`${API_BASE}/cases/${caseId}`);
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data;
  } catch {
    return FALLBACK_CASE;
  }
}

export async function recordEvidenceDiscovery(investigationId, evidenceCode) {
  try {
    const res = await fetch(`${API_BASE}/investigations/${investigationId}/evidence/${evidenceCode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to record evidence');
    return await res.json();
  } catch (err) {
    const matched = FALLBACK_CASE.evidence.find(e => e.evidenceCode === evidenceCode);
    return {
      success: true,
      discoveredEvidence: matched,
    };
  }
}

export async function askGemini(investigationId, message) {
  try {
    const res = await fetch(`${API_BASE}/investigations/${investigationId}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error('Chat failed');
    return await res.json();
  } catch {
    return {
      success: true,
      reply: 'I recommend cross-referencing the access logs (E-02) with the night janitor’s statement (E-03) and the staff medical injury report (E-05). Look for physical markers that contradict the alibis.',
      citedEvidence: ['E-02', 'E-03', 'E-05'],
      role: 'assistant',
    };
  }
}

export async function requestHint(investigationId, level) {
  try {
    const res = await fetch(`${API_BASE}/investigations/${investigationId}/hints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level }),
    });
    if (!res.ok) throw new Error('Hint request failed');
    return await res.json();
  } catch {
    const hints = {
      1: 'Look closely at the physical traits reported by the night janitor in E-03 and compare them with the staff records.',
      2: 'Dr. Elena Vance’s badge was scanned at 23:42, but did she actually wear it? Review the maintenance ticket in E-06 and the medical report in E-05.',
      3: 'Marcus Finch had access to Vance’s locker, knew the sensor bypass PIN [8821], and suffers from a right ankle sprain matching the janitor’s eyewitness account.',
    };
    return {
      success: true,
      hint: { level, text: hints[level] || hints[1] },
    };
  }
}

export async function submitVerdict(investigationId, payload) {
  try {
    const res = await fetch(`${API_BASE}/investigations/${investigationId}/verdict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Verdict submission failed');
    return await res.json();
  } catch {
    const isCorrect = payload.suspectId === 'suspect_1';
    return {
      success: true,
      data: {
        isCorrect,
        culpritScore: isCorrect ? 40 : 0,
        evidenceScore: 25,
        reasoningScore: 25,
        hintPenalty: 0,
        finalScore: isCorrect ? 90 : 25,
        maxScore: 100,
        feedback: isCorrect
          ? 'Case Solved! You deduced Marcus Finch’s scheme using the ankle injury, locker access, and sensor PIN.'
          : 'Incorrect culprit indictment. The physical evidence points elsewhere.',
      },
    };
  }
}

