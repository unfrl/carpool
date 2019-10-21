/**
 * Tests for form 123-123-1234 (including hyphens)
 * @param phoneNumber - Phone number to test
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
    return /^([1-9]\d{2}-\d{3}-\d{4})$/.test(phoneNumber);
};
