import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Generador de Recetas con IA' })).toBeVisible();
  });

  test('should have ingredient input and add button', async ({ page }) => {
    await expect(page.getByPlaceholder('Ingrediente (ej. pollo, arroz)')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Añadir' })).toBeVisible();
  });

  test('should have diet preference selector', async ({ page }) => {
    await expect(page.getByRole('combobox')).toBeVisible();
  });

  test('should have generate button disabled initially', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Buscar Receta' });
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
  });
});
