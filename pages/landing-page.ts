import { Page, expect, Locator } from "@playwright/test";

export class LandingPage {
  url:string;

  adminLonginButton: Locator;
  bookRoomButton: Locator;
//datepicker
  checkinDate: Locator;
  checkoutDate: Locator;
  goToNextMonthButton: Locator;
  goToPreviousMonthButton: Locator;
//contact Form
  contactFormNameField: Locator;
  contactFormEmailField: Locator;
  contactFormPhoneField: Locator;
  contactFormSubjectField: Locator;
  contactFormMessageField: Locator;
  contactFormSubmitMessageButton: Locator;
  contactFormConfirmationWindow: Locator;
//contact form validation error messages
  contactFormNameisBlankError: Locator;
  contactFormEmailisBlankError:Locator;
  contactFormPhoenisBlankError: Locator;
  contactFormSubjectisBlankError: Locator;
  contactFormMessageisBlankError: Locator;
  contactFormSubjectLengthError: Locator;
  contactFormPhoneLengthError: Locator;
  contactFormMessageLengthError: Locator;
  contactFormEmailStructureError: Locator;
//Bookable rooms container
  bookableRoomsList: Locator;
//contact section
  contactSection: Locator;  
//footer
  footerAdminPanelLink: Locator;
  constructor(protected page: Page) {

    this.url = "https://automationintesting.online/"
    this.adminLonginButton = this.page.getByRole('link', { name: 'Admin', exact: true} );
    this.bookRoomButton = this.page.getByRole('link', {name: "Book now", exact: true}).first();
//datepicker
    this.checkinDate = this.page.locator(`.form-control`).first();
    this.checkoutDate = this.page.locator(`.form-control`).nth(1);
    this.goToNextMonthButton = this.page.getByRole("button", {name: "Next Month"});
    this.goToPreviousMonthButton = this.page.getByRole("button", {name: "Previous Month"});
//contact form fields
    this.contactFormNameField = this.page.locator(`[data-testid="ContactName"]`);
    this.contactFormEmailField = this.page.locator(`[data-testid="ContactEmail"]`);
    this.contactFormPhoneField = this.page.locator(`[data-testid="ContactPhone"]`);
    this.contactFormSubjectField = this.page.locator(`[data-testid="ContactSubject"]`);
    this.contactFormMessageField = this.page.locator(`[data-testid="ContactDescription"]`);
    this.contactFormSubmitMessageButton = this.page.getByRole("button", {name: "Submit"});
    this.contactFormConfirmationWindow = this.page.locator(`//h3[@class="h4 mb-4"]`).nth(1);
//contact form validation error messages
    this.contactFormNameisBlankError = this.page.getByText("Name may not be blank");
    this.contactFormEmailisBlankError = this.page.getByText("Email may not be blank");
    this.contactFormPhoenisBlankError = this.page.getByText("Phone may not be blank");
    this.contactFormSubjectisBlankError = this.page.getByText("Subject may not be blank");
    this.contactFormMessageisBlankError = this.page.getByText("Message may not be blank");
    this.contactFormSubjectLengthError = this.page.getByText("Subject must be between 5 and 100 characters.");
    this.contactFormPhoneLengthError = this.page.getByText("Phone must be between 11 and 21 characters.");
    this.contactFormMessageLengthError = this.page.getByText("Message must be between 20 and 2000 characters.");
    this.contactFormEmailStructureError = this.page.getByText("must be a well-formed email address");
//Bookable rooms container
    this.bookableRoomsList = this.page.locator(`//div[@class="col-md-6 col-lg-4"]`)
//contact section
    this.contactSection = this.page.locator(`//div[@class="card shadow-sm h-100"]`).nth(1);
// footer
    this.footerAdminPanelLink = this.page.getByRole("link", {name: "Admin panel"})
    
  }
 
  async openLandingPage(): Promise<void> {
    await this.page.goto("https://automationintesting.online/");
    await expect(this.page).toHaveURL(`https://automationintesting.online/`);
  }

  async goToAdminLoginPage(): Promise<void> {
    await expect(this.adminLonginButton).toBeVisible();
    await this.adminLonginButton.click()
  }

  async goToBookFirstRoom(): Promise<void> {
    await this.bookRoomButton.click()
} 

 // async choseReservationDate(checkin:string, checkout:string): Promise<void> {
 //   //open calendar
  //  await this.checkinDate.click();
  //  await this.

 // }

  async sendContactMessage(name:string, email:string, phone:string, subject:string, message:string): Promise <void> {
    await this.contactFormNameField.fill(name);
    await this.contactFormEmailField.fill(email);
    await this.contactFormPhoneField.fill(phone);
    await this.contactFormSubjectField.fill(subject);
    await this.contactFormMessageField.fill(message);
    await this.contactFormSubmitMessageButton.click();
  }

  async goToAdminPanelthroughFooter() : Promise <void> {
    this.footerAdminPanelLink.click();
  }



}