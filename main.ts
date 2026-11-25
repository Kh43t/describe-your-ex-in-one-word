// Describe Your Ex in One Word — a make.fun program/v1 entry.
//
// The program writes exactly one word to /output/entry.txt: the verdict
// on an ex. The word is fixed, so the program's job is to prove the word
// is shaped right before it writes it: exactly one word, 1-111
// characters, real content, and no trailing newline.
//
// The word: Placeholder.
// An ex who was never the real thing — only the person holding the place
// until the real one arrived. The joke lands at a glance: not a person,
// a placeholder. It is a verdict, not a plain insult; it is surprising
// without needing a caption; and anyone who has had an ex has either
// been one or had one, so the laugh comes with a nod.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD = "Placeholder";

const OUTPUT_FILE = "/output/entry.txt";
const LONGEST_ALLOWED = 111;

function checkWord(word: string): void {
  if (word.trim().length === 0) {
    throw new Error("the word must not be blank");
  }
  if (word.length > LONGEST_ALLOWED) {
    throw new Error(
      `the word must be at most ${LONGEST_ALLOWED} characters, got ${word.length}`,
    );
  }
  if (/\s/.test(word)) {
    throw new Error("the entry must be exactly one word");
  }
  // No punctuation tricks: the verdict must be letters alone, so the
  // judge reads a word, not a gimmick.
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("the entry must be letters only");
  }
}

checkWord(WORD);
mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
writeFileSync(OUTPUT_FILE, WORD, "utf8");

// Read the file back and prove it holds exactly the word, byte for byte,
// with no trailing newline and nothing else attached.
const written = readFileSync(OUTPUT_FILE, "utf8");
if (written !== WORD) {
  throw new Error(
    `wrote ${JSON.stringify(written)} instead of ${JSON.stringify(WORD)}`,
  );
}
