# AI Detective Room - Game Design Document (GDD)

## 1. Visual & Environmental Design
- **Theme:** Cinematic, atmospheric detective investigation room.
- **Atmosphere:** Dark, moody noir aesthetic with warm desk lamps, amber glow, midnight blue shadows, and ambient rain outside the window.
- **Lighting Model:**
  - Ambient base light (low intensity, midnight blue).
  - Primary directional spotlight/point lights (warm amber desk lamp, corkboard overhead illumination).
  - Subtle interactive emissive glow for examine targets.

## 2. Interactive Objects in the 3D Room
1. **Investigation Corkboard:**
   - Visual: Wooden frame with cork texture, pinned suspect photos, news clippings, and red yarn connections.
   - Interaction: Clicking opens the full-screen interactive evidence linking board.
2. **Detective Desk:**
   - Visual: Mahogany desk with green banker lamp, case folders, magnifying glass, and tape recorder.
   - Interaction: Access current case files, briefing documents, and audio transcripts.
3. **Filing Cabinet:**
   - Visual: Steel olive-gray four-drawer cabinet.
   - Interaction: Retrieve unlocked case records, archival documents, and suspect background checks.
4. **Computer Terminal:**
   - Visual: Retro-modern CRT or secure terminal interface.
   - Interaction: Search digital logs, timecards, and security card access scans.
5. **Verdict Station / Safe:**
   - Visual: Dedicated final evaluation station with typewriter or secure report briefcase.
   - Interaction: Lock in the official indictment, select prime suspect, attach supporting evidence, and submit final deduction.

## 3. Controls & Navigation
- **First-Person Navigation:**
  - `W, A, S, D`: Physical motion inside the 3D office boundaries with collision clamping.
  - Mouse movement: Smooth first-person camera yaw and pitch.
  - `E` or Click: Interact with targeted objects within range.
  - `Tab`: Quick toggle for Detective Journal & Evidence Inventory.
  - `Esc`: Pause menu / settings.
- **Point-and-Click Mode (Fallback & Accessibility):**
  - Smooth camera lerping between key stations (Desk, Board, Cabinet, Terminal, Room Overview) for players preferring mouse-only navigation.

## 4. Detective Mentor AI (Gemini) Integration
- **Role:** Logical sounding board and senior investigator.
- **Tone:** Methodical, observant, inquisitive, non-spoiling.
- **Mechanics:**
  - Evaluates player hypotheses against collected evidence.
  - Points out logical inconsistencies without revealing culprit.
  - 3-tier progressive hint system (Subtle, Directed, Strong).

