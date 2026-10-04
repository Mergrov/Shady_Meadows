import { expect } from "@playwright/test";
import {test} from "../fixtures/base"
import { RoomsPage } from "../pages/rooms-page";
import { LandingPage } from "../pages/landing-page";
import { AdminLoginPage } from "../pages/admin-login-page";
import { EditRoomPage } from "../pages/edit-room-page";
import { AdminMessagesPage } from "../pages/admin-messages-page";
//TODO dopisz asercje na kazdym kroku

test ("TC-01 Login as admin", async ({page, landingPage, adminLoginPage}) => {

await landingPage.openLandingPage();
await landingPage.goToAdminLoginPage();
await adminLoginPage.loginAsAdmin("admin", "password");
await expect(page).toHaveURL(`https://automationintesting.online/admin/rooms`);
await expect(adminLoginPage.logoutButton).toBeVisible();
})

test ("TC-02 Login with wrong password", async ({page, landingPage, adminLoginPage, roomsPage}) => {

await landingPage.openLandingPage();
await landingPage.goToAdminLoginPage();
await adminLoginPage.loginAsAdmin("admin", "wrong_password");
await expect(page).toHaveURL(adminLoginPage.url);
await expect(adminLoginPage.invalidCredentialAlert).toBeVisible();
await roomsPage.openRoomsPage();
await expect(page).not.toHaveURL(roomsPage.url);
})

test ("TC-03 Login without providing any credentials", async ({page, landingPage, adminLoginPage, roomsPage }) => {

    await landingPage.openLandingPage();
    await landingPage.goToAdminLoginPage();
    await adminLoginPage.loginAsAdmin("", "");
    await expect(adminLoginPage.invalidCredentialAlert).toBeVisible();
    await expect(page).toHaveURL(adminLoginPage.url);
    await roomsPage.openRoomsPage();
    await expect(page).not.toHaveURL(roomsPage.url);
})

test ("TC-04 Logout as an admin", async ({page, landingPage, roomsPage, adminLoginPage}) => {

    await adminLoginPage.openAdminLoginPage();
    await adminLoginPage.loginAsAdmin("admin", "password");
    await expect(page).toHaveURL(roomsPage.url)
    await roomsPage.logout()
    await expect(page).not.toHaveURL(roomsPage.url);
    if(await page.url() === landingPage.url) {
        await expect(page).toHaveURL(landingPage.url)
    } else {
        await expect(page).toHaveURL(adminLoginPage.url)
    }

})

test ("TC-05 add new room", async ({page, adminLoginPage, roomsPage }) => {
    await adminLoginPage.openAdminLoginPage();
    await adminLoginPage.loginAsAdmin("admin", "password");
    await roomsPage.createNewRoomWithRefreshements("Single","104","300");
    await expect (page).toHaveURL(roomsPage.url);
    await expect (roomsPage.newRoomRow).toHaveText("104Singlefalse300Refreshments")
})

test ("TC-06 Attempt to add room without name", async ({roomsPage, adminLoginPage}) =>{

    await adminLoginPage.openAdminLoginPage();
    await adminLoginPage.loginAsAdmin("admin", "password");
    await roomsPage.createNewRoomWithRefreshements("Single", undefined, "300")
    await expect(roomsPage.alertRoomNameMustBeSet).toBeVisible();
   // await expect (roomsPage.newRoomRow).not.toBeVisible();
})

test ("TC-07 Deleting a room", async ({roomsPage, adminLoginPage}) => {
    await adminLoginPage.openAdminLoginPage();
    await adminLoginPage.loginAsAdmin("admin", "password");
    await roomsPage.deleteNewRoom();
    await expect (roomsPage.newRoomRow2).not.toBeVisible();

})

