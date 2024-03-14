import { HighlightMentionsPipe } from './highlight-mentions.pipe';

describe('HighlightMentionsPipe', () => {
  it('create an instance', () => {
    const pipe = new HighlightMentionsPipe();
    expect(pipe).toBeTruthy();
  });
});
