 //@ts-nocheck

import { Page, expect, Locator } from "@playwright/test";
import { TIMEOUT } from "node:dns/promises";

export class BookRoomPage {
    url: string;
    firstReserveNowButton: Locator;
    reserverFirstNameField: Locator;
    reserverLastNameField: Locator;
    reserverEmail: Locator;
    reserverPhone: Locator;
    secondReserveTheRoom: Locator;
    reservationConfirmation: Locator;
    errorLogOfReservation: Locator;
    cancelReservationButton: Locator;
    pageError: Locator;

    constructor(protected page: Page) {

        this.url = `https://automationintesting.online/reservation/${1}`;
        this.firstReserveNowButton = this.page.getByRole("button", {name: "Reserve Now"}).first();
        this.reserverFirstNameField = this.page.getByPlaceholder("Firstname");
        this.reserverLastNameField = this.page.getByPlaceholder("Lastname");
        this.reserverEmail = this.page.getByPlaceholder("Email");
        this.reserverPhone = this.page.getByPlaceholder("Phone");
        this.secondReserveTheRoom = this.page.getByRole("button", {name: "Reserve Now", exact: true})
        this.reservationConfirmation = this.page.getByText("Your booking has been confirmed for the following dates:")
        this.errorLogOfReservation = this.page.getByRole("alert").first();
        this.cancelReservationButton = this.page.getByRole("button", {name: "Cancel"});
        this.pageError = this.page.getByText(`This page couldn’t load`)
    }
    
    async choseFirstRoom() : Promise <void> {
       
      await expect (async () => {await this.firstReserveNowButton.click()}).toPass();
    }

    async chooseDate(checkin:string, checkout:string): Promise <void> {
        await this.page.goto(`https://automationintesting.online/reservation/${1}?checkin=${checkin}&checkout=${checkout}`);
    }

    async fillReserverDetails (firstname:string, lastname:string, email:string, phone:string) : Promise<void> {
       
        await this.reserverFirstNameField.fill(firstname);
        await this.reserverLastNameField.fill(lastname);
        await this.reserverEmail.fill(email);
        await this.reserverPhone.fill(phone);
    }
    async secondReserveRoom(): Promise <void> {
        await this.secondReserveTheRoom.click();

}
    async cancelReservation(): Promise <void> {
        await this.cancelReservationButton.click();
    }


}