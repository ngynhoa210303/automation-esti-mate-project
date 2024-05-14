/**
 * Locator login
 */
export const url_estimate = "https://dev.esti-mateelectrical.bhsoft.co/login";
export const sign_in_button = "//button[@type='button']";
export const email_textbox = 'input[type="email"]';
export const password_textbox = 'input[type="password"]';
export const error_email_empty =
  '//p[contains(text(),"• Please enter a username or email")]';
export const error_password_empty =
  '//p[contains(text(),"• Please enter a password")]';
export const error_email_and_password_valid =
  '//p[contains(text(),"• Your email or password is incorrect")]';
export const error_email_wrong_format =
  '//div[@class="control has-icons-right"]/following-sibling::p[1]';
export const home_in_header = "//a[contains(text(),'Home')]";
export const account_header = "//a[@role='menuitem']";
export const sign_out_header = "//a[normalize-space()='Sign out']";
