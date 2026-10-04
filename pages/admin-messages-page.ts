import { Page, expect, Locator } from "@playwright/test";

export class AdminMessagesPage {

    lastMessageContainerRow: Locator;

  
  constructor(protected page: Page) {
    this.lastMessageContainerRow = this.page.locator(`//div[@class="row detail read-false"]`).last();

  }


}