// Field notes — real defects, diagnosed to root cause and fixed. Sourced
// verbatim-in-substance from the canonical V2 doc's "Challenges Solved"
// section. Not blog posts: Problem, Investigation, Fix, Lesson, one paragraph
// each. This is the strongest evidence on the whole site — more convincing
// than another architecture diagram, because nobody fabricates a bug this
// specific.

export const fieldNotes = {
  eyebrow: 'Field notes',
  title: 'Things production taught me.',
  subhead: 'Four real defects, diagnosed to root cause and fixed — the actual chain of reasoning, not the highlight reel.',
  stories: [
    {
      id: 'heredoc',
      tag: 'CI/CD',
      title: 'The pipeline that had never once run',
      problem: 'The production deploy workflow looked configured and had a history of "completed" runs — but every single run had executed zero jobs.',
      investigation:
        'GitHub listed the workflow by its file path instead of its declared name, which — combined with the zero-jobs history — pointed at a parse failure rather than a logic bug. Traced it to the shell heredoc’s closing terminator sitting at column 0, which closed the enclosing YAML block scalar early and made the rest of the file unparsable.',
      fix: 'Indented the terminator to the block’s baseline so the heredoc stayed inside the YAML block scalar it belonged to.',
      lesson: 'A workflow that "shows green" and a workflow that "has ever executed" are different claims. Check both.',
    },
    {
      id: 'stdin',
      tag: 'CI/CD',
      title: 'The health check that checked nothing',
      problem: 'Every deployment reported success — unconditionally, whether or not anything had actually been verified.',
      investigation:
        'The remote deploy script is delivered over the shell’s stdin via bash -s. docker compose exec -T also attaches stdin by default — so the health-check exec consumed the remainder of the deploy script as its own input, bash hit EOF, and the step exited 0 without the health check ever running its own command.',
      fix: 'Proved it first with a minimal reproduction, then redirected stdin on every compose exec call in the pipeline.',
      lesson: 'Exit code 0 is not evidence anything happened.',
    },
    {
      id: 'nginx',
      tag: 'Infrastructure',
      title: '502s after every successful deploy',
      problem: 'Every backend deploy that succeeded was immediately followed by 502s.',
      investigation:
        'Nginx resolves upstream { server backend:8080; } once, at startup, and caches the resolved container IP. docker compose up -d gives a recreated backend container a new address while the unchanged Nginx container keeps running — so Nginx kept forwarding traffic to an IP that no longer existed.',
      fix: 'Reload Nginx as a deploy step, immediately after applying the new backend.',
      lesson: 'A successful deploy of one container can silently break a caching assumption in a container you never touched.',
    },
    {
      id: 'utf8',
      tag: 'Correctness',
      title: '115 corrupted characters, 23 files',
      problem: 'Repository-wide text corruption — 115 mojibake occurrences across 23 files.',
      investigation:
        'Traced to a specific, reproducible cause: Windows PowerShell 5.1’s Get-Content decodes as CP1252 by default, and a later Set-Content -Encoding utf8 re-encodes that already-wrong decoding — a read-modify-write round trip that silently damages any non-ASCII character.',
      fix: 'Repaired the corruption mechanically, by reversing the exact mis-decode, instead of pattern-matching and replacing visible broken strings. Then shipped a detection script and a CI workflow that fails the build if it recurs — and negative-tested the guard itself by planting a mis-decoded character to confirm it exits 1.',
      lesson: 'Fix the mechanism, not the symptom — and prove your own guardrail actually guards.',
    },
  ],
}
