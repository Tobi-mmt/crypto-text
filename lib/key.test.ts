import { getKeyFromRouter } from "./key";

it("should return key from URL", () => {
  const urlPath =
    "/decrypt/VTJGc2RHVmtYMStuVExkTzRNR0xpS2FySmtRa0lrdDZDbno0NXo1ZDZiTT0=#cmV0ZXQ=";
  const key = "retet";

  const testedKey = getKeyFromRouter({ asPath: urlPath });
  expect(testedKey).toBe(key);
});

it("should return empty string from URL if no key there", () => {
  const urlPath =
    "/decrypt/VTJGc2RHVmtYMStuVExkTzRNR0xpS2FySmtRa0lrdDZDbno0NXo1ZDZiTT0=";

  const testedKey = getKeyFromRouter({ asPath: urlPath });
  expect(testedKey).toBe("");
});
