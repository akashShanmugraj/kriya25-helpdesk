import { useState } from "react";
import axios from "axios";
import { uploadPdf, pdfUrlUpdate } from "../API/calls";

export default function PdfUploader({ kriyaId, email }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }

    try {
      setUploading(true);
      const response = await uploadPdf(file, kriyaId);
      const uploadedFileUrl = response.data.name; // Extract uploaded file URL

      if (uploadedFileUrl) {
        setUploadedUrl(uploadedFileUrl);

        // Call pdfUrlUpdate with email and uploaded file URL
        await pdfUrlUpdate(email, uploadedFileUrl);

        window.location.reload();
      } else {
        setError("Upload successful, but no URL returned.");
      }

      setError("");
    } catch (err) {
      setError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-4 border rounded-lg shadow-md bg-gray-100">
      <p className="text-gray-700 font-medium mb-2">
        Upload your college ID Card
      </p>

      <label className="w-full p-4 text-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <span className="text-gray-600">Click to upload a PDF (Max: 5MB)</span>
      </label>
      {/* {!file && !uploadedUrl && (
        // <p className="mt-3 text-sm text-red-600">
        //   Bring ID card for verification if not uploaded.
        // </p>
      )} */}

      {file && (
        <p className="mt-3 text-sm text-green-600">Selected: {file.name}</p>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        onClick={handleUpload}
        className={`mt-4 px-4 py-2 text-white rounded ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-blue-700"
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>

      {uploadedUrl && (
        <p className="mt-3 text-sm text-green-600">
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View Uploaded PDF
          </a>
        </p>
      )}
    </div>
  );
}
