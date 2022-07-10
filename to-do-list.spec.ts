import { test, expect, type Page, chromium } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dailytodo.org/');
});

const TODO_ITEMS = [
  'Make bed',
  'Go for a run',
  'Make breakfast',
  'Get dressed'
];


test.describe('Create new todo list and mark all items as done', () => {
  test('should allow me to add todo items', async ({ page }) => {
    //check title on landing page
    const title = page.locator('h1');
    await expect(title).toHaveText('DailyTodo.org');
    // Create 1st todo.
    await page.click("#start");
    await page.locator('textarea[name="tasks"]').click();
    await page.locator('textarea[name="tasks"]').fill(TODO_ITEMS[0]+ '\n' + TODO_ITEMS[1] + '\n' + TODO_ITEMS[2] + '\n' + TODO_ITEMS[3] + '\n');
    
    // Save changes.
    await page.click('text=Save tasks')
      
    // Make sure the list has all items visible 
    await expect(page.locator("#t1")).toHaveText([
      TODO_ITEMS[0]]);

    await expect(page.locator("#t2")).toHaveText([
        TODO_ITEMS[1]]);

    await expect(page.locator("#t3")).toHaveText([
          TODO_ITEMS[2]]);
    
    await expect(page.locator("#t4")).toHaveText([
               TODO_ITEMS[3]]);

    //mark all tasks as done
    await page.locator("#check1").check();
    await page.locator("#check2").check();
    await page.locator("#check3").check();
    await page.locator("#check4").check();

    //check if all tasks are marked as done
    const today1 = page.locator('today1');
    await expect(today1).toBeChecked;

    const today2 = page.locator('today2');
    await expect(today2).toBeChecked;

    const today3 = page.locator('today3');
    await expect(today3).toBeChecked;

    const today4 = page.locator('today4');
    await expect(today4).toBeChecked;


    //unmark 3 tasks
    await page.locator("#today1").click();
    await page.locator("#today3").click();
    await page.locator("#today4").click();


    //check if all tasks are marked as done
    const check1 = page.locator('check1');
    await expect(today1).not.toBeChecked;

    const check3 = page.locator('check3');
    await expect(today3).not.toBeChecked;

    const check4 = page.locator('check4');
    await expect(today4).not.toBeChecked;

    const check2 = page.locator('today2');
    await expect(today2).toBeChecked;


  });
});
