import { Page, expect, Locator } from "@playwright/test";

export class RoomsPage {

    url: string;
    logoutButton: Locator;
    roomNameField: Locator;
    roomTypeMulticelect: Locator;
    roomPriceField: Locator;
    roomAccessibilitySelect: Locator;
    refreshementsCheckbox: Locator;
    createRoomButton: Locator;
    newRoomRow: Locator;
    newRoomRow2: Locator;
    deleteNewRoomButton: Locator;
    alertRoomNameMustBeSet: Locator;

    messagesNavbarButton: Locator;
  
  constructor(protected page: Page) {

    this.url = "https://automationintesting.online/admin/rooms";
    this.logoutButton = this.page.getByRole("button", {name: "Logout"});
    this.roomNameField = this.page.locator("#roomName");
    this.roomTypeMulticelect = this.page.locator("#type");
    this.roomPriceField = this.page.locator("#roomPrice");
    this.refreshementsCheckbox = this.page.locator("#refreshCheckbox");
    this.createRoomButton = this.page.locator("#createRoom");
    this.roomAccessibilitySelect = this.page.locator("#accessible");
    this.newRoomRow = this.page.locator(`//div[@data-testid="roomlisting"]`)
    .filter({hasText:"104"})
    .first();
    this.newRoomRow2 =  this.page.locator(`//div[@data-testid="roomlisting"]`)
    .filter({hasText:"undefined"});
    this.deleteNewRoomButton = this.page.locator(`//div[@data-testid="roomlisting"]`)
    .filter({hasText:"104"})
    .locator(`//span[@class="fa fa-remove roomDelete"]`)
    .first();
    this.alertRoomNameMustBeSet = this.page.getByText("Room name must be set");

    this.messagesNavbarButton = this.page.getByRole("link", {name: "Messages" })
  }

   async openRoomsPage(): Promise<void> {
    await this.page.goto("https://automationintesting.online/admin/rooms");
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  async createNewRoomWithRefreshements(roomType:string, roomName?:string, roomPrice?:string): Promise<void> {
    if (roomName === undefined) {
        roomName = ''
    }
    if (roomPrice === undefined) {
      roomPrice = ''
    }
    await this.roomNameField.fill(roomName);
    await this.roomTypeMulticelect.filter({hasText: roomType});
    await this.roomPriceField.fill(roomPrice);
    await this.refreshementsCheckbox.check();
    await this.createRoomButton.click();
  }

  async deleteNewRoom() : Promise<void> {
    await this.deleteNewRoomButton.click();

  }

  async goToEditRoomPage() : Promise<void> {
    await this.newRoomRow.click();
  }

  async goToMessagesTab(): Promise <void> {
    await this.messagesNavbarButton.click()
  }

  }



