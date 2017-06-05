import { browser, by, element } from 'protractor';

export class HairbookPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('hb-root h1')).getText();
  }
}
