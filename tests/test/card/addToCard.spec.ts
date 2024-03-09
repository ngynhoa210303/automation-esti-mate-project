import test from "@playwright/test";
import { LoginPage } from "../../../page/login";
import { Verification } from "../../../page/verification";
import { AddToCard } from "../../../page/addToCard";
test("test verification", async ({ page }) => {
  const login = new LoginPage(page);
  await login.url;
  await login.login("anhdh.bhsoft+1@gmail.com");
  const verification = new Verification(page);
  await verification.fillVerificationCode([8, 8, 8, 8, 8, 8]);
  const addToCard = new AddToCard(page);
  await addToCard.addToCards();
});
