/**
 * Google Apps Script for Shasha & Nasir wedding RSVPs.
 *
 * Setup:
 * 1. Create a Google Sheet with header row:
 *    Timestamp | Guest Name | Contact | Plus One | Plus One Name | Wishes | Display Wish
 * 2. Extensions → Apps Script → paste this file.
 * 3. Set SHEET_NAME if your tab is not "Sheet1".
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL into Vercel env GOOGLE_SCRIPT_URL
 */

var SHEET_NAME = "Sheet1";

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "wishes";
  if (action === "wishes") {
    return jsonResponse({ wishes: getWishes() });
  }
  return jsonResponse({ ok: true });
}

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var sheet = getSheet_();
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.guestName || "",
      data.contact || "",
      data.plusOne || "No",
      data.plusOneName || "",
      data.wishes || "",
      data.displayWish || (data.wishes ? "TRUE" : "FALSE"),
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function getWishes() {
  var sheet = getSheet_();
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  var wishes = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var guestName = String(row[1] || "").trim();
    var message = String(row[5] || "").trim();
    var display = String(row[6] || "").toUpperCase();
    if (!message) continue;
    if (display !== "TRUE" && display !== "YES") continue;
    wishes.push({ name: guestName || "Guest", message: message });
  }

  // Newest first
  return wishes.reverse();
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.getSheets()[0];
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
