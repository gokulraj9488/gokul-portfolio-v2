// The quietest, most emotionally-loaded section on the site — deliberately
// not a project list. It exists to answer one question: why does the way
// this engineer builds AI feel different? Not "because he made games" — the
// games are evidence, not the point. The point is the sentence below.
//
// heroImage is intentionally null until a real screenshot from the
// open-world project exists. No placeholder, no stock photo — an empty slot
// is more honest than a fake one. Set heroImage to an imported asset path
// and heroImageDims to its real {width, height} once it exists.

export const gameOrigin = {
  hook: 'The way I build AI didn’t come from AI.',
  bridge: 'It came from three worlds, built before this one.',
  heroImage: null,
  heroImageDims: null, // { width, height } — required once heroImage is set, for CLS-safe rendering
  heroImageAlt: 'The open-world island prototype, in Unity — the first of the three.',
  glimpses: [
    { label: 'Open World', line: 'An island with nothing to win — only a place to wander, and cows to pet.' },
    { label: 'Story', line: 'A story about being bullied online, lived from inside the person it happens to.' },
    { label: 'VR', line: 'A room where physics became something you could reach out and hold.' },
  ],
  closing: ['I never changed the way I think.', 'Only the problems I chose to solve.'],
}
