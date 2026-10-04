import { Page, expect, Locator } from "@playwright/test";

export class EditRoomPage {
   // url: string;
    editRoomButton: Locator;
    descriptionField: Locator;
    confirmUpdateButton: Locator;
    descripion: Locator;

    constructor(protected page: Page) {

        //this.url = `https://automationintesting.online/admin/room/`;
        this.editRoomButton = this.page.getByRole("button", {name : "Edit", exact:true});
        this.descriptionField = this.page.locator("#description");
        this.confirmUpdateButton = this.page.locator("#update");
        this.descripion = this.page.locator(`//div[@class="col-sm-6"]`).nth(1);
    }
    
    async editDescription (description:string) : Promise<void> {
        await this.editRoomButton.click();
        await this.descriptionField.fill(description)
        await this.confirmUpdateButton.click();
    }
}