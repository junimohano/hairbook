import { HairbookPage } from './app.po';

describe('hairbook App', () => {
  let page: HairbookPage;

  beforeEach(() => {
    page = new HairbookPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to hb!!'))
      .then(done, done.fail);
  });
});
