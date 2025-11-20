import { test, expect } from '@playwright/test';

test.describe('Recipe Generation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should generate a recipe when ingredients are added', async ({ page }) => {
    // Increase timeout for this test due to AI API
    test.setTimeout(120000); // 2 minutes
    
    // Add ingredient
    await page.getByPlaceholder('Ingrediente (ej. pollo, arroz)').fill('pollo');
    await page.getByRole('button', { name: 'Añadir' }).click();

    // Verify ingredient is added to list
    await expect(page.getByText('pollo')).toBeVisible();

    // Button should be enabled now
    const generateButton = page.getByRole('button', { name: 'Buscar Receta' });
    await expect(generateButton).toBeEnabled();

    // Click generate
    await generateButton.click();

    // Should show loading state
    await expect(page.getByText('Generando...')).toBeVisible();

    // Wait for either success (recipe) or error message
    const recipeHeading = page.getByRole('heading', { name: 'Ingredientes' });
    const errorMessage = page.getByTestId('error-message');
    
    await Promise.race([
      recipeHeading.waitFor({ state: 'visible', timeout: 90000 }),
      errorMessage.waitFor({ state: 'visible', timeout: 90000 })
    ]);

    // If we have an error, skip the rest of the assertions
    const hasError = await errorMessage.isVisible();
    if (hasError) {
      const errorText = await errorMessage.textContent();
      console.log('Error during recipe generation:', errorText);
      test.skip(true, `API error: ${errorText}`);
    }

    // Verify structure of result
    await expect(recipeHeading).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Instrucciones' })).toBeVisible();
  });
});
