import { test as base } from "@playwright/test";
import { LandingPage } from "../pages/landing-page";
import { AdminLoginPage } from "../pages/admin-login-page";
import { RoomsPage } from "../pages/rooms-page";
import { EditRoomPage } from "../pages/edit-room-page";
import { BookRoomPage } from "../pages/book-room-page";
import { AdminMessagesPage } from "../pages/admin-messages-page";


 
type Fixtures = {
  adminLoginPage: AdminLoginPage;
  landingPage: LandingPage;
  roomsPage: RoomsPage;
  editRoomPage: EditRoomPage;
  bookRoomPage: BookRoomPage;
  adminMessagesPage: AdminMessagesPage

};
 
export const test = base.extend<Fixtures>({

  adminLoginPage: async ({ page }, use) => {
    await use(new AdminLoginPage(page));
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));

  },
  roomsPage: async ({page}, use) => {
    await use(new RoomsPage(page))

  },
  editRoomPage: async ({ page }, use) => {
    await use(new EditRoomPage(page))

  },
  bookRoomPage: async ({ page }, use) => {
    await use(new BookRoomPage(page))
  },
  adminMessagesPage: async ({page}, use) => {
    await use(new AdminMessagesPage(page))
  }

});