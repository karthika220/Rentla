# Event Names Reference

## Conversion Events (Mark as Conversions in GA4)

### 1. WhatsApp Click Conversion
- **Event Name**: `whatsapp_click`
- **When it fires**: User clicks ANY WhatsApp button/link
- **Location**: `rentla_script.js` (line ~210)
- **Google Ads Conversion**: Also fires `conversion` event with `conversion_type: 'whatsapp_click'`
- **Mark as conversion**: ✅ YES

### 2. Phone Call Conversion
- **Event Name**: `phone_call`
- **When it fires**: User clicks ANY call button/link (`tel:` links)
- **Location**: `rentla_script.js` (line ~227)
- **Google Ads Conversion**: Also fires `conversion` event with `conversion_type: 'phone_call'`
- **Mark as conversion**: ✅ YES

### 3. Form Submission Conversion
- **Event Name**: `form_submission_conversion`
- **When it fires**: ONLY when user successfully reaches thank you page
- **Location**: `thankyou.html` (line ~78)
- **Google Ads Conversion**: Also fires `conversion` event with `conversion_type: 'form_submission'`
- **Mark as conversion**: ✅ YES

### 4. Zoho Chat End Conversion
- **Event Name**: `zoho_chat_end`
- **When it fires**: When user ends/closes the Zoho chat conversation
- **Location**: `index.html` (line ~434)
- **Google Ads Conversion**: Also fires `conversion` event with `conversion_type: 'zoho_chat_end'`
- **Mark as conversion**: ✅ YES

---

## Engagement Events (Do NOT mark as conversions)

### 5. Form Submission Attempt
- **Event Name**: `form_submission`
- **When it fires**: When user submits form (before redirect to thank you page)
- **Location**: `rentla_script.js` (line ~114, ~134)
- **Purpose**: Track form submission attempts (conversion only fires on thank you page)
- **Mark as conversion**: ❌ NO

### 6. CTA Button Click
- **Event Name**: `cta_click`
- **When it fires**: User clicks CTA buttons ("Rent a Laptop Now", "Request a Free Quote", "Explore All Products", "Talk to Our Team")
- **Location**: `rentla_script.js` (line ~258, ~272, ~286)
- **Purpose**: Track engagement with CTA buttons
- **Mark as conversion**: ❌ NO

---

## Google Ads Conversion Event

### Generic Conversion Event
- **Event Name**: `conversion`
- **When it fires**: For all conversion types (WhatsApp, Call, Form, Chat)
- **Purpose**: Sends conversion data to Google Ads
- **Parameters**:
  - `send_to`: Google Ads conversion ID and label
  - `value`: 1.0
  - `currency`: INR
  - `conversion_type`: Identifies which conversion (whatsapp_click, phone_call, form_submission, zoho_chat_end)

---

## Summary Table

| Event Name | Type | Mark as Conversion | Google Ads | Location |
|------------|------|-------------------|------------|----------|
| `whatsapp_click` | Conversion | ✅ YES | ✅ YES | `rentla_script.js` |
| `phone_call` | Conversion | ✅ YES | ✅ YES | `rentla_script.js` |
| `form_submission_conversion` | Conversion | ✅ YES | ✅ YES | `thankyou.html` |
| `zoho_chat_end` | Conversion | ✅ YES | ✅ YES | `index.html` |
| `form_submission` | Engagement | ❌ NO | ❌ NO | `rentla_script.js` |
| `cta_click` | Engagement | ❌ NO | ❌ NO | `rentla_script.js` |
| `conversion` | Google Ads | N/A | ✅ YES | Multiple files |

---

## GTM Setup

When setting up triggers in Google Tag Manager, use these event names:

1. **WhatsApp Conversion Trigger**: Custom Event → Event name = `whatsapp_click`
2. **Call Conversion Trigger**: Custom Event → Event name = `phone_call`
3. **Form Conversion Trigger**: Custom Event → Event name = `form_submission_conversion`
4. **Chat Conversion Trigger**: Custom Event → Event name = `zoho_chat_end`
5. **Google Ads Conversion Trigger**: Custom Event → Event name = `conversion` + condition on `conversion_type`

---

## Notes

- All conversion events include `event_category: 'conversion'` parameter
- Engagement events include `event_category: 'engagement'` or `event_category: 'form'`
- Google Ads conversions use the generic `conversion` event with `conversion_type` to differentiate
- Form submission conversion only fires on thank you page to ensure accuracy
