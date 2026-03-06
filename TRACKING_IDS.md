# Tracking IDs Configuration

## ✅ Configured IDs

### Google Tag Manager
- **Container ID**: `GTM-WMFLW93`
- **Status**: ✅ Configured in `index.html` and `thankyou.html`

### Google Analytics 4
- **Measurement ID**: `G-Z46VK7W5GR`
- **Status**: ⚠️ Needs to be configured in Google Tag Manager

---

## ⚠️ Still Required: Google Ads Conversion IDs

You need to create 4 separate conversion actions in Google Ads and replace the placeholders:

### 1. Form Submission Conversion
- **Placeholder**: `AW-CONVERSION_ID/FORM_SUBMISSION_CONVERSION_LABEL`
- **Location**: `thankyou.html` (line ~83)
- **Action**: Create conversion action in Google Ads → Copy ID and Label → Replace placeholder

### 2. WhatsApp Click Conversion
- **Placeholder**: `AW-CONVERSION_ID/WHATSAPP_CONVERSION_LABEL`
- **Location**: `rentla_script.js` (line ~175)
- **Action**: Create conversion action in Google Ads → Copy ID and Label → Replace placeholder

### 3. Call Click Conversion
- **Placeholder**: `AW-CONVERSION_ID/CALL_CONVERSION_LABEL`
- **Location**: `rentla_script.js` (line ~192)
- **Action**: Create conversion action in Google Ads → Copy ID and Label → Replace placeholder

### 4. Chat End Conversion
- **Placeholder**: `AW-CONVERSION_ID/CHAT_CONVERSION_LABEL`
- **Location**: `index.html` (line ~444)
- **Action**: Create conversion action in Google Ads → Copy ID and Label → Replace placeholder

---

## Next Steps

1. ✅ GTM Container ID - **DONE**
2. ⏳ Configure GA4 in GTM:
   - Go to Google Tag Manager
   - Create GA4 Configuration Tag
   - Use Measurement ID: `G-Z46VK7W5GR`
   - Set trigger to "All Pages"
3. ⏳ Create Google Ads Conversion Actions (4 separate actions)
4. ⏳ Replace Google Ads conversion placeholders in code
5. ⏳ Set up conversion tags in GTM
6. ⏳ Test all conversions

See `GTM_GA4_SETUP.md` for detailed setup instructions.