test ("TC-08 Editing a room", async ({roomsPage, adminLoginPage, editRoomPage}) => {
    await adminLoginPage.openAdminLoginPage();
    await adminLoginPage.loginAsAdmin("admin", "password");
    await roomsPage.createNewRoomWithRefreshements("Single","104","300");
    await roomsPage.goToEditRoomPage();
    await editRoomPage.editDescription("New Description for the Room!");
    expect (editRoomPage.descripion).toContainText("New Description for the Room!");

})

test ("TC-09 Pomyślna rezerwacja pokoju z poprawnymi danymi", async ({ landingPage, bookRoomPage}) => {
    await landingPage.openLandingPage();
    await landingPage.goToBookFirstRoom();
    await bookRoomPage.chooseDate("2026-10-10", "2026-10-13");
    await bookRoomPage.choseFirstRoom();
    await bookRoomPage.fillReserverDetails("Name1", "Surname1", 
        "zyx@zyx.com", "048555980643");
    await bookRoomPage.secondReserveRoom();
    await expect (bookRoomPage.reservationConfirmation).toBeVisible();

})

test("TC-10 Próba rezerwacji bez wypełnienia wymaganych pól", async ({landingPage, bookRoomPage}) => {

    await landingPage.openLandingPage();
    await landingPage.goToBookFirstRoom();
    await bookRoomPage.chooseDate("2026-10-10", "2026-10-13")
    await bookRoomPage.choseFirstRoom();
    await bookRoomPage.fillReserverDetails("","","","");
    await bookRoomPage.secondReserveRoom();
    await expect (bookRoomPage.reservationConfirmation).not.toBeVisible();
})

test ("TC-11 Próba rezerwacji z nieprawidłowym adresem e-mail", async ({landingPage, bookRoomPage}) => {

    await landingPage.openLandingPage();
    await landingPage.goToBookFirstRoom();
    await bookRoomPage.chooseDate("2026-10-10", "2026-10-13");
    await bookRoomPage.choseFirstRoom();
    await bookRoomPage.fillReserverDetails("Name1", "Surname1", 
        "zz.oo", "048555980643");
    await bookRoomPage.secondReserveRoom();
    await expect(bookRoomPage.errorLogOfReservation).toContainText("must be a well-formed email address")
    
})

test ("TC-12 Próba rezerwacji z datą wymeldowania wcześniejszą niż zameldowania", async ({landingPage, bookRoomPage}) => {

    await landingPage.openLandingPage();
    await landingPage.goToBookFirstRoom();
    await bookRoomPage.chooseDate("2026-10-13", "2026-10-10");
    await bookRoomPage.choseFirstRoom();
    await bookRoomPage.fillReserverDetails("Name1", "Surname1", 
        "zyx@zyx.com", "048555980643");
    await bookRoomPage.secondReserveRoom();
    await expect (bookRoomPage.errorLogOfReservation).toBeVisible()
})

test ("TC-13 Próba rezerwacji już zajętego terminu", async ({page, landingPage, bookRoomPage}) => {
for(let i=0; i<=1; i++) {
    await landingPage.openLandingPage();
    await landingPage.goToBookFirstRoom();
    await bookRoomPage.chooseDate("2026-10-14", "2026-10-17");
    await bookRoomPage.choseFirstRoom();
    await bookRoomPage.fillReserverDetails("Name1", "Surname1", 
        "zyx@zyx.com", "048555980643");
    await bookRoomPage.secondReserveRoom();
}
await expect(bookRoomPage.pageError).toBeVisible()
})

test ("TC-14 Anulowanie formularza rezerwacji", async ({page,landingPage, bookRoomPage}) => {
    await landingPage.openLandingPage();
    await landingPage.goToBookFirstRoom();
    await bookRoomPage.chooseDate("2026-10-10", "2026-10-13");
    await bookRoomPage.choseFirstRoom();
    await bookRoomPage.fillReserverDetails("Name1", "Surname1", 
        "zyx@zyx.com", "048555980643");
    await bookRoomPage.cancelReservation();
    await expect (bookRoomPage.reservationConfirmation).not.toBeVisible();
    await expect (page).toHaveURL(bookRoomPage.url+"?checkin="+"2026-10-10"+"&checkout="+"2026-10-13")
    
})

