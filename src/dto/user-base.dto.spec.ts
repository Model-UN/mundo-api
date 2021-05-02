import { UserBaseDto } from './user-base.dto';

describe('UserBaseDto', () => {
  it('should be defined', () => {
    expect(new UserBaseDto()).toBeDefined();
  });
});
