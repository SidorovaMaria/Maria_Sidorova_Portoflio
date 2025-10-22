import React from "react";

const DownloadCVBtn = () => {
  const cvFileUrl = "CV.docx"; // Replace with the actual URL of your CV file
  // Replace with your desired CV filename
  const cvFileName = "Maria_Sidorova_CV.docx";

  const handleDownload = () => {};
  return (
    <button onClick={handleDownload} className="cursor-pointer">
      Download CV
    </button>
  );
};

export default DownloadCVBtn;
