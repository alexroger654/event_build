import * as XLSX from "xlsx";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: any = data.get("file");

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" });
    }

    const buffer = await file.arrayBuffer();

    // Convert buffer to workbook
    const workbook = XLSX.read(buffer, { type: "buffer" });

    // Assume the first sheet is the one to convert
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Function to convert object keys to lowercase
    const convertKeysToLowerCase = (obj: any) => {
      const convertedObj: any = {};
      Object.keys(obj).forEach((key) => {
        convertedObj[key.toLowerCase()] = obj[key];
      });
      return convertedObj;
    };

    const result = jsonData.map((obj) => {
      return convertKeysToLowerCase(obj);
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to convert Excel to JSON",
    });
  }
}