test ("TC-15 Wysłanie wiadomości z poprawnymi danymi", async ({landingPage}) => {
    await landingPage.openLandingPage();
    await landingPage.sendContactMessage("name1", "zwy@zwy.com", "048999888777", "TestSubejct", "The description of the test message!.,,.");
    await expect(landingPage.contactFormConfirmationWindow).toContainText("Thanks for getting in touch ")
})

test ("TC-16 Próba wysłania bez wypełnienia wymaganych pól", async ({landingPage}) => {
    await landingPage.openLandingPage();
    await landingPage.sendContactMessage("", "", "", "", "");
    await expect(landingPage.contactFormConfirmationWindow).not.toBeVisible();
    await expect(landingPage.contactFormNameisBlankError).toBeVisible();
    await expect(landingPage.contactFormPhoenisBlankError).toBeVisible();
    await expect(landingPage.contactFormEmailisBlankError).toBeVisible();
    await expect(landingPage.contactFormSubjectisBlankError).toBeVisible();
    await expect(landingPage.contactFormMessageisBlankError).toBeVisible()
})

test ("TC-17 Próba wysłania z nieprawidłowym e-mailem", async ({landingPage}) => {
    await landingPage.openLandingPage();
    await landingPage.sendContactMessage("Name1", "dddd", "048999888777", "TestSubejct", "The description of the test message!.,,.");
    await expect(landingPage.contactFormEmailStructureError).toBeVisible();
    
})

test ("TC-18 Próba wysłania zbyt krótkiej wiadomości", async ({landingPage}) => {
    await landingPage.openLandingPage();
    await landingPage.sendContactMessage("Name1", "zwt@zwt.com", "048999888777", "TestSubejct", "!");
    await expect(landingPage.contactFormMessageLengthError).toBeVisible();
    
})

test ("TC-19 Wiadomość kontaktowa widoczna w panelu admina", async ({adminLoginPage, landingPage, roomsPage, adminMessagesPage}) => {
    await landingPage.openLandingPage();
    await landingPage.sendContactMessage("name1", "zwy@zwy.com", "048999888777", "TestSubejct", "The description of the test message!.,,.");
    await expect(landingPage.contactFormConfirmationWindow).toContainText("Thanks for getting in touch ");
    await adminLoginPage.openAdminLoginPage();
    await adminLoginPage.loginAsAdmin("admin", "password");
    await roomsPage.goToMessagesTab();
    await expect(adminMessagesPage.lastMessageContainerRow).toBeVisible();

})

test ("TC-20 Wyświetlanie listy dostępnych pokoi", async ({landingPage}) => {
    const listLength = await landingPage.bookableRoomsList.count();
    await landingPage.openLandingPage();
    for (let i = 0; i<=listLength; i++){
        await expect(landingPage.bookableRoomsList.nth(i)).toContainText("Book now");
        await expect(landingPage.bookableRoomsList.nth(i).getByRole("link", {name: "Book now"})).toBeVisible()
    }

})

test ("TC-21 Sekcja kontaktowa widoczna na stronie głównej", async ({landingPage}) => {
    await landingPage.openLandingPage();
    await expect(landingPage.contactSection.locator(`//div[@class="d-flex mb-4"]`).nth(0)).toContainText("Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA");
    await expect(landingPage.contactSection.locator(`//div[@class="d-flex mb-4"]`).nth(1)).toContainText("012345678901") 
    await expect(landingPage.contactSection.locator(`//div[@class="d-flex mb-4"]`).nth(2)).toContainText("fake@fakeemail.com")
})

test ("TC-22 Link do panelu admina dostępny na stronie głównej", async ({page,landingPage,adminLoginPage}) => {
    await landingPage.openLandingPage();
    await landingPage.goToAdminPanelthroughFooter()
    await expect(page).toHaveURL(adminLoginPage.url)
    
})