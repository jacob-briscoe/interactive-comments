import { UserPicturePipe } from './user-picture.pipe';

describe('UserPicturePipe', () => {
  it('create an instance', () => {
    const pipe = new UserPicturePipe();
    expect(pipe).toBeTruthy();
  });
});
