import { APP_CONSTANTS } from "@/constants/AppConstants";

export function isValidGithubURL(url: string) {
    return APP_CONSTANTS.GITHUB_URL_REGEX.test(url.trim());
}

export function isValidLinkedinURL(url: string) {
    return APP_CONSTANTS.LINKEDIN_URL_REGEX.test(url.trim());
}

export function normalizeURL(url: string) {
    // Trim whitespace and remove protocols (http:// or https://)
    const normalizedURL = url.trim().replace(/^https?:\/\//i, "");

    // Remove "www." if present
    return normalizedURL.replace(/^www\./i, "");
}

export function addProtocol(url: string) {
    // Trim whitespace from the input
    const trimmedInput = url.trim();
    return trimmedInput.startsWith("http://") || trimmedInput.startsWith("https://")
        ? trimmedInput
        : `https://${trimmedInput}`;
}