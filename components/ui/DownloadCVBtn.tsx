import { File } from "lucide-react";
import React from "react";

const DownloadCVBtn = () => {
  const cvFileUrl = "CV.docx"; // Replace with the actual URL of your CV file
  // Replace with your desired CV filename
  const cvFileName = "Maria_Sidorova_CV.docx";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvFileUrl;
    link.download = cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div
      role="button"
      onClick={handleDownload}
      className="inline-block download-cv-btn mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/40 hover:to-secondary/40 cursor-pointer  hover:shadow-[3px_3px_0px] shadow-fg/50 transition-all"
    >
      <div className="flex items-center gap-2 ">
        <File size={24} className="text-primary" />
        <span className="text-sm font-medium tracking-wider uppercase">Download CV</span>
      </div>
    </div>
  );
};

export default DownloadCVBtn;
