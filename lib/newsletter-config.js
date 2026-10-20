// Edit these four values. Everything on the newsletter page reads from here.

// Your WhatsApp number in international format, digits only, no + or spaces.
// Nigeria example: 2348012345678 (234 + number without the leading 0)
export const WHATSAPP_NUMBER = "2348142995114";

// Public address of this page, used by the "forward this" button.
export const PAGE_URL = "https://browncode.name.ng/newsletter";

// Put your checklist file in /public and set its path here.
export const CHECKLIST_PDF = "/nigeria-fraud-safety-checklist.pdf";

// Leave at 0 until the number is real. The line only shows when this is above 0.
export const SUBSCRIBER_COUNT = 0;

// Opens a WhatsApp chat with you with the message already typed.
export const waLink = (text) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;