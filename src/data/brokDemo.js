// A scripted walkthrough of Brok's actual behavior — NOT a live connection to
// the running system (this is a portfolio, not the product). Every behavior
// shown is real and shipped per the canonical doc: intent resolution,
// epistemic-state labeling, and refusal when the record can't support an
// answer. Labeled as illustrative throughout — same honesty pattern as every
// other "design intent" callout on this site.

export const brokDemo = {
  eyebrow: 'See it, don’t just read about it',
  title: 'Ask Brok something.',
  subhead:
    'A scripted walkthrough, not a live connection — but every behavior here is real and shipped: intent resolution, epistemic labeling, and refusal when the record can’t support an answer.',
  turns: [
    {
      question: 'Why was the checkout-agent prompt promoted to v8?',
      intent: 'resolved intent — prompt promotion rationale',
      state: 'Derived',
      answer:
        'v8 was promoted because it passed the evaluation profile v7 failed on hallucination detection — and the promoting engineer’s note is attached verbatim.',
      sources: ['AI Git — promotion record, checkout-agent v8', 'Evaluation job #4471 (v7, failing)', 'Evaluation job #4483 (v8, passing)'],
    },
    {
      question: 'Has this failure mode happened before?',
      intent: 'resolved intent — failure precedent lookup',
      state: 'Inferred',
      answer:
        'Two earlier failures on this artifact share a contributing cause with this one — a dataset drift in the same evaluation profile — though neither was tagged with this exact label at the time.',
      sources: ['Root Cause Explorer — failure chronology, checkout-agent', 'Forge Graph — Failure Graph, narrowed to checkout-agent'],
    },
    {
      question: 'What’s the current uptime of the recommendation agent?',
      intent: 'unresolved — no matching intent in the record',
      state: 'Unknown',
      answer:
        'I can’t answer that — uptime isn’t something this record tracks. What I can tell you: when it was last evaluated, what evidence covers its current configuration, and whether any promotion for it is missing evidence.',
      sources: [],
      refusal: true,
    },
  ],
}
